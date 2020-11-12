import * as tags from "../tags"
import BaseComponent from '~/general/BaseComponent';
import BodyComponent from "./BodyComponent"


export default class CameraFollowComponent extends BaseComponent {
  create(): void {
    const body = this.entity.getComponentByTag<BodyComponent>(tags.BODY_COMPONENT_TAG, BodyComponent)
    if (body.body) {
      this.entity.scene.cameras.main.startFollow(body.body)
    }
  }
  update(time: number, delta: number): void {}
  delete(): void {}

}