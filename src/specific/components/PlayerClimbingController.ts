import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent';
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import PlayerStateMachine, { PlayerStates } from '../stateMachines/PlayerStateMachine';

export default class PlayerClimbingController extends BaseComponent {
  protected _cursors: Phaser.Types.Input.Keyboard.CursorKeys | null
  protected _playerBody: BodyComponent | null
  protected playerState: PlayerStateMachine

  constructor(entity: Entity, extraTags: string[], playerStateMachine: PlayerStateMachine) {
    super(entity, [tags.PLAYER_CONTROLLER_COMPONENT, ...extraTags])
    this._cursors = null
    this._playerBody = null
    this.playerState = playerStateMachine
  }

  create(): void {
    this._cursors = this.entity.scene.input.keyboard.createCursorKeys()
    this._playerBody = this.entity
      .getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
  }
  update(time: number, delta: number): void {
    if (this._cursors && this._playerBody) {
      (this._playerBody.body as Phaser.Physics.Arcade.Body).setVelocityY(0)
      if (this._cursors.up?.isDown) {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityY(-200)
      } else if (this._cursors.down?.isDown) {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityY(200)
      }
    }
  }
  delete(): void {
    
  }

}