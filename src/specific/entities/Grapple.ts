import * as C from "../constants"
import * as commonTags from "../../common/tags"
import Animator from '~/common/components/Animator';
import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';
import GrappleLineRenderer from '../components/GrappleLineRenderer';
import GrappleStateMachine, { GrapleState } from '../stateMachines/GrappleStateMachine';
import { FListener, Vec2 } from 'gameutils';
import BodyComponent from '~/common/components/BodyComponent';
import RendererComponent from '~/common/components/RendererComponent';
import GrappleFlyingController from '../components/GrappleFlyingController';
import GrappleBody from '../components/GrappleBody';


export default class Grapple extends Entity {
  public state: GrappleStateMachine = new GrappleStateMachine()
  protected _direction: Vec2
  protected _timeout: NodeJS.Timeout | null

  constructor(scene: BaseScene, launcher: Entity, direction: Vec2) {
    super(scene, [], [])
    this._direction = direction
    const launcherBody = launcher.getComponentByTag<BodyComponent>(commonTags.BODY_COMPONENT_TAG, BodyComponent)
    this.addComponent(new RendererComponent(this, {
      spriteSheetKey: "grapple",
      defaultAnim: "not-hooked",
    }, []))
    this.addComponent(new GrappleBody(this, {
      x: launcherBody.body.center.x + direction.unit().mul(50).x,
      y: launcherBody.body.center.y + direction.unit().mul(50).y,
      radius: 8,
      offsetX: 0,
      offsetY: 0,
      layer: C.GRAPPLE_PHYSIC_LAYER
    }, launcherBody))
    this.addComponent(new GrappleLineRenderer(this, launcher))
    const animator = new Animator(this, {
      current: "not-hooked",
      animations: C.GRAPPLE_ANIMATIONS
    }, [])
    this.addComponent(animator)
    this.addComponent(new GrappleFlyingController(this, launcherBody, {}))
    this.state.subscribe(new FListener(event => {
      switch(event.to) {
        case GrapleState.FLYING:
          animator.setAnimation(C.GRAPPLE_UNHOOKED_ANIM)
          break;
        case GrapleState.HOOKED:
          animator.setAnimation(C.GRAPPLE_HOOKED_ANIM)
      }
    }))
    this._timeout = null
  }

  public get direction() {return this._direction}
  
  create() {
    super.create()
    if (this._timeout) clearTimeout(this._timeout)
    this._timeout = setTimeout(() => {
      this.scene.removeEntity(this)
    }, 2000)
  }

  delete() {
    super.delete()
    this.state.purge()
    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }
  }

}