import * as C from "../specific/constants"
import * as commonC from "../common/constants"
import BaseScene from "../general/BaseScene"
import _ from "lodash"
import TilemapEntity from '~/common/entities/TilemapEntity';
import PlayerEntity from "../specific/entities/PlayerEntity"
import PhysicSystem from '~/common/systems/PhysicSystem';
import Entity from '~/general/Entity';
import ZoneDetector from '~/common/components/ZoneDetector';
import { Rect } from 'gameutils';

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
    const detector = new Entity(this, [], [])
    detector.addComponent(new ZoneDetector(detector, new Rect(200, 0, 99999, 99999), []))
    this.addEntity(detector)
    this.addEntity(new TilemapEntity(this, {
      dataKey: "level1",
      tileSetName: "building",
      tileSetSheetKey: "gameTiles"
    }, []))
    this.addEntity(new PlayerEntity(this, []))
    this.addEntity(new PlayerEntity(this, []))
    const collisionMatrix = _.fromPairs(_.zip(C.PHYSIC_LAYERS, C.PHYSIC_LAYERS.map(() => ({}))))
    collisionMatrix[C.PLAYER_PHYSIC_LAYER][C.PLAYER_PHYSIC_LAYER] = true
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, C.PHYSIC_LAYERS, collisionMatrix))
    super.create()
  }
}
