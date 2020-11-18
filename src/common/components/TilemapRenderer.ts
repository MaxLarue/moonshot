import * as tags from "../tags"
import * as C from "../constants"
import BaseComponent from '../../general/BaseComponent';
import Entity from '../../general/Entity';
import _ from "lodash"


export enum TilemapLayerNames {
  Background = "Background",
  BackgroundDetails = "BackgroundDetails",
  BackgroundExtra = "BackgroundExtra",
  Terrain = "Terrain",
  TerrainDetails = "TerrainDetails",
  TerrainExtra = "TerrainExtra",
  Decorations = "Decorations",
  DecorationsDetails = "DecorationsDetails",
  DecorationsExtra = "DecorationsExtra",
}

export interface TilemapRendererOptions {
  dataKey: string
  tileSize?: number,
  tileSetName: string,
  tileSetSheetKey: string
}

export default class TilemapRenderer extends BaseComponent {
  private _dataKey: string
  private _tileSize: number;
  private _tileSetName: string;
  private _tileSetSheetKey: string;
  private _map: Phaser.Tilemaps.Tilemap | null
  private _tileset: Phaser.Tilemaps.Tileset | null
  private layers: Partial<Record<TilemapLayerNames, Phaser.Tilemaps.StaticTilemapLayer>>


  constructor(entity: Entity, options: TilemapRendererOptions) {
    super(entity, [tags.TILEMAP_COMPONENT_TAG])
    this._dataKey = options.dataKey
    this._tileSize = options.tileSize || 32
    this._tileSetName = options.tileSetName
    this._tileSetSheetKey = options.tileSetSheetKey
    this.layers = {}
    this._map = null
    this._tileset = null
  }

  create(): void {
    this._map = this.entity.scene.add.tilemap(this._dataKey, this._tileSize, this._tileSize)
    this._tileset = this._map.addTilesetImage(
      this._tileSetName,
      this._tileSetSheetKey,
      this._tileSize,
      this._tileSize,
      1,
      2
    )
    this.layers[TilemapLayerNames.Background] = this._map
      .createStaticLayer(TilemapLayerNames.Background, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.BackgroundDetails] = this._map
      .createStaticLayer(TilemapLayerNames.BackgroundDetails, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.BackgroundExtra] = this._map
      .createStaticLayer(TilemapLayerNames.BackgroundExtra, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.Terrain] = this._map
      .createStaticLayer(TilemapLayerNames.Terrain, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.TerrainDetails] = this._map
      .createStaticLayer(TilemapLayerNames.TerrainDetails, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.TerrainExtra] = this._map
      .createStaticLayer(TilemapLayerNames.TerrainExtra, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.Decorations] = this._map
      .createStaticLayer(TilemapLayerNames.Decorations, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.DecorationsDetails] = this._map
      .createStaticLayer(TilemapLayerNames.DecorationsDetails, this._tileset, 0, 0)
    this.layers[TilemapLayerNames.DecorationsExtra] = this._map
      .createStaticLayer(TilemapLayerNames.DecorationsExtra, this._tileset, 0, 0)
    
    
    this.layers[TilemapLayerNames.Terrain]?.setCollisionBetween(0, 9999, true)
    
    this.entity.scene.cameras?.main.setBounds(0, 0, this._map.widthInPixels, this._map.heightInPixels)
    
  }
  update(time: number, delta: number): void {}
  delete(): void {
    for (const layer of _.values(this.layers)) {
      layer?.destroy()
    }
    this.layers = {}
    if (this._map) {
      this._map.destroy()
    }
  }

  public get tileSize(): number {
    return this._tileSize;
  }
  
  public get tileSetName(): string {
    return this._tileSetName;
  }

  public get tileSetSheetKey(): string {
    return this._tileSetSheetKey;
  }

  public get dataKey(): string {
    return this._dataKey
  }

  public addCollider(gameobject: Phaser.GameObjects.GameObject) {
    const layer = this.layers[TilemapLayerNames.Terrain]
    if (layer) {
      this.entity.scene.physics.add.collider(layer, gameobject, obj => {
        if (obj.getData(C.GAME_OBJECT_COMPONENT_HANDLE))
          obj.getData(C.GAME_OBJECT_COMPONENT_HANDLE).onCollide(this.entity)
      })
    }
  }

}