import BaseScene from '~/general/BaseScene';
import * as tags from "../tags"
import * as C from "../constants"
import Entity from '~/general/Entity';
import BodyComponent from "../../common/components/BodyComponent"
import CameraFollowComponent from "../../common/components/CameraFollowComponent"
import PlayerController from "../components/PlayerJumpingController"
import {FListener, LiveData} from "gameutils"
import PlayerAnimator from '../components/PlayerAnimator';
import PlayerStateMachine, { PlayerStates } from "../stateMachines/PlayerStateMachine"
import PlayerRunningDetector from '../components/PlayerRunningDetector';
import RendererComponent from '~/common/components/RendererComponent';

export default class PlayerEntity extends Entity {
  protected isFacingRight: LiveData<boolean> = new LiveData<boolean>(true)
  protected _stateMachine: PlayerStateMachine = new PlayerStateMachine()
  protected animator: PlayerAnimator

  constructor(scene: BaseScene, extraTags: string[]) {
    super(scene, [], [tags.PLAYER_ENTITY, ...extraTags])
    this.addComponent(new RendererComponent(this, {
      spriteSheetKey: C.PLAYER_SPRITESHEET, 
      defaultAnim: C.PLAYER_DEFAULT_ANIM
    }, [tags.PLAYER_COMPONENT_TAG]))
    this.addComponent(new BodyComponent(this, {x: 30, y: 30, layer: C.PLAYER_PHYSIC_LAYER}, [tags.PLAYER_COMPONENT_TAG]))
    this.addComponent(new CameraFollowComponent(this, [tags.PLAYER_COMPONENT_TAG]))
    this.addComponent(new PlayerController(this, [tags.PLAYER_COMPONENT_TAG], this.isFacingRight, this._stateMachine))
    this.animator = new PlayerAnimator(this, {
      current: C.PLAYER_DEFAULT_ANIM,
      animations: C.PLAYER_ANIMATIONS
    }, [tags.PLAYER_COMPONENT_TAG], this.isFacingRight)
    // this.addComponent(new PlayerRunningDetector(this, [tags.PLAYER_COMPONENT_TAG], this._stateMachine))
    this.addComponent(this.animator)

    this._stateMachine.subscribe(new FListener((transition) => {
      switch(transition.to) {
        case PlayerStates.IDLE:
          this.animator.setAnimation(C.PLAYER_IDLE_ANIM)
          break
        case PlayerStates.IN_AIR:
          this.animator.setAnimation(C.PLAYER_JUMPING_ANIM)
          break
        case PlayerStates.RUNNING:
          this.animator.setAnimation(C.PLAYER_RUNNING_ANIM)
          break
      }
    }))
  }

  public get stateMachine(): PlayerStateMachine {
    return this._stateMachine
  }

  delete() {
    super.delete()
    this._stateMachine.purge()
  }
}