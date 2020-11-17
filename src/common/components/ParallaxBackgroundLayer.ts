import Entity from '~/general/Entity';
import * as rootC from "../../constants"
import BaseComponent from '~/general/BaseComponent';

export interface ParallaxBackgroundLayerOptions {
  scrollFactor: number
  spriteSheetKey: string
}

export default class ParallaxBackgroundLayer extends BaseComponent {
  protected _scrollFactor: number
  protected _spriteSheetKey: string
  protected _sprite: Phaser.GameObjects.TileSprite | null

  constructor(entity: Entity, options: ParallaxBackgroundLayerOptions) {
    super(entity, [])
    this._scrollFactor = options.scrollFactor
    this._spriteSheetKey = options.spriteSheetKey
    this._sprite = null
  }

  create() {
    this._sprite = this.entity.scene.add.tileSprite(
      0,
      0,
      rootC.GAME_WIDTH,
      rootC.GAME_HEIGHT,
      this._spriteSheetKey
    )
    this._sprite.setDisplayOrigin(0, 0)
    this._sprite.setScrollFactor(0)
    this._sprite.tileScaleX = 0.5
    this._sprite.tileScaleY = 0.5
  }

  update(time: number, delta: number) {
    if (this._sprite)
      this._sprite.tilePositionX = this.entity.scene.cameras.main.scrollX * this._scrollFactor
  }

  delete(): void {
    if (this._sprite)
      this._sprite.destroy()
    this._sprite = null
  }
}