import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent';
import Entity from '~/general/Entity';
import { Rect, LiveData } from 'gameutils';
import ZoneTrigger from '~/common/components/ZoneTrigger';
import IComponent from '~/general/IComponent';
import BaseComponent from '~/general/BaseComponent';
import PlayerClimbingController from './PlayerClimbingController';
import PlayerEntity from '../entities/PlayerEntity';
import { PlayerStates } from '../stateMachines/PlayerStateMachine';

export interface ClimbableZoneDetectorOptions {
  hooked: LiveData<Entity | null>
  filter: FilterFunc
  right: boolean
}
export type FilterFunc = (body: BodyComponent) => boolean

export default class ClimbableZoneDetector extends ZoneTrigger {
  protected filter: FilterFunc
  protected hooked: LiveData<Entity | null> = new LiveData(null)
  protected previousController: IComponent | null = null
  protected _right: boolean

  constructor(entity: Entity, rect: Rect, extraTags: string[], options: Partial<ClimbableZoneDetectorOptions>) {
    super(entity, rect, extraTags,)
    this.filter = options.filter || (() => true)
    if (options.hooked) {
      this.hooked = options.hooked
    }
    this._right = !!options.right
  }

  public get right() {return this._right}

  public onEntityEnter(entity: Entity) {
    if (entity.hasTag(tags.PLAYER_ENTITY)) {
      this.hooked.set(entity)
      this.previousController = entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
      const playerEntity = entity as PlayerEntity
      const newController = new PlayerClimbingController(entity, [], playerEntity.stateMachine, this)
      playerEntity.addComponent(newController)
      newController.create()
      playerEntity.stateMachine.transitionTo(PlayerStates.CLIMBING)
      playerEntity.isFacingRight.set(!this._right)
    }
  }

  public onEntityLeave(entity: Entity) {
    if (entity.hasTag(tags.PLAYER_ENTITY)) {
      this.hooked.set(null)
      entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
      if (this.previousController) {
        entity.addComponent(this.previousController)
      }
      (entity as PlayerEntity).stateMachine.transitionTo(PlayerStates.IN_AIR)
    }
  }
}