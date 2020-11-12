import * as commonTags from "../../common/tags"
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import BodyComponent from "../../common/components/BodyComponent"
import PlayerStateMachine, { PlayerStates } from '../stateMachines/PlayerStateMachine';

export default class PlayerRunningDetector extends BaseComponent {
  protected _body: BodyComponent | null
  protected playerState: PlayerStateMachine

  constructor(entity: Entity, tags: string[], playerState: PlayerStateMachine) {
    super(entity, tags)
    this._body = null
    this.playerState = playerState
  }

  create(): void {
    this._body = this.entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
  }
  update(time: number, delta: number): void {
    if (this._body?.body) {
      const {x, y} = this._body.body.velocity
      if (y !== 0 && this.playerState.getState() !== PlayerStates.IN_AIR) {
        this.playerState.transitionTo(PlayerStates.IN_AIR)
      } 
      if (x !== 0 && y === 0 && this.playerState.getState() !== PlayerStates.RUNNING) {
        this.playerState.transitionTo(PlayerStates.RUNNING)
      }
      if (x === 0 && y === 0 && this.playerState.getState() !== PlayerStates.IDLE) {
        this.playerState.transitionTo(PlayerStates.IDLE)
      }
    }
  }
  delete(): void {}

}