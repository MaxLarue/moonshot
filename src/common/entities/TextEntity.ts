import BaseScene from "../../general/BaseScene"
import Entity from "../../general/Entity"
import TextComponent, {TextComponentOptions} from "../components/TextComponent"

export interface TextEntityOptions extends TextComponentOptions {

}

export default class TextEntity extends Entity {
  constructor(scene: BaseScene, options: TextEntityOptions) {
    super(scene, [], [])

    this.addComponent(new TextComponent(this, options))
  }
}