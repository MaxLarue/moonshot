import * as tags from "../tags"
import Entity from '~/general/Entity';
import BodyComponent, { BodyOption } from './BodyComponent';
import RendererComponent from './RendererComponent';

export interface CircleBodyComponentOptions extends BodyOption {
  radius: number,
  offsetX: number,
  offsetY: number,
  disabled?: boolean
}

export default class CircleBodyComponent extends BodyComponent {
  protected radius: number
  protected offsetX: number
  protected offsetY: number
  protected disabled: boolean

  constructor(entity: Entity, options: CircleBodyComponentOptions) {
    super(entity, options, [])
    this.radius = options.radius
    this.offsetX = options.offsetX
    this.offsetY = options.offsetY
    this.disabled = !!options.disabled
  }

  create() {
    super.create()
    const renderer = this.entity.getComponentByTag<RendererComponent>(tags.RENDERER_COMPONENT_TAG, RendererComponent)
    const sprite = renderer.sprite
    this.body.setCircle(
      this.radius,
      (-1*this.radius + 0.5 * sprite.width),
      (-1*this.radius + 0.5 * sprite.width)
    )
    if (this.disabled) this.body.enable = false
  }
}