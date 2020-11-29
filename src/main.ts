import Phaser from 'phaser'
import * as C from "./constants"

import MenuScene from "./scenes/Menu"
import Level1 from './scenes/level1'
import GameOverScene from "./scenes/GameOver"
import GameDoneScene from "./scenes/GameDone"

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: "game",
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
		MenuScene,
		Level1,
		GameOverScene,
		GameDoneScene,
	]
}

export default new Phaser.Game(config)
