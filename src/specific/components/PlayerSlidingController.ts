import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import * as C from "../constants"
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import PlayerStateMachine from '../stateMachines/PlayerStateMachine';
import SlidingDetector from './SlidingDetector';
import BodyComponent from '~/common/components/BodyComponent';
import PlayerEntity from '../entities/PlayerEntity';
import { Vec2 } from 'gameutils';


export default class PlayerSlidingController extends BaseComponent {
  protected _hookedTo: SlidingDetector
  protected _playerStateMachine: PlayerStateMachine
  protected _playerBody: BodyComponent
  protected _goingRight: boolean
  protected _hookedAt: number
  protected _cursors: Phaser.Types.Input.Keyboard.CursorKeys | null
  protected _offset: Vec2

  constructor(entity: Entity, hookedTo: SlidingDetector, playerStateMachine: PlayerStateMachine, offset?: Vec2) {
    super(entity, [tags.PLAYER_CONTROLLER_COMPONENT])
    this._hookedTo = hookedTo
    this._playerStateMachine = playerStateMachine
    this._playerBody = entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    this._goingRight = (this._hookedTo.line.pointDownRight || this._hookedTo.line.pointUpLeft)
    this._hookedAt = 0
    this._cursors = null
    this._offset = offset || new Vec2(0, 0)
  }

  create(): void {
    this._cursors = this.entity.scene.input.keyboard.createCursorKeys();
    (this.entity as PlayerEntity).isFacingRight.set(this._goingRight)
    if (this._goingRight) this._playerBody.body.position.x += this._offset.x
    else this._playerBody.body.position.x -= this._offset.x
    this._playerBody.body.position.y = this._hookedTo.line.getYForX(this._playerBody.body.position.x) + this._offset.y
    if (!this._goingRight) this._playerBody.body.position.y -= 16 - this._offset.y
  }

  update(time: number, delta: number): void {
    const baseSpeed = C.SLIDING_BASE_SPEED
    const maxSpeed = C.SLIDING_MAX_SPEED
    const acceleration = Math.abs(this._hookedTo.line.slope) * C.SLIDING_ACCELERATION_FACTOR
    let speed = Math.min(baseSpeed * acceleration * (time - this._hookedAt) / 1000, maxSpeed)
    if (!this._goingRight) speed *= -1
    if (!this._hookedAt) {
      this._hookedAt = time - 1
    } else {
      this._playerBody.body.setVelocity(0, 0)
      this._playerBody.body.position.x += speed
      this._playerBody.body.position.y = this._hookedTo.line.getYForX(this._playerBody.body.position.x) + this._offset.y
      if (!this._goingRight) this._playerBody.body.position.y -= 16 - this._offset.y
      if (this._cursors && this._playerBody) {
        if (this._cursors.down?.isDown) {
          this._playerBody.body.setVelocity(speed * delta, 200)
        } else if (this._cursors.up?.isDown) {
          this._playerBody.body.setVelocity(speed * delta, -200)
        }
      }
    }
  }

  delete(): void {
    
  }

}