import * as C from "../constants"
import BaseScene from '~/general/BaseScene';
import ISystem from '~/general/ISystem';
import BodyComponent from '../components/BodyComponent';

export type Layer = BodyComponent[]

export default class PhysicSystem implements ISystem {
  protected scene: BaseScene
  protected layerNames: string[]
  protected layers: Record<string, Layer>

  constructor(scene: BaseScene, layerNames: string[]) {
    this.scene = scene
    this.layerNames = layerNames
    this.layers = {}
    for (const layerName of layerNames) {
      this.layers[layerName] = []
    }
  }

  public registerBodyComponent(component: BodyComponent, layer: string) {
    if (!this.layerNames.includes(layer)) throw new Error(`Added a component to non initialized layer ${layer}`)
    for (const layerName in this.layers) {
      for (const obj of this.layers[layerName]) {
        this.scene.physics.add.collider(
          component.gameObject,
          obj.gameObject,
          (gameObject1, gameObject2) => {
            if (gameObject1.getData(C.GAME_OBJECT_COMPONENT_HANDLE) && gameObject2.getData(C.GAME_OBJECT_COMPONENT_HANDLE)) {
              gameObject1.getData(C.GAME_OBJECT_COMPONENT_HANDLE).onCollide(
                gameObject2.getData(C.GAME_OBJECT_COMPONENT_HANDLE)
              )
            }
          }
        )
      }
    }
    this.layers[layer].push(component)
  }

  public unregisterBodyComponent(component: BodyComponent, layer: string) {
    const index = this.layers[layer].indexOf(component)
    if (index !== -1) {
      this.layers[layer].splice(index)
    }
  }

  create(): void {}
  update(time: number, delta: number): void {}
  delete(): void {
    this.layers = {}
  }
  
}