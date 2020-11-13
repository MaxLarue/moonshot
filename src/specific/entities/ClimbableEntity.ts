import { FListener, LiveData, Rect } from 'gameutils'
import BaseScene from "../../general/BaseScene"
import Entity from "../../general/Entity"
import ClimbableZoneDetector from '../components/ClimbableZoneDetector'
import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import BodyComponent from '~/common/components/BodyComponent'

export default class ClimbableEntity extends Entity {
  protected hookedEntity: LiveData<Entity | null>

  constructor(scene: BaseScene, zone: Rect, extraTags: string[]) {
    super(scene, [], [tags.CLIMBABLE_ENTITY_TAG, ...extraTags])
    this.hookedEntity = new LiveData(null)
    this.addComponent(
      new ClimbableZoneDetector(
        this,
        zone,
        [tags.CLIMBABLE_COMPONENT_TAG],
        {
          hooked: this.hookedEntity,
          filter: body => body.entity.hasTag(tags.PLAYER_COMPONENT_TAG)
        }
      )
    )
    this.hookedEntity.subscribe(new FListener(event => {
      if (event.next) this.onHookedIn(event.next)
      else if (event.previous) this.onHookedOut(event.previous)
    }))
  }

  public onHookedIn(entity: Entity) {
    const entityBody = entity
      .getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
      .body

    if (entityBody) {
      // @ts-ignore
      entityBody.allowGravity = false
      entityBody.velocity.y = 0
    }
  }

  public onHookedOut(entity: Entity) {
    const entityBody = entity
      .getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
      .body

    if (entityBody) {
      // @ts-ignore
      entityBody.allowGravity = true
    }
  }

}