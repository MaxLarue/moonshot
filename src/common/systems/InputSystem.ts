import BaseSystem from '~/general/BaseSystem';
import Preferences, { Keyboard } from '~/preferences';

export default class InputSystem extends BaseSystem {
  
  getMovementCursor() {
    const keyboard = new Preferences().keyboard
    if (keyboard === Keyboard.AZERTY) {
      return this.scene.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.Z,
        'left': Phaser.Input.Keyboard.KeyCodes.Q,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'down': Phaser.Input.Keyboard.KeyCodes.S 
      })
    } else {
      return this.scene.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'down': Phaser.Input.Keyboard.KeyCodes.S 
      })
    }
  }

}