import * as C from "../specific/constants"
import * as generalC from "../constants"
import * as commonC from "../common/constants"
import * as rootC from "../constants"
import Button from '~/common/entities/Button';
import BaseScene from '~/general/BaseScene';
import PhysicSystem from '~/common/systems/PhysicSystem';
import TextEntity from "../common/entities/TextEntity"
import _ from "lodash"

export class RetryButton extends Button {
  public onClick() {
    this.scene.transition(rootC.LEVEL1_SCENE_NAME)
  }
}

export default class GameOverScene extends BaseScene {
  constructor() {
    super(generalC.GAMEOVER_SCENE_NAME)
  }

  preload() {
    this.load.atlas('button', 'sprites/spritesheets/button.png', 'sprites/spritesheets/button.json')
  }

  create() {
    this._clear()
    this.addEntity(new RetryButton(this, {
      x: rootC.GAME_WIDTH / 2,
      y: 2 * rootC.GAME_HEIGHT / 3,
      sprite: 'button',
      text: "Try again ?"
    }))

    this.addEntity(new TextEntity(this, {
      x: rootC.GAME_WIDTH / 2,
      y: rootC.GAME_HEIGHT / 3,
      text: "Game Over",
      fontSize: 32,
    }))
    const collisionMatrix = _.fromPairs(_.zip(C.PHYSIC_LAYERS, C.PHYSIC_LAYERS.map(() => ({}))))
    collisionMatrix[C.UI_PHYSIC_LAYER][C.UI_PHYSIC_LAYER] = true
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, C.PHYSIC_LAYERS, collisionMatrix))
    super.create()
  }
  
}