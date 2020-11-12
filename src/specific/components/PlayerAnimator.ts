import Animator, { AnimatorOptions } from '~/common/components/Animator';
import Entity from '~/general/Entity';
import {FListener, LiveData, LiveDataUpdateEvent} from "gameutils"


export default class PlayerAnimator extends Animator {
  protected isFacingRight: LiveData<boolean>
  protected onFacingSideChanged: FListener<LiveDataUpdateEvent<boolean>>

  constructor(entity: Entity, options: AnimatorOptions, extraTags: string[], isFacingRight: LiveData<boolean>) {
    super(entity, options, extraTags)
    this.isFacingRight = isFacingRight
    this.onFacingSideChanged = new FListener(() => {
      this.flip()
    })
    this.isFacingRight.subscribe(this.onFacingSideChanged)
  }

  public delete() {
    this.isFacingRight.unSubscribe(this.onFacingSideChanged)
    super.delete()
  }
}