import * as tags from "../tags"
import BaseScene from '~/general/BaseScene'
import Entity from "../../general/Entity"
import TilemapRenderer, {TilemapLayerNames, TilemapRendererOptions} from "../components/TilemapRenderer"

export interface TilemapEntityOptions extends TilemapRendererOptions {}

export default class TilemapEntity extends Entity {
  protected renderer: TilemapRenderer

  constructor(scene: BaseScene, options: TilemapRendererOptions, extraTags: string[]) {
    super(scene, [], [tags.TILEMAP_ENTITY_TAG, ...extraTags])
    this.renderer = new TilemapRenderer(this, options)
    this.components.push(this.renderer)
  }

  get layers(): Partial<Record<TilemapLayerNames, Phaser.Tilemaps.StaticTilemapLayer>> {
    return this.renderer.layers
  }

}