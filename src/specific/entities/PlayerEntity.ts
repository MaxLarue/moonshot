import BaseScene from '~/general/BaseScene';
import * as tags from "../tags"
import * as commonTags from "../../common/tags"
import * as C from "../constants"
import Entity from '~/general/Entity';
import BodyComponent from "../../common/components/BodyComponent"
import CameraFollowComponent from "../../common/components/CameraFollowComponent"
import PlayerController from "../components/PlayerJumpingController"
import {FListener, LiveData} from "gameutils"
import PlayerAnimator from '../components/PlayerAnimator';
import PlayerStateMachine, { PlayerStates } from "../stateMachines/PlayerStateMachine"
import RendererComponent from '~/common/components/RendererComponent';
import GrappleCapacity from '../components/GrappleCapacity';

export default class PlayerEntity extends Entity {
  protected _isFacingRight: LiveData<boolean> = new LiveData<boolean>(true)
  protected _stateMachine: PlayerStateMachine = new PlayerStateMachine()
  protected animator: PlayerAnimator

  constructor(scene: BaseScene, extraTags: string[]) {
    super(scene, [], [tags.PLAYER_ENTITY, ...extraTags])
    this.addComponent(new RendererComponent(this, {
      spriteSheetKey: C.PLAYER_SPRITESHEET, 
      defaultAnim: C.PLAYER_DEFAULT_ANIM
    }, [tags.PLAYER_COMPONENT_TAG]))
    this.addComponent(new BodyComponent(this, {x: 50, y: 30, layer: C.PLAYER_PHYSIC_LAYER}, [tags.PLAYER_COMPONENT_TAG]))
    this.addComponent(new CameraFollowComponent(this, [tags.PLAYER_COMPONENT_TAG]))
    this.addComponent(new PlayerController(this, [tags.PLAYER_COMPONENT_TAG], this._isFacingRight, this._stateMachine))
    this.animator = new PlayerAnimator(this, {
      current: C.PLAYER_DEFAULT_ANIM,
      animations: C.PLAYER_ANIMATIONS
    }, [tags.PLAYER_COMPONENT_TAG], this._isFacingRight)
    this.addComponent(this.animator)
    this.addComponent(new GrappleCapacity(this, [tags.PLAYER_COMPONENT_TAG]))

    this._stateMachine.subscribe(new FListener((transition) => {
      switch(transition.to) {
        case PlayerStates.IDLE:
          setTimeout(() => {
            if (this._stateMachine.getState() === PlayerStates.IDLE)
              this.animator.setAnimation(C.PLAYER_IDLE_ANIM)
          }, 100)
          break
        case PlayerStates.IN_AIR:
          this.animator.setAnimation(C.PLAYER_JUMPING_ANIM)
          break
        case PlayerStates.RUNNING:
          this.animator.setAnimation(C.PLAYER_RUNNING_ANIM)
          break
        case PlayerStates.CLIMBING:
          this.animator.setAnimation(C.PLAYER_CLIMBING_ANIM)
          break;
        case PlayerStates.CLIMBING_IDLE:
          this.animator.setAnimation(C.PLAYER_CLIMBING_IDLE)
          break;
        case PlayerStates.SLIDING:
          this.animator.setAnimation(C.PLAYER_SLIDING_ANIM)
          break;
        case PlayerStates.SHOT:
          this.animator.setAnimation(C.PLAYER_SHOT)
          break;
      }
    }))
  }

  public get stateMachine(): PlayerStateMachine {
    return this._stateMachine
  }

  public get isFacingRight(): LiveData<boolean> {
    return this._isFacingRight
  }

  create() {
    super.create()
    this.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
      .body
      .setSize(14, 26)
      .setOffset(8, 6)
  }

  delete() {
    super.delete()
    this._stateMachine.purge()
  }
}