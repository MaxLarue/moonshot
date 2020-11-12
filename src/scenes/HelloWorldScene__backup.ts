import Phaser from 'phaser'
import _ from "lodash"

export default class HelloWorldScene extends Phaser.Scene {
  map: any
  backgroundLayer: any
  detailLayer: any
  extraLayer: any
  cursors: any
  camera: any
  controls: any
  player: any

	constructor() {
		super('hello-world')
	}

	preload() {
    this.load.image('gameTiles', 'sprites/spritesheets/building-ex.png');
    this.load.atlas('player', 'sprites/spritesheets/player.png', 'sprites/spritesheets/player.json')
    this.load.tilemapTiledJSON('level1', 'maps/testmap.json');
  }

  create() {
    this.scale.setZoom(2)

    this.map = this.add.tilemap('level1', 32, 32);
    var tileset = this.map.addTilesetImage('building','gameTiles', 32, 32, 1, 2);
    this.backgroundLayer = this.map.createStaticLayer('backgroundLayer', tileset, 0, 0)
    this.detailLayer = this.map.createStaticLayer('details', tileset, 0, 0)
    this.extraLayer = this.map.createStaticLayer('extra', tileset, 0, 0)
    this.camera = this.cameras.main
    this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.player = this.physics.add.sprite(30, 30, 'player', 'still')
    this.backgroundLayer.setCollisionBetween(0, 9999, true)
    this.physics.add.collider(this.player, this.backgroundLayer)
    this.camera.startFollow(this.player)
  }

  update (time, delta)
  {

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(100);
    } else {
      this.player.body.setVelocityX(0);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.jump();
    }

  }

  jump = _.throttle(() => {this.player.setVelocityY(-200)}, 2000)



}
