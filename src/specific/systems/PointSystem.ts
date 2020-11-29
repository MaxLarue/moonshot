import * as C from "../constants"
import BaseSystem from '~/general/BaseSystem';
import TilemapEntity from '~/common/entities/TilemapEntity';
import BaseScene from '~/general/BaseScene';
import _ from "lodash"
import { TilemapLayerNames } from '~/common/components/TilemapRenderer';
import { LiveData } from 'gameutils';
import Moon from '../entities/Moon';
import ScoreHolder from '../entities/ScoreHolder';

export type Moons = {x: number, y: number}[]

export default class PointSystem extends BaseSystem {
  protected tilemap: TilemapEntity;
  protected _score: LiveData<number>;
  constructor(scene: BaseScene, tilemap: TilemapEntity) {
    super(scene)
    this.tilemap = tilemap
    this._score = new LiveData<number>(0)
  }

  public get score(): number {
    return this._score.get()
  }

  create() {
    const moons: Moons = []
    const layer = this.tilemap.layers[TilemapLayerNames.Points]
    for (let y = 0 ; y < C.TILEMAP_SIZE.y ; ++y) {
      for (let x = 0 ; x < C.TILEMAP_SIZE.x ; ++x) {
        if (layer?.hasTileAt(x, y)) {
          moons.push({x: x*32 + 16, y: y*32 + 16})
        }
      }
    }
    if (layer)
      layer.alpha = 0
    this.createMoons(moons)
    const scoreHolder = new ScoreHolder(this.scene, this._score)
    this.scene.addEntity(scoreHolder)
    scoreHolder.create()
  }

  createMoons(moons: Moons) {
    for (const moonCoordinate of moons) {
      const entity = new Moon(this.scene, moonCoordinate, [], this._score)
      this.scene.addEntity(entity)
      entity.create()
    }
  }

}