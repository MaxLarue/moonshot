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
}
export type FilterFunc = (body: BodyComponent) => boolean

export default class ClimbableZoneDetector extends ZoneTrigger {
  protected filter: FilterFunc
  protected hooked: LiveData<Entity | null> = new LiveData(null)
  protected previousController: IComponent | null = null

  constructor(entity: Entity, rect: Rect, extraTags: string[], options: Partial<ClimbableZoneDetectorOptions>) {
    super(entity, rect, extraTags,)
    this.filter = options.filter || (() => true)
    if (options.hooked) {
      this.hooked = options.hooked
    }
  }

  public onEntityEnter(entity: Entity) {
    this.hooked.set(entity)
    this.previousController = entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    const playerEntity = entity as PlayerEntity
    const newController = new PlayerClimbingController(entity, [], playerEntity.stateMachine)
    playerEntity.addComponent(newController)
    newController.create()
    playerEntity.stateMachine.transitionTo(PlayerStates.CLIMBING)
  }

  public onEntityLeave(entity: Entity) {
    this.hooked.set(null)
    entity.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    if (this.previousController) {
      entity.addComponent(this.previousController)
    }
    (entity as PlayerEntity).stateMachine.transitionTo(PlayerStates.IN_AIR)
  }
}