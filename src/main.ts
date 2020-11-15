import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 400,
	height: 300,
	backgroundColor: "#AAAAAA",
	// @ts-ignore
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 250 },
			debug: true
		}
	},
	scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
