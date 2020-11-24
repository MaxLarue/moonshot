import _ from "lodash";
import * as C from "../constants"
import TilemapEntity from '~/common/entities/TilemapEntity';
import BaseScene from '~/general/BaseScene';
import BaseSystem from '~/general/BaseSystem';
import { Rect, Vec2 } from 'gameutils';
import ClimbableEntity from '../entities/ClimbableEntity';

const LEFT_LADDER_TILES = [2, 3, 4]
const RIGHT_LADDER_TILES = [19, 20, 21]

export type SingleLadderData = {x: number, y: number, left: boolean}[]
export type LadderData = SingleLadderData[]

export default class LadderSystem extends BaseSystem {
  protected tilemap: TilemapEntity | null
  constructor(scene: BaseScene, tilemap: TilemapEntity) {
    super(scene)
    this.tilemap = tilemap
  }

  create(){
    const ladders: LadderData = []
    for (const layer of _.values(this.tilemap?.layers)) {
      for (let x = 0 ; x < C.TILEMAP_SIZE.x ; ++x) {
        let currentLadder: SingleLadderData | null = null
        for (let y = 0 ; y < C.TILEMAP_SIZE.y ; ++y) {
          if (layer?.hasTileAt(x, y)) {
            const tile = layer.getTileAt(x, y)
            if(LEFT_LADDER_TILES.includes(tile.index) && !currentLadder) {
              currentLadder = [{x, y, left: true}]
            } else if (LEFT_LADDER_TILES.includes(tile.index) && currentLadder) {
              currentLadder.push({x, y, left: true})
            } else if(RIGHT_LADDER_TILES.includes(tile.index) && !currentLadder) {
              currentLadder = [{x, y, left: false}]
            } else if (RIGHT_LADDER_TILES.includes(tile.index) && currentLadder) {
              currentLadder.push({x, y, left: false})
            } else if (currentLadder) {
              ladders.push(currentLadder)
              currentLadder = null
            }
          } else if (currentLadder) {
            ladders.push(currentLadder)
            currentLadder = null
          }
        }
      }
    }
    this.createEntities(ladders)
  }

  protected createEntities(ladders: LadderData) {
    for (const ladder of ladders) {
      const sorted = _.sortBy(ladder, p => p.y)
      const top = _.first(sorted)
      const bottom = _.last(sorted)
      if (top && bottom) {
        const topOffset = top.left
          ? new Vec2(18, 16)
          : new Vec2(0, 16)
        const bottomOffset = top.left
          ? new Vec2(32, 16)
          : new Vec2(16, 16)
        const topPos = new Vec2(top.x, top.y).mul(32).add(topOffset)
        const bottomPos = new Vec2(bottom.x, bottom.y).mul(32).add(bottomOffset)
        const rect = Rect.fromTopLeftBottomRight(topPos, bottomPos)
        const entity = new ClimbableEntity(this.scene, rect, [], !top.left)
        this.scene.addEntity(entity)
        entity.create()
      }

    }
  }

  delete(){
    this.tilemap = null
  }
}