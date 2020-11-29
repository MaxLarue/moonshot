import * as tags from "../tags"
import * as generalC from "../../constants"
import BodyComponent from '~/common/components/BodyComponent';
import ZoneDetector from '~/common/components/ZoneDetector';
import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import { Rect } from 'gameutils';

export class GameOverZoneDetector extends ZoneDetector {
  public onObjectIsIn(body: BodyComponent) {
    if (body.entity.hasTag(tags.PLAYER_ENTITY)) {
      console.log("clearing")
      this.entity.scene._clear()
      this.entity.scene.transition(generalC.GAMEOVER_SCENE_NAME)
    }
  }
}

export default class GameOverDetector extends Entity {

  constructor(scene: BaseScene) {
    super(scene, [], [])
    this.addComponent(new GameOverZoneDetector(this, new Rect(0, 1000, 999999999, 999999), []))
  }

}