import CircleBodyComponent from '~/common/components/CircleBodyComponent';
import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import * as tags from "../tags"
import * as C from "../constants"
import RendererComponent from '~/common/components/RendererComponent';
import { LiveData, Rect, Vec2 } from 'gameutils';
import ZoneTrigger from '~/common/components/ZoneTrigger';


export interface MoonOptions {
  x: number,
  y: number
}

export class MoonDetector extends ZoneTrigger {
  protected score: LiveData<number>
  constructor(entity: Entity, rect: Rect, score: LiveData<number>) {
    super(entity, rect, [])
    this.score = score
  }

  onEntityEnter(entity: Entity) {
    if (entity.hasTag(tags.PLAYER_ENTITY)) {
      this.score.set(this.score.get() + 200)
      this.entity.scene.removeEntity(this.entity)
    }
  }
  public onEntityLeave(entity: Entity) {}

}

export default class Moon extends Entity {
  constructor(scene: BaseScene, options: MoonOptions, extraTags: string[], score: LiveData<number>) {
    super(scene, [], [tags.MOON_ENTITY, ...extraTags])

    this.addComponent(new RendererComponent(this, {
      defaultAnim: "moon",
      spriteSheetKey: "moon",
    }, []))
    const body = new CircleBodyComponent(this, {
      radius: 13,
      offsetX: 0,
      offsetY: 0,
      x: options.x,
      y: options.y,
      disabled: true,
      layer: C.PLAYER_PHYSIC_LAYER
    })
    this.addComponent(body)
    const detector = new MoonDetector(this,
      Rect.fromCenter(new Vec2(options.x, options.y), new Vec2(13, 13)),
      score
    )
    this.addComponent(detector)
  }

}