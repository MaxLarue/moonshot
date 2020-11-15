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

  constructor(entity: Entity, line: Line, extraTags: string[], hitBoxOffset?: Rect) {
    super(entity, line.rec, extraTags)
    this._line = line
    this.previousController = null
    this._hitBoxOffset = hitBoxOffset || null
  }

  public onEntityEnter(entity: Entity) {
    this.previousController = entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    const playerEntity = entity as PlayerEntity
    const newController = new PlayerSlidingController(entity, this, playerEntity.stateMachine, new Vec2(0, 2))
    playerEntity.addComponent(newController)
    newController.create()
    playerEntity.stateMachine.transitionTo(PlayerStates.SLIDING)
  }

  public onEntityLeave(entity: Entity) {
    entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    if (this.previousController) {
      entity.addComponent(this.previousController)
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