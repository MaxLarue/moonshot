import * as tags from "../tags"
import ZoneTrigger from '~/common/components/ZoneTrigger';
import Entity from '~/general/Entity';
import { Rect } from 'gameutils';
import BaseScene from '~/general/BaseScene';

export class LevelDoneZoneDetector extends ZoneTrigger {
  protected levelDoneEntity: LevelDone

  constructor(entity: Entity, rect: Rect, levelDoneEntity: LevelDone) {
    super(entity, rect, [])
    this.levelDoneEntity = levelDoneEntity
  }

  public onEntityEnter(entity: Entity) {
    if (entity.hasTag(tags.PLAYER_ENTITY)) {
      this.levelDoneEntity.onDone()
    }
  }
  
  public onEntityLeave(entity: Entity) {}

}

export default class LevelDone extends Entity {
  protected _nextScene: string

  constructor(scene: BaseScene, rect: Rect, nextScene: string) {
    super(scene, [], [])
    this.addComponent(new LevelDoneZoneDetector(this, rect, this))
    this._nextScene = nextScene
  }

  public onDone() {
    this.scene.transition(this._nextScene)
  }

}