import * as C from "../constants"
import { Rect, Vec2 } from 'gameutils'
import LevelDone from '~/specific/entities/LevelDone'
import LevelScene from "../specific/scenes/LevelScene"

export default class Level1Scene extends LevelScene {
  constructor() {
    super(C.LEVEL1_SCENE_NAME)
  }

  create() {
    super.create()
    const levelDoneRect = Rect.fromTopLeft(new Vec2(16804, 301.5), new Vec2(1, 1))
    const levelDoneEntity = new LevelDone(this, levelDoneRect, C.GAME_DONE_SCENE)
    this.addEntity(levelDoneEntity)
    levelDoneEntity.create()
  }
}