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


export default class SlidingDetector extends ZoneTrigger {
  public onEntityEnter(entity: Entity) {
    this.previousController = entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    const playerEntity = entity as PlayerEntity
    const newController = new PlayerSlidingController(entity, this, playerEntity.stateMachine)
    playerEntity.addComponent(newController)
    newController.create()
    playerEntity.stateMachine.transitionTo(PlayerStates.SLIDING)
    // playerEntity.isFacingRight.set(!this._right)
  }
  public onEntityLeave(entity: Entity) {
    entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    if (this.previousController) {
      entity.addComponent(this.previousController)
    }
    (entity as PlayerEntity).stateMachine.transitionTo(PlayerStates.IN_AIR)
  }
  public get line() {return this._line}
  protected _line: Line
  protected previousController: IComponent | null

  constructor(entity: Entity, line: Line, extraTags: string[]) {
    super(entity, line.rec, extraTags)
    this._line = line
    this.previousController = null
  }

  onObjectIsIn(body: BodyComponent) {
    const bodyhitbox = body.rect
    if (this._line.collideRect(bodyhitbox)) {
      super.onObjectIsIn(body)
    }
  }
}