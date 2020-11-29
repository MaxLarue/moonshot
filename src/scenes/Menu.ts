import * as generalC from "../constants"
import * as commonC from "../common/constants"
import * as specificC from "../specific/constants"
import BaseScene from '~/general/BaseScene';
import TextEntity from '~/common/entities/TextEntity';
import Button, { ButtonOptions } from '~/common/entities/Button';
import _ from "lodash"
import PhysicSystem from '~/common/systems/PhysicSystem';
import Preferences from '~/preferences';

export class MenuSceneButton extends Button {
  protected sceneName: string

  constructor(scene: BaseScene, options: ButtonOptions, sceneName: string) {
    super(scene, options)
    this.sceneName = sceneName
  }

  onClick() {
    this.scene.transition(this.sceneName)
  }
}

export class KeyboardButton extends Button {

  constructor(scene: BaseScene, options: {x:number, y: number}) {
    const preferences = new Preferences()
    super(scene, {...options, text: preferences.keyboard})
  }

  onClick() {
    const preferences = new Preferences()
    preferences.keyboard = preferences.getOtherKeyboard(preferences.keyboard)
    this.textComponent.setText(preferences.keyboard)
  }
}

export default class Menu extends BaseScene {
  constructor() {
    super(generalC.MENU_SCENE_NAME)
  }

  preload() {
    super.preload()
    this.load.atlas('button', 'sprites/spritesheets/button.png', 'sprites/spritesheets/button.json')
  }

  create() {

    const xAxis = generalC.GAME_WIDTH / 2;
    const yAxis = generalC.GAME_HEIGHT / 2;
    this.addEntity(new TextEntity(this, {
      text: "Moonshot Man",
      x: xAxis,
      y: 80,
      fontSize: 20,
    }))
    this.addEntity(new MenuSceneButton(this, {
      x: xAxis,
      y: yAxis,
      text: "Play"
    }, generalC.LEVEL1_SCENE_NAME))
    this.addEntity(new TextEntity(this, {
      text: "Keyboard layout:"
      x: xAxis,
      y: yAxis + 40
    }))
    this.addEntity(new KeyboardButton(this, {
      x: xAxis,
      y: yAxis + 80,
    }))
    const collisionMatrix = _.fromPairs(_.zip(specificC.PHYSIC_LAYERS, specificC.PHYSIC_LAYERS.map(() => ({}))))
    collisionMatrix[specificC.UI_PHYSIC_LAYER][specificC.UI_PHYSIC_LAYER] = true
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, specificC.PHYSIC_LAYERS, collisionMatrix))
    super.create()
  }
}