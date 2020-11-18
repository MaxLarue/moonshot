import * as C from "../../specific/constants"
import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import BodyComponent from '../components/BodyComponent';
import RendererComponent from '../components/RendererComponent';
import TextComponent from '../components/TextComponent';
import Animator from '../components/Animator';

export interface ButtonOptions {
  sprite: string
  x: number,
  y: number,
  text: string,
  textColor?: string
}

export default abstract class Button extends Entity {
  protected body: BodyComponent
  protected renderer: RendererComponent
  protected animator: Animator

  constructor(scene: BaseScene, options: ButtonOptions) {
    super(scene, [], [])


    this.renderer = new RendererComponent(this, {
      spriteSheetKey: options.sprite,
      defaultAnim: 'button'
    }, [])
    this.addComponent(this.renderer)

    this.body = new BodyComponent(this, {
      x: options.x,
      y: options.y,
      layer: C.UI_PHYSIC_LAYER,
    }, [])
    this.addComponent(this.body)

    this.animator = new Animator(this, {
      animations: C.BUTTON_ANIMATIONS,
      current: C.BUTTON_DEFAULT_ANIMATION
    }, [])
    this.addComponent(this.animator)

    this.addComponent(new TextComponent(this, {
      x: options.x,
      y: options.y,
      text: options.text,
      color: options.textColor
    }))
  }

  create() {
    super.create()
    this.body.body.setEnable(false)
    this.renderer.sprite.setInteractive()
    this.renderer.sprite.on("pointerover", () => {
      this.animator.setAnimation(C.BUTTON_HOVER_ANIMATION)
    })
    this.renderer.sprite.on("pointerout", () => {
      this.animator.setAnimation(C.BUTTON_DEFAULT_ANIMATION)
    })
    this.renderer.sprite.on("pointerdown", () => {
      this.onClick()
    })
  }

  abstract onClick(): void
}