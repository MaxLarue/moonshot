import * as tags from "../tags"
import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import SlidingRenderer, { SlidingRendererOptions } from '../components/SlidingRenderer';
import SlidingDetector from '../components/SlidingDetector';
import { Rect, Vec2, Line } from 'gameutils';

export interface SlidingEntityOptions extends SlidingRendererOptions {}

export default class SlidingEntity extends Entity {

  constructor(scene: BaseScene, options: SlidingEntityOptions, extraTags: string[]) {
    super(scene, [], [tags.SLIDING_ENTITY_TAG, ...extraTags])
    this.swapToAndFrom(options)
    this.addComponent(new SlidingRenderer(this, options, []))
    this.addComponent(new SlidingDetector(this, new Line(options.from, options.to), [], new Rect(0, 4, 12, 16)))
  }

  private swapToAndFrom(options: SlidingEntityOptions) {
    if (options.to.y > options.from.y) {
      const temp = options.to
      options.to = options.from
      options.from = temp
    }
  }

}