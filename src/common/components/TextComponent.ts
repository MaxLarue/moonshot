import { Vec2 } from 'gameutils';
import BaseComponent from '~/general/BaseComponent'
import Entity from '~/general/Entity';

export interface TextComponentOptions {
  text: string
  x: number
  y: number
  color?: string
  fontSize?: number,
  fixed?: boolean
}

export default class TextComponent extends BaseComponent {
  protected _phaserText: Phaser.GameObjects.Text | null
  protected _text: string
  protected _x: number
  protected _y: number
  protected _color: string
  protected _fontSize: number
  protected _fixed: boolean

  constructor(entity: Entity, options: TextComponentOptions) {
    super(entity, [])
    this._text = options.text
    this._x = options.x
    this._y = options.y
    this._phaserText = null
    this._color = options.color || '#ffffff'
    this._fontSize = options.fontSize || 12
    this._fixed = !!options.fixed
  }
  public setText(to: string) {
    this._phaserText?.setText(to)
  }
  public setPos(to: Vec2) {
    if (this._phaserText) {
      const offseted = to.sub(new Vec2(this._phaserText.width, this._phaserText.height).div(2))
      this._phaserText?.setPosition(
        offseted.x,
        offseted.y
      )
    }
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
    if(this._fixed) this._phaserText.setScrollFactor(0)
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