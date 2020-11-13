import * as tags from "../tags"
import * as C from "../constants"
import { Rect } from 'gameutils';
import BaseComponent from '~/general/BaseComponent';
import Entity from '~/general/Entity';
import PhysicSystem from '../systems/PhysicSystem';
import BodyComponent from './BodyComponent';

export default class ZoneDetector extends BaseComponent {
  protected rect: Rect
  protected physicSystem: PhysicSystem | null

  constructor(entity: Entity, rect: Rect, extraTags: string[]) {
    super(entity, [tags.ZONE_DETECTOR_COMPONENT, ...extraTags])
    this.rect = rect
    this.physicSystem = null
  }

  create(): void {
    this.physicSystem = this.entity.scene.getSystemByName<PhysicSystem>(C.PHYSIC_SYSTEM_NAME)
  }
  update(time: number, delta: number): void {
    const bodies = this.physicSystem?.getGameObjectsInZone(this.rect)
    if (bodies) {
      for (const body of bodies) {
        if (body.gameObject.getData(C.GAME_OBJECT_COMPONENT_HANDLE)) {
          this.onObjectIsIn(body.gameObject.getData(C.GAME_OBJECT_COMPONENT_HANDLE))
        }
      }
    }
  }
  delete(): void {}

  protected onObjectIsIn(body: BodyComponent) {}

}