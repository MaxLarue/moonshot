import { Cooldown, Vec2 } from 'gameutils';
import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent';
import BaseComponent from '~/general/BaseComponent';
import Grapple from "../entities/Grapple"
import PlayerEntity from '../entities/PlayerEntity';
import { PlayerStates } from '../stateMachines/PlayerStateMachine';


export default class GrappleCapacity extends BaseComponent {
  protected _grapple: Grapple | null
  protected _input: Phaser.Input.InputPlugin | null
  protected _cooldown: Cooldown

  constructor(entity, extraTags) {
    super(entity, extraTags)
    this._grapple = null
    this._input = null
    this._cooldown = new Cooldown(2000)
  }

  create(): void {
    this._input = this.entity.scene.input.on('pointerup', () => {
      if ((this.entity as PlayerEntity).stateMachine.canTransitionTo(PlayerStates.GRAPPLING)
          && this._cooldown.ready) {
        this._cooldown.activate()
        this.spawnGrapple(this.clickToGameWorldCoordinates(this.getClickPos()));
        (this.entity as PlayerEntity).stateMachine.transitionTo(PlayerStates.GRAPPLING)
      }
    })
  }
  update(time: number, delta: number): void {this._cooldown.addDelta(delta)}
  delete(): void {
    this._input = null
  }

  protected getClickPos(): Vec2 {
    return new Vec2(this._input?.activePointer.x || 0, this._input?.activePointer.y || 0)
  }

  protected clickToGameWorldCoordinates(click: Vec2): Vec2 {
    const cameraPos = new Vec2 (
      this.entity.scene.cameras.main.scrollX,
      this.entity.scene.cameras.main.scrollY
    )
    return click.add(cameraPos)
  }

  protected spawnGrapple(toward: Vec2): void {
    if (this._grapple) {
      this.entity.scene.removeEntity(this._grapple)
      this._grapple = null
    }
    const body = this.entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    this._grapple = new Grapple(
      this.entity.scene,
      this.entity,
      toward.sub(new Vec2(body.body.position.x, body.body.position.y))
    )
    this.entity.scene.addEntity(this._grapple)
    this._grapple.create()
  }

}