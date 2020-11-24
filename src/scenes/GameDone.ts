import * as C from "../constants"
import * as commonC from "../common/constants"
import * as specificC from "../specific/constants"
import BaseScene from '~/general/BaseScene';
import ParallaxBackground from '~/common/entities/ParallaxBackground';
import TextEntity from '~/common/entities/TextEntity';
import Button from '~/common/entities/Button';
import PhysicSystem from '~/common/systems/PhysicSystem';
import _ from "lodash"

export class BackToMenuEntity extends Button {
  onClick(): void {
    this.scene.transition(C.MENU_SCENE_NAME)
  }
}

export default class GameDone extends BaseScene {
  protected background: ParallaxBackground | null

  constructor() {
    super(C.GAME_DONE_SCENE)
    this.background = null
  }

  preload() {
    super.preload()
    this.load.image('background1', 'sprites/spritesheets/backgrounds/1.png');
    this.load.image('background2', 'sprites/spritesheets/backgrounds/2.png');
    this.load.image('background3', 'sprites/spritesheets/backgrounds/3.png');
    this.load.image('background4', 'sprites/spritesheets/backgrounds/4.png');
    this.load.image('background5', 'sprites/spritesheets/backgrounds/5.png');
    this.load.atlas('player', 'sprites/spritesheets/player.png', 'sprites/spritesheets/player.json')
    this.load.atlas('button', 'sprites/spritesheets/button.png', 'sprites/spritesheets/button.json')
  }

  create() {
    this._clear()
    this.background = new ParallaxBackground(this, true)
    this.addEntity(this.background)
    const halfWidth = C.GAME_WIDTH / 2;
    this.addEntity(new TextEntity(this, {
      text: "Well done !",
      x: halfWidth,
      y: C.GAME_HEIGHT / 3,
      fontSize: 24,
    }))
    this.addEntity(new TextEntity(this, {
      text: "you finished the game",
      x: halfWidth,
      y: C.GAME_HEIGHT / 2
    }))
    this.addEntity(new BackToMenuEntity(this, {
      text: "Menu",
      x: C.GAME_WIDTH / 2,
      y: C.GAME_HEIGHT / 3 * 2
    }))
    const collisionMatrix = _.fromPairs(_.zip(specificC.PHYSIC_LAYERS, specificC.PHYSIC_LAYERS.map(() => ({}))))
    collisionMatrix[specificC.UI_PHYSIC_LAYER][specificC.UI_PHYSIC_LAYER] = true
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, specificC.PHYSIC_LAYERS, collisionMatrix))
    super.create()
  }

  update(time: number, delta: number) {
    if (this.background)
      this.background.scroll(Math.min(time, 10000) / 2000)
    super.update(time, delta)
  }

}