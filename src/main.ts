import Phaser from 'phaser'
import * as C from "./constants"

import HelloWorldScene from './scenes/HelloWorldScene'
import GameOverScene from "./scenes/GameOver"

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: C.GAME_WIDTH,
	height: C.GAME_HEIGHT,
	backgroundColor: "#000000",
	// @ts-ignore
	pixelArt: true,
	// @ts-ignore
	antialias: false,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 250 },
			// debug: true
		}
	},
	scene: [
		GameOverScene,
		HelloWorldScene,
	]
}

export default new Phaser.Game(config)
