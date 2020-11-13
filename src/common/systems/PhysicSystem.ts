import BaseScene from '~/general/BaseScene';
import BaseSystem from '~/general/BaseSystem';
import BodyComponent from '../components/BodyComponent';


export default class PhysicSystem extends BaseSystem {
  protected layers: Record<string, Phaser.Physics.Arcade.Group> = {}

  constructor(scene: BaseScene, layerNames: string[]) {
    super(scene)
    for(const name of layerNames) {
      this.layers[name] = new Phaser.Physics.Arcade.Group(this.scene.physics.world, this.scene)
    }
  }

  public addComponentToLayer(component: BodyComponent, name: string) {
    const gameObject = component.gameObject
    this.layers[name].add(gameObject)
  }

  public getGroup(groupName: string) {
    return this.layers[groupName]
  }


}