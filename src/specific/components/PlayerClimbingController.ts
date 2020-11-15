import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent';
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import PlayerStateMachine, { PlayerStates } from '../stateMachines/PlayerStateMachine';
import PlayerEntity from '../entities/PlayerEntity';
import ClimbableZoneDetector from './ClimbableZoneDetector';

export default class PlayerClimbingController extends BaseComponent {
  protected _cursors: Phaser.Types.Input.Keyboard.CursorKeys | null
  protected _playerBody: BodyComponent | null
  protected playerState: PlayerStateMachine
  protected _hookedTo: ClimbableZoneDetector

  constructor(entity: Entity, extraTags: string[], playerStateMachine: PlayerStateMachine, hookedTo: ClimbableZoneDetector) {
    super(entity, [tags.PLAYER_CONTROLLER_COMPONENT, ...extraTags])
    this._cursors = null
    this._playerBody = null
    this.playerState = playerStateMachine
    this._hookedTo = hookedTo
  }

  create(): void {
    this._cursors = this.entity.scene.input.keyboard.createCursorKeys()
    this._playerBody = this.entity
      .getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
  }
  update(time: number, delta: number): void {
    const player = this.entity as PlayerEntity
    const hookedToTheRight = this._hookedTo.right
    if (this._cursors && this._playerBody) {
      if ((hookedToTheRight && this._cursors.right?.isDown)
        || ((!hookedToTheRight) && this._cursors.left?.isDown)) {
          if (!hookedToTheRight)
            this._playerBody.body.setVelocity(-100, -200)
          else
            this._playerBody.body.setVelocity(100, -200)
      } else if (this._cursors.up?.isDown) {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityY(-200)
        if (player.stateMachine.canTransitionTo(PlayerStates.CLIMBING)) {
          player.stateMachine.transitionTo(PlayerStates.CLIMBING)
        }
      } else if (this._cursors.down?.isDown) {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityY(200)
        if (player.stateMachine.canTransitionTo(PlayerStates.CLIMBING)) {
          player.stateMachine.transitionTo(PlayerStates.CLIMBING)
        }
      } else {
        (this._playerBody.body as Phaser.Physics.Arcade.Body).setVelocityY(0)
        if (player.stateMachine.canTransitionTo(PlayerStates.CLIMBING_IDLE)) {
          player.stateMachine.transitionTo(PlayerStates.CLIMBING_IDLE)
        }
      }
    }
  }
  delete(): void {
    
  }

}