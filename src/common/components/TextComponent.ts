import BaseComponent from '~/general/BaseComponent'
import Entity from '~/general/Entity';

export interface TextComponentOptions {
  text: string
  x: number
  y: number
  color?: string
  fontSize?: number
}

export default class TextComponent extends BaseComponent {
  protected _phaserText: Phaser.GameObjects.Text | null
  protected _text: string
  protected _x: number
  protected _y: number
  protected _color: string
  protected _fontSize: number

  constructor(entity: Entity, options: TextComponentOptions) {
    super(entity, [])
    this._text = options.text
    this._x = options.x
    this._y = options.y
    this._phaserText = null
    this._color = options.color || '#ffffff'
    this._fontSize = options.fontSize || 12
  }

  create(): void {
    this._phaserText = this.entity.scene.add.text(this._x, this._y, this._text, {
      color: this._color,
      fontSize: this._fontSize
    })
    this._phaserText.setPosition(
      this._x - this._phaserText.width / 2,
      this._y - this._phaserText.height / 2,
    )
  }
  update(time: number, delta: number): void {
    
  }
  delete(): void {
    if (this._phaserText) {
      this._phaserText.destroy()
      this._phaserText = null
    }
  }

}