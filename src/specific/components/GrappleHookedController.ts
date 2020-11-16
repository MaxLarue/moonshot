import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent';
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';

export interface GrappleHookedControllerOptions {
  minDst?: number
  speed?: number
}

export default class GrappleHookedController extends BaseComponent {
  protected _body: BodyComponent | null = null
  protected _launcherBody: BodyComponent
  protected _minDst: number
  protected _speed: number

  constructor(entity: Entity, launcherBody: BodyComponent, options: GrappleHookedControllerOptions) {
    super(entity, [])
    this._launcherBody = launcherBody
    this._minDst = options.minDst || 20
    this._speed = options.speed || 300
  }

  create(): void {
    this._body = this.entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
  }
  update(time: number, delta: number): void {
    this._body?.body.setVelocity(0, 0)
    this._body?.body.setEnable(false)

    if (this._body) {
      const dst = this._body?.center.sub(this._launcherBody.center).sqLen()
      if (dst < this._minDst * this._minDst) this.entity.scene.removeEntity(this.entity)
      else {
        const speed = this._body?.center.sub(this._launcherBody.center).unit().mul(this._speed)
        this._launcherBody.body.setVelocity(speed.x, speed.y)
      }
    }
  }
  delete(): void {}

}