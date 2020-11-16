import { Vec2 } from 'gameutils';
import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent';
import BaseComponent from '~/general/BaseComponent';
import Grapple from "../entities/Grapple"


export default class GrappleCapacity extends BaseComponent {
  protected _grapple: Grapple | null
  protected _input: Phaser.Input.InputPlugin | null

  constructor(entity, extraTags) {
    super(entity, extraTags)
    this._grapple = null
    this._input = null
  }

  create(): void {
    this._input = this.entity.scene.input.on('pointerup', () => {
      const cameraPos = new Vec2 (
        this.entity.scene.cameras.main.scrollX,
        this.entity.scene.cameras.main.scrollY
      )
      const pos = new Vec2(this._input?.activePointer.x || 0, this._input?.activePointer.y || 0).add(cameraPos)
      if (this._grapple) {
        this.entity.scene.removeEntity(this._grapple)
        this._grapple = null
      }
      const body = this.entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
      this._grapple = new Grapple(
        this.entity.scene,
        this.entity,
        pos.sub(new Vec2(body.body.position.x, body.body.position.y))
      )
      this.entity.scene.addEntity(this._grapple)
      this._grapple.create()
    })
  }
  update(time: number, delta: number): void {}
  delete(): void {
    this._input?.destroy()
  }

}