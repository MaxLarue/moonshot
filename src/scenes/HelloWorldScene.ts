import * as C from "../specific/constants"
import * as commonC from "../common/constants"
import BaseScene from "../general/BaseScene"
import _ from "lodash"
import TilemapEntity from '~/common/entities/TilemapEntity';
import PlayerEntity from "../specific/entities/PlayerEntity"
import PhysicSystem from '~/common/systems/PhysicSystem';
import Entity from '~/general/Entity';
import ZoneDetector from '~/common/components/ZoneDetector';
import { Rect, Vec2 } from 'gameutils';
import ClimbableEntity from '~/specific/entities/ClimbableEntity';
import SlidingEntity from '~/specific/entities/SlidingEntity';

export default class HelloWorldScene extends BaseScene {
  
	constructor() {
    super('hello-world')
	}

	preload() {
    this.load.image('gameTiles', 'sprites/spritesheets/building-ex.png');
    this.load.atlas('player', 'sprites/spritesheets/player.png', 'sprites/spritesheets/player.json')
    this.load.tilemapTiledJSON('level1', 'maps/testmap.json');
  }

  create() {
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
    const collisionMatrix = _.fromPairs(_.zip(C.PHYSIC_LAYERS, C.PHYSIC_LAYERS.map(() => ({}))))
    collisionMatrix[C.PLAYER_PHYSIC_LAYER][C.PLAYER_PHYSIC_LAYER] = true
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, C.PHYSIC_LAYERS, collisionMatrix))
    super.create()
  }
}
