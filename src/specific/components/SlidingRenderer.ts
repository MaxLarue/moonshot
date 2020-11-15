import * as tags from "../tags"
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import { Rect, Vec2 } from 'gameutils';

export interface SlidingRendererOptions {
  from: Vec2
  to: Vec2
  color?: number
}

export default class SlidingRenderer extends BaseComponent {
  protected line: Phaser.GameObjects.GameObject | null
  protected from: Vec2
  protected to: Vec2
  color: number

  constructor(entity: Entity, options: SlidingRendererOptions, extraTags: string[]) {
    super(entity, [tags.SLIDING_COMPONENT_TAG, ...extraTags])
    this.line = null
    this.from = options.from
    this.to = options.to
    this.color = options.color || 0
  }


  create(): void {
    this.line = this.entity.scene.add.line(
      0,
      0,
      this.from.x,
      this.from.y,
      this.to.x,
      this.to.y,
      this.color,
      0.8
    ).setOrigin(0, 0)
  }
  update(time: number, delta: number): void {}
  delete(): void {
    this.line?.destroy()
  }

}