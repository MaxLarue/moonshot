import * as C from "../specific/constants"
import * as commonC from "../common/constants"
import BaseScene from "../general/BaseScene"
import _ from "lodash"
import TilemapEntity from '~/common/entities/TilemapEntity';
import PlayerEntity from "../specific/entities/PlayerEntity"
import PhysicSystem from '~/common/systems/PhysicSystem';
import { Rect, Vec2 } from 'gameutils';
import ClimbableEntity from '~/specific/entities/ClimbableEntity';
import SlidingEntity from '~/specific/entities/SlidingEntity';
import InputSystem from '~/common/systems/InputSystem';
import ParallaxBackground from '~/common/entities/ParallaxBackground';
import GameOverDetector from '~/specific/entities/GameOverDetector';

export default class HelloWorldScene extends BaseScene {
  
	constructor() {
    super('hello-world')
	}

	preload() {
    this.load.image('gameTiles', 'sprites/spritesheets/building-ex.png');
    this.load.image('background1', 'sprites/spritesheets/backgrounds/1.png');
    this.load.image('background2', 'sprites/spritesheets/backgrounds/2.png');
    this.load.image('background3', 'sprites/spritesheets/backgrounds/3.png');
    this.load.image('background4', 'sprites/spritesheets/backgrounds/4.png');
    this.load.image('background5', 'sprites/spritesheets/backgrounds/5.png');
    this.load.atlas('player', 'sprites/spritesheets/player.png', 'sprites/spritesheets/player.json')
    this.load.atlas('grapple', 'sprites/spritesheets/grapple.png', 'sprites/spritesheets/grapple.json')
    this.load.tilemapTiledJSON('level1', 'maps/testmap.json');
  }

  create() {
    this._clear()
    this.addEntity(new ParallaxBackground(this))
    this.addEntity(
      new ClimbableEntity(this, Rect.fromTopLeftBottomRight(new Vec2(410, 362), new Vec2(418, 560)), [])
    )
    this.addEntity(
      new ClimbableEntity(this, Rect.fromTopLeftBottomRight(new Vec2(2490, 156), new Vec2(2497, 1216)), [])
    )
    this.addEntity(new TilemapEntity(this, {
      dataKey: "level1",
      tileSetName: "building",
      tileSetSheetKey: "gameTiles"
    }, []))
    this.addEntity(new PlayerEntity(this, []))
    this.addEntity(new SlidingEntity(this, {
      from: new Vec2(496, 304),
      to: new Vec2(975.5, 559.5)
    }, []))
    this.addEntity(new SlidingEntity(this, {
      to: new Vec2(2512, 79),
      from: new Vec2(1071, 559.5)
    }, []))
    this.addEntity(new GameOverDetector(this))
    const collisionMatrix = _.fromPairs(_.zip(C.PHYSIC_LAYERS, C.PHYSIC_LAYERS.map(() => ({}))))
    collisionMatrix[C.PLAYER_PHYSIC_LAYER][C.PLAYER_PHYSIC_LAYER] = true
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, C.PHYSIC_LAYERS, collisionMatrix))
    this.addSystem(commonC.INPUT_SYSTEM_NAME, new InputSystem(this))
    super.create()
  }
}
