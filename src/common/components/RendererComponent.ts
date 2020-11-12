import BaseComponent from '~/general/BaseComponent'
import BodyComponent from './BodyComponent'
import Entity from '~/general/Entity';
import * as tags from "../tags"

export interface RendererComponentOptions {
  spriteSheetKey: string,
  defaultAnim: string
}

export default class RendererComponent extends BaseComponent {
  protected spriteSheetKey: string
  protected defaultAnim: string
  private _sprite: Phaser.GameObjects.Sprite | null;
  
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
  }

  create(): void {
    const body = this.entity.getComponentByTag<BodyComponent>(tags.BODY_COMPONENT_TAG, BodyComponent)
    this._sprite = this.entity.scene.add.sprite(body.initialX, body.initialY, this.spriteSheetKey, this.defaultAnim)
  }
  update(time: number, delta: number): void {}
  delete(): void {}

}