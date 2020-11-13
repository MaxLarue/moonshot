import * as tags from "../tags"
import BaseScene from '~/general/BaseScene'
import Entity from "../../general/Entity"
import TilemapRenderer, {TilemapRendererOptions} from "../components/TilemapRenderer"

export interface TilemapEntityOptions extends TilemapRendererOptions {}

export default class TilemapEntity extends Entity {
  constructor(scene: BaseScene, options: TilemapRendererOptions, extraTags: string[]) {
    super(scene, [], [tags.TILEMAP_ENTITY_TAG, ...extraTags])
    const renderer = new TilemapRenderer(this, options)
    this.components.push(renderer)
  }

  // public addCollider(gameobject: Phaser.GameObjects.GameObject) {
  //   this.getComponentByTag<TilemapRenderer>(tags.TILEMAP_COMPONENT_TAG, TilemapRenderer)
  //     .addCollider(gameobject)
  // }
}