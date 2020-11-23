import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent';
import BaseComponent from '~/general/BaseComponent';
import Grapple from '../entities/Grapple';
import { Vec2 } from 'gameutils';

export interface GrappleFlyingControllerOptions {
  maxDst?: number
  speed?: number
}

export default class GrappleFlyingController extends BaseComponent {
  protected _grapple: Grapple
  protected _launcherBody: BodyComponent
  protected _maxDst: number
  protected _speed: number
  
  constructor(entity: Grapple, launcherBody: BodyComponent, options: GrappleFlyingControllerOptions) {
    super(entity, [tags.GRAPPLE_CONTROLLER])
    this._grapple = entity
    this._launcherBody = launcherBody
    this._maxDst = options.maxDst || 200
    this._speed = options.speed || 300

  }
  create(): void {}
  update(time: number, delta: number): void {
    const body = this.entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    const velocity = new Vec2(this._grapple.direction.x, this._grapple.direction.y)
      .unit()
      .mul(this._speed)
    body.body.setVelocity(velocity.x, velocity.y)

    const maxDst = this._maxDst * this._maxDst
    const dst = body.center.sub(this._launcherBody.center).sqLen()

    if (dst > maxDst) {
      this.entity.scene.removeEntity(this.entity)
    }

  }
  delete(): void {}
}