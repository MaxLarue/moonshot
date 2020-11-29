import BaseComponent from '~/general/BaseComponent'
import BodyComponent from './BodyComponent'
import Entity from '~/general/Entity';
import * as tags from "../tags"

export interface RendererComponentOptions {
  spriteSheetKey: string,
  defaultAnim: string,
  depth?: number
}

export default class RendererComponent extends BaseComponent {
  protected spriteSheetKey: string
  protected defaultAnim: string
  protected _sprite: Phaser.GameObjects.Sprite | null;
  protected _depth: number
  
  public get sprite(): Phaser.GameObjects.Sprite {
    if (this._sprite) {
      return this._sprite;
    } else {
      throw new Error("Renderer component has no sprites")
    }
  }

  constructor(entity: Entity, options: RendererComponentOptions, extraTags: string[]) {
    super(entity, [tags.RENDERER_COMPONENT_TAG, ...extraTags])
    this.spriteSheetKey = options.spriteSheetKey
    this.defaultAnim = options.defaultAnim
    this._sprite = null
    this._depth = options.depth || 0
  }

  create(): void {
    const body = this.entity.getComponentByTag<BodyComponent>(tags.BODY_COMPONENT_TAG, BodyComponent)
    this._sprite = this.entity.scene.add.sprite(body.initialX, body.initialY, this.spriteSheetKey, this.defaultAnim)
    this._sprite.setOrigin(0.5, 0.5)
    this._sprite.setDepth(this._depth)
  }
  update(time: number, delta: number): void {}
  delete(): void {
    if (this._sprite) {
      this._sprite.destroy()
      this._sprite = null
    }
  }

}