import * as tags from "../tags"
import BaseComponent from '~/general/BaseComponent';
import RendererComponent from "./RendererComponent"
import Entity from '~/general/Entity';

export interface Animation {
  key: string
  frameNames: string[]
  spriteSheetKey: string
  loop?: boolean
  frameRate?: number
}

export interface AnimatorOptions {
  animations: Animation[]
  current: string
}

export default class Animator extends BaseComponent {
  protected _renderer: RendererComponent | null
  protected _animations: Animation[]
  protected _current: string

  constructor(entity: Entity, options: AnimatorOptions, extraTags: string[]) {
    super(entity, [tags.ANIMATOR_COMPONENT, ...extraTags])
    this._animations = options.animations
    this._renderer = null
    this._current = options.current
  }

  create(): void {
    for (const anim of this._animations) {
      this.entity.scene.anims.create({
        key: anim.key,
        frames: anim.frameNames.map(name => ({key: anim.spriteSheetKey, frame: name})),
        repeat: anim.loop ? -1 : 1,
        frameRate: anim.frameRate || 24
      })
    }
    this._renderer = this.entity.getComponentByTag<RendererComponent>(tags.RENDERER_COMPONENT_TAG, RendererComponent)
  }

  update(time: number, delta: number): void {
    this.setAnimation(this._current)
  }

  delete(): void {
    
  }

  public setAnimation(key: string) {
    if (this._renderer && this._renderer.sprite
      && this._current !== key) {
        this.entity.scene.anims.play(key, this._renderer?.sprite)
        this._current = key
    }
  }

  public flip() {
    if (this._renderer && this._renderer.sprite) {
      this._renderer.sprite.flipX = !this._renderer.sprite.flipX
      this.entity.scene.anims.play(this._current, this._renderer?.sprite)
    }
  }

}