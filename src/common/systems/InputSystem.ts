import BaseSystem from '~/general/BaseSystem';


export default class InputSystem extends BaseSystem {
  
  getMovementCursor() {
    return this.scene.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.Z,
      'left': Phaser.Input.Keyboard.KeyCodes.Q,
      'right': Phaser.Input.Keyboard.KeyCodes.D,
      'down': Phaser.Input.Keyboard.KeyCodes.S 
    });
  }

}