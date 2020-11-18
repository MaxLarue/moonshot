import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent'
import Entity from '~/general/Entity'
import { Line, Vec2 } from 'gameutils'
import BaseComponent from '~/general/BaseComponent'
import RendererComponent from '~/common/components/RendererComponent'

export default class GrappleRenderer extends BaseComponent {
  protected launcher: Entity
  protected launcherBody: BodyComponent | null
  protected body: BodyComponent | null
  protected line: Phaser.GameObjects.Line | null
  protected renderer: RendererComponent | null

  constructor(entity: Entity, launcher: Entity) {
    super(entity, [])
    this.launcher = launcher
    this.body = null
    this.line = null
    this.launcherBody = null
    this.renderer = null
  }

  create() {
    this.launcherBody = this.launcher.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    this.body = this.entity.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    this.renderer = this.entity.getComponentByTag<RendererComponent>(commonTags.RENDERER_COMPONENT_TAG, RendererComponent)
  }
  
  update(time: number, delta: number) {
    const direction = this.to.sub(this.from)
    let angle = direction.angle(new Vec2(1, 0))
    // angle is the smallest angle between 2 vectors
    // since this relies on cosines, we can get the true
    // angle by reverting it if y < 0
    if (direction.y < 0) angle = 2*Math.PI - angle
    this.renderer?.sprite.setRotation(angle)
    if (this.line) this.line?.destroy()
    this.createLine()
  }

  delete() {
    if (this.line) {
      this.line.destroy()
      this.line = null
    }
  }

  public get from() {
    return new Vec2(
      this.launcherBody?.body.center.x || 0,
      this.launcherBody?.body.center.y || 0
    )
  }

  public get to() {
    if (!this.body) throw new Error("Grapple has no body")
    return new Vec2(
      this.body.body.center.x || 0,
      this.body.body.center.y || 0,
    )
  }

  protected createLine() {
    const line = new Line(this.from, this.to)
    this.line = this.entity.scene.add.line(
      0,
      0,
      line.from.x,
      line.from.y,
      line.to.x,
      line.to.y,
      0,
      0.8
    ).setOrigin(0, 0).setLineWidth(0.2)
  }
}