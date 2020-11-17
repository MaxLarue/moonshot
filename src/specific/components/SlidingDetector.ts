import * as tags from "../tags"
import Line from 'gameutils/dist/Line';
import BodyComponent from '~/common/components/BodyComponent';
import ZoneTrigger from '~/common/components/ZoneTrigger';
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import IComponent from '~/general/IComponent';
import PlayerEntity from '../entities/PlayerEntity';
import { PlayerStates } from '../stateMachines/PlayerStateMachine';
import PlayerSlidingController from './PlayerSlidingController';
import { Rect, Vec2 } from 'gameutils';


export default class SlidingDetector extends ZoneTrigger {
  public get line() {return this._line}
  protected _line: Line
  protected previousController: IComponent | null
  protected _hitBoxOffset: Rect | null
  protected _slidingEntity: Entity | null

  constructor(entity: Entity, line: Line, extraTags: string[], hitBoxOffset?: Rect) {
    super(entity, line.rec, extraTags)
    this._line = line
    this.previousController = null
    this._hitBoxOffset = hitBoxOffset || null
    this._slidingEntity = null
  }

  public onEntityEnter(entity: Entity) {
    if (entity.hasTag(tags.PLAYER_ENTITY)) {
      const asPlayer = entity as PlayerEntity
      if (asPlayer.stateMachine.canTransitionTo(PlayerStates.SLIDING)) {
        this._slidingEntity = entity
        this.makeEntitySlide(entity)
        asPlayer.stateMachine.transitionTo(PlayerStates.SLIDING)
      }
    }
  }

  public onEntityLeave(entity: Entity) {
    if (entity.hasTag(tags.PLAYER_ENTITY) && this._slidingEntity === entity) {
      this.onEntityDoneSliding(entity)
      this._slidingEntity = null
    }
  }

  protected makeEntitySlide(entity: Entity) {
    this.previousController = entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    const playerEntity = entity as PlayerEntity
    const newController = new PlayerSlidingController(entity, this, playerEntity.stateMachine, new Vec2(0, 2))
    playerEntity.addComponent(newController)
    newController.create()
  }

  protected onEntityDoneSliding(entity: Entity) {
    entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    if (this.previousController) {
      entity.addComponent(this.previousController)
      this.previousController = null
    }
    (entity as PlayerEntity).stateMachine.transitionTo(PlayerStates.IN_AIR)
  }

  onObjectIsIn(body: BodyComponent) {
    let bodyhitbox = body.rect
    if (this._hitBoxOffset) {
      bodyhitbox = Rect.fromCenter(
        bodyhitbox.center.sub(this._hitBoxOffset.center),
        this._hitBoxOffset.size
      )
    }
    if (this._line.collideRect(bodyhitbox)) {
      super.onObjectIsIn(body)
    }
  }
}