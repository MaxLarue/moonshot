import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import PlayerStateMachine from '../stateMachines/PlayerStateMachine';
import SlidingDetector from './SlidingDetector';
import BodyComponent from '~/common/components/BodyComponent';
import PlayerEntity from '../entities/PlayerEntity';


export default class PlayerSlidingController extends BaseComponent {
  protected _hookedTo: SlidingDetector
  protected _playerStateMachine: PlayerStateMachine
  protected _playerBody: BodyComponent
  protected _goingRight: boolean

  constructor(entity: Entity, hookedTo: SlidingDetector, playerStateMachine: PlayerStateMachine) {
    super(entity, [tags.PLAYER_CONTROLLER_COMPONENT])
    this._hookedTo = hookedTo
    this._playerStateMachine = playerStateMachine
    this._playerBody = entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    this._goingRight = (this._hookedTo.line.pointDownRight || this._hookedTo.line.pointUpLeft)
  }

  create(): void {
    (this.entity as PlayerEntity).isFacingRight.set(this._goingRight)
  }

  update(time: number, delta: number): void {
    const speed = 3
    this._playerBody.body.setVelocity(0, 0)
    this._playerBody.body.position.x += speed
    this._playerBody.body.position.y = this._hookedTo.line.getYForX(this._playerBody.body.position.x)
  }

  delete(): void {
    
  }

}