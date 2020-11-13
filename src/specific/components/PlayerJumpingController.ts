import * as commonTags from "../../common/tags"
import * as tags from "../tags"
import BaseComponent from '~/general/BaseComponent'
import Entity from '~/general/Entity';
import BodyComponent from "../../common/components/BodyComponent"
import { LiveData } from 'gameutils';
import PlayerStateMachine, { PlayerStates } from '../stateMachines/PlayerStateMachine';


export default class PlayerController extends BaseComponent {
  protected _cursors: Phaser.Types.Input.Keyboard.CursorKeys | null
  protected _playerBody: BodyComponent | null
  protected facingRight: LiveData<boolean>
  protected playerState: PlayerStateMachine

  constructor(entity: Entity, extraTags: string[], isFacingRight: LiveData<boolean>, playerStateMachine: PlayerStateMachine) {
    super(entity, [tags.PLAYER_CONTROLLER_COMPONENT, ...extraTags])
    this._cursors = null
    this._playerBody = null
    this.playerState = playerStateMachine
    this.facingRight = isFacingRight
  }

  create(): void {
    this._cursors = this.entity.scene.input.keyboard.createCursorKeys()
    this._playerBody = this.entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
  }
  update(time: number, delta: number): void {
    this.handleCursors()
    this.handleStateChange()
  }
  delete(): void {
    
  }

  protected handleStateChange() {
    if (this._playerBody?.body) {
      const {x, y} = this._playerBody.body.velocity
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

  protected  handleCursors() {
    if (this._cursors && this._playerBody) {
      // Horizontal movement
      if (this._cursors.left?.isDown) {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityX(-150);
        if (this.facingRight.get()) {
          this.facingRight.set(false)
        }
      } else if (this._cursors.right?.isDown) {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityX(150);
        if (!this.facingRight.get()) {
          this.facingRight.set(true)
        }
      } else {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityX(0);
      }
      if (this._cursors.up?.isDown && this.playerState.getState() !== PlayerStates.IN_AIR) {
        (this._playerBody?.body as Phaser.Physics.Arcade.Body)?.setVelocityY(-200)
      }
    }
  }

}