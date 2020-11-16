import * as C from "../constants"
import * as tags from "../tags"
import { Rect } from 'gameutils';
import BaseScene from '~/general/BaseScene';
import BaseSystem from '~/general/BaseSystem';
import BodyComponent from '../components/BodyComponent';
import Entity from '~/general/Entity';

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
            (obj1, obj2) => {
              console.log(obj1, obj2)
              if (obj1.getData(C.GAME_OBJECT_COMPONENT_HANDLE) && obj2.getData(C.GAME_OBJECT_COMPONENT_HANDLE)) {
                const body1 = (obj1.getData(C.GAME_OBJECT_COMPONENT_HANDLE) as BodyComponent)
                const body2 = (obj2.getData(C.GAME_OBJECT_COMPONENT_HANDLE) as BodyComponent)
                body2.onCollide(body1.entity)
                body1.onCollide(body2.entity)
              }
            }
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

  public getGameObjectsInZone(rect: Rect) {
    return this.scene.physics.overlapRect(rect.x, rect.y, rect.w, rect.h)
  }

}