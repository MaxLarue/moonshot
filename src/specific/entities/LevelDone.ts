import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import * as C from "../constants"
import ZoneTrigger from '~/common/components/ZoneTrigger';
import Entity from '~/general/Entity';
import { Rect } from 'gameutils';
import BaseScene from '~/general/BaseScene';
import RendererComponent from '~/common/components/RendererComponent';
import BodyComponent from '~/common/components/BodyComponent';
import Animator from '~/common/components/Animator';
import BaseComponent from '~/general/BaseComponent';
import PlayerEntity from './PlayerEntity';
import { PlayerStates } from '../stateMachines/PlayerStateMachine';

export class LevelDoneZoneDetector extends ZoneTrigger {
  protected levelDoneEntity: LevelDone

  constructor(entity: Entity, rect: Rect, levelDoneEntity: LevelDone) {
    super(entity, rect, [])
    this.levelDoneEntity = levelDoneEntity
  }

  public onEntityEnter(entity: Entity) {
    if (entity.hasTag(tags.PLAYER_ENTITY)) {
      this.levelDoneEntity.onDone()
    }
  }
  
  public onEntityLeave(entity: Entity) {}

}

export default class LevelDone extends Entity {
  protected _nextScene: string
  protected _animator: Animator

  constructor(scene: BaseScene, rect: Rect, nextScene: string) {
    super(scene, [], [])
    this.addComponent(new LevelDoneZoneDetector(this, rect, this))
    this._nextScene = nextScene
    this.addComponent(new RendererComponent(this, {
      spriteSheetKey: "cannon",
      defaultAnim: "cannon",
    }, []))
    this.addComponent(new BodyComponent(this, {
      x: 16802,
      y: 300,
      layer: C.UI_PHYSIC_LAYER,
    }, []))
    this._animator = new Animator(this, {
      animations: C.CANON_ANIMATIONS,
      current: C.CANON_IDLE_ANIM
    }, [])
    this.addComponent(this._animator)
  }

  public onDone() {
    const player = this.scene.getEntityByTag(tags.PLAYER_ENTITY) as PlayerEntity
    player.popComponentByTag(tags.PLAYER_CONTROLLER_COMPONENT, BaseComponent)
    const playerBody = player.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    playerBody.body.setVelocity(0, 0)
    playerBody.body.position.x = 16794
    player.stateMachine.transitionTo(PlayerStates.SHOT)
    setTimeout(() => {
      this._animator.setAnimation(C.CANON_FIRING_ANIM)
      setTimeout(() => {
        this._animator.setAnimation(C.CANON_IDLE_ANIM)
        playerBody.body.setVelocityY(-800)
        setTimeout(() => {
          this.scene.transition(this._nextScene)
        }, 1500)
      }, 500)
    }, 1000)
  }

}