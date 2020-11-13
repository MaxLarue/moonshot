import * as C from "../specific/constants"
import * as commonC from "../common/constants"
import BaseScene from "../general/BaseScene"
import _ from "lodash"
import TilemapEntity from '~/common/entities/TilemapEntity';
import PlayerEntity from "../specific/entities/PlayerEntity"
import PhysicSystem from '~/common/systems/PhysicSystem';

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
    this.addEntity(new TilemapEntity(this, {
      dataKey: "level1",
      tileSetName: "building",
      tileSetSheetKey: "gameTiles"
    }, []))
    this.addEntity(new PlayerEntity(this, []))
    this.addSystem(commonC.PHYSIC_SYSTEM_NAME, new PhysicSystem(this, C.PHYSIC_LAYERS))
    super.create()
  }
}
