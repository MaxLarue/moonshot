import * as C from "../constants"
import * as commonC from "../../common/constants"
import { Rect, Vec2 } from 'gameutils';
import ParallaxBackground from '~/common/entities/ParallaxBackground';
import TilemapEntity from '~/common/entities/TilemapEntity';
import BaseScene from '~/general/BaseScene';
import ClimbableEntity from '../entities/ClimbableEntity';
import GameOverDetector from '../entities/GameOverDetector';
import PlayerEntity from '../entities/PlayerEntity';
import SlidingEntity from '../entities/SlidingEntity';
import _ from "lodash"
import PhysicSystem from '~/common/systems/PhysicSystem';
import InputSystem from '~/common/systems/InputSystem';
import PoleSystem from '../systems/PoleSystem';
import LadderSystem from '../systems/LadderSystem';
import PointSystem from '../systems/PointSystem';


export default class LevelScene extends BaseScene {
  constructor(sceneName: string) {
    super(sceneName)
  }

  preload() {
    super.preload()
    this.load.image('gameTiles', 'sprites/spritesheets/building-ex.png');
    this.load.image('background1', 'sprites/spritesheets/backgrounds/1.png');
    this.load.image('background2', 'sprites/spritesheets/backgrounds/2.png');
    this.load.image('background3', 'sprites/spritesheets/backgrounds/3.png');
    this.load.image('background4', 'sprites/spritesheets/backgrounds/4.png');
    this.load.image('background5', 'sprites/spritesheets/backgrounds/5.png');
    this.load.atlas('player', 'sprites/spritesheets/player.png', 'sprites/spritesheets/player.json')
    this.load.atlas('grapple', 'sprites/spritesheets/grapple.png', 'sprites/spritesheets/grapple.json')
    this.load.atlas('cannon', 'sprites/spritesheets/cannon.png', 'sprites/spritesheets/cannon.json')
    this.load.atlas('moon', 'sprites/spritesheets/moon.png', 'sprites/spritesheets/moon.json')
    this.load.tilemapTiledJSON('level1', 'maps/first-level.json');
  }

  create() {
    this._clear()
    this.addEntity(new ParallaxBackground(this))
    const tilemap = new TilemapEntity(this, {
      dataKey: "level1",
      tileSetName: "building",
      tileSetSheetKey: "gameTiles"
    }, [])
    this.addEntity(tilemap)
    this.addEntity(new PlayerEntity(this, []))
    this.addEntity(new GameOverDetector(this))
    const collisionMatrix = _.fromPairs(_.zip(C.PHYSIC_LAYERS, C.PHYSIC_LAYERS.map(() => ({}))))
    collisionMatrix[C.PLAYER_PHYSIC_LAYER][C.PLAYER_PHYSIC_LAYER] = true
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, C.PHYSIC_LAYERS, collisionMatrix))
    this.addSystem(commonC.INPUT_SYSTEM_NAME, new InputSystem(this))
    this.addSystem(C.POLE_SYSTEM_NAME, new PoleSystem(this, tilemap))
    this.addSystem(C.LADDER_SYSTEM_NAME, new LadderSystem(this, tilemap))
    this.addSystem(C.POINT_SYSTEM_NAME, new PointSystem(this, tilemap))
    super.create()
  }
}