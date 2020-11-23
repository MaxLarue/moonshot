import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import ParallaxBackgroundLayer from '../components/ParallaxBackgroundLayer';


export default class ParallaxBackground extends Entity {
  protected layers: ParallaxBackgroundLayer[] = []
  constructor(scene: BaseScene, controlled?: boolean) {
    super(scene, [], [])
    for (let i = 5 ; i > 0 ; --i) {
      const layer = new ParallaxBackgroundLayer(this, {
        spriteSheetKey: `background${i}`,
        scrollFactor: 1/i,
        controlled
      })
      this.addComponent(layer)
      this.layers.push(layer)
    }
  }

  public scroll(speed: number) {
    for(const layer of this.layers) {
      layer.scroll(speed)
    }
  }
}