import * as C from "../constants"
import TilemapEntity from '~/common/entities/TilemapEntity';
import BaseScene from '~/general/BaseScene';
import BaseSystem from '~/general/BaseSystem';
import _ from "lodash"
import SlidingEntity from '../entities/SlidingEntity';
import { Vec2 } from 'gameutils';

export type poleHeadData = {x: number, y: number}

export default class PoleSystem extends BaseSystem {
  protected tilemap: TilemapEntity | null
  constructor(scene: BaseScene, tilemap: TilemapEntity) {
    super(scene)
    this.tilemap = tilemap
  }

  create(){
    const heads: poleHeadData[] = []
    for (const layer of _.values(this.tilemap?.layers)) {
      for (let y = 0 ; y < C.TILEMAP_SIZE.y ; ++y) {
        for (let x = 0 ; x < C.TILEMAP_SIZE.x ; ++x) {
          if (layer?.hasTileAt(x, y)) {
            const tile = layer.getTileAt(x, y)
            if (tile.index === 23) {
              heads.push({x: x*32 + 16, y: y*32 + 16})
            }
          }
        }
      }
    }
    this.createEntities(heads)
  }

  protected createEntities(heads: poleHeadData[]) {
    const sorted = _.sortBy(_.sortBy(heads, h => h.y), h => h.x)
    const pairs = _.chunk(sorted, 2)
    for (const [start, end] of pairs) {
      const entity = new SlidingEntity(this.scene, {
        from: new Vec2(start.x, start.y),
        to: new Vec2(end.x, end.y)
      }, [])
      this.scene.addEntity(entity)
      entity.create()
      console.log("added a pole line")
    }
  }

  delete(){
    this.tilemap = null
  }
}