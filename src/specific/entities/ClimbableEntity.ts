import BaseScene from "../../general/BaseScene"
import Entity from "../../general/Entity"
import * as tags from "../tags"

export default class ClimbableEntity extends Entity {

  constructor(scene: BaseScene, extraTags: string[]) {
    super(scene, [], [tags.CLIMBABLE_ENTITY_TAG, ...extraTags])
  }

}