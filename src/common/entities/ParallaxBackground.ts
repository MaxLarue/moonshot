import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import ParallaxBackgroundLayer from '../components/ParallaxBackgroundLayer';


export default class ParallaxBackground extends Entity {
  constructor(scene: BaseScene) {
    super(scene, [], [])
    for (let i = 5 ; i > 0 ; --i) {
      this.addComponent(new ParallaxBackgroundLayer(this, {
        spriteSheetKey: `background${i}`,
        scrollFactor: 1/i
      }))
    }
  }
}