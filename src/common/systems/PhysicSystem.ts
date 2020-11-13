import { times } from 'lodash';
import BaseScene from '~/general/BaseScene';
import BaseSystem from '~/general/BaseSystem';
import BodyComponent from '../components/BodyComponent';

export type CollisionMatrix = Record<string, Record<string, Phaser.Physics.Arcade.Group>>

export default class PhysicSystem extends BaseSystem {
  protected layers: Record<string, Phaser.Physics.Arcade.Group> = {}
  protected collisionMatrix: CollisionMatrix = {}

  constructor(scene: BaseScene, layerNames: string[], collisionMatrix: CollisionMatrix) {
    super(scene)
    for(const name of layerNames) {
      this.layers[name] = new Phaser.Physics.Arcade.Group(this.scene.physics.world, this.scene)
    }
    this.collisionMatrix = collisionMatrix
    for (const outerLayerName in this.collisionMatrix) {
      for (const innerLayerName in this.collisionMatrix[outerLayerName]) {
        if (this.collisionMatrix[outerLayerName][innerLayerName]) {
          this.scene.physics.add.collider(
            this.layers[outerLayerName],
            this.layers[innerLayerName],
          )
        }
      }
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