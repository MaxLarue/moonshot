import BaseScene from './BaseScene';
import ISystem from './ISystem';


export default class BaseSystem implements ISystem {
  protected scene: BaseScene

  constructor(scene: BaseScene) {
    this.scene = scene
  }

  create(): void {}
  update(time: number, delta: number) {}
  delete(): void {}

}