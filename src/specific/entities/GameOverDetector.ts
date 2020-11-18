import * as tags from "../tags"
import BodyComponent from '~/common/components/BodyComponent';
import ZoneDetector from '~/common/components/ZoneDetector';
import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import { Rect } from 'gameutils';

export class GameOverZoneDetector extends ZoneDetector {
  public onObjectIsIn(body: BodyComponent) {
    if (body.entity.hasTag(tags.PLAYER_ENTITY)) {
      this.entity.scene.transition("gameover")
    }
  }
}

export default class GameOverDetector extends Entity {

  constructor(scene: BaseScene) {
    super(scene, [], [])
    this.addComponent(new GameOverZoneDetector(this, new Rect(0, 1000, 999999, 999999), []))
  }

}