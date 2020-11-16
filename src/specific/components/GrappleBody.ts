import * as tags from "../tags"
import CircleBodyComponent, { CircleBodyComponentOptions } from '~/common/components/CircleBodyComponent';
import Entity from '~/general/Entity';
import BaseComponent from '~/general/BaseComponent';
import GrapplehookedController from './GrappleHookedController';
import BodyComponent from '~/common/components/BodyComponent';
import Grapple from '../entities/Grapple';
import { GrapleState } from '../stateMachines/GrappleStateMachine';

export default class GrappleBody extends CircleBodyComponent {
  protected _launcherBody: BodyComponent
  protected grapple: Grapple

  constructor(entity: Grapple, options: CircleBodyComponentOptions, launcherBody: BodyComponent) {
    super(entity, options)
    this._launcherBody = launcherBody
    this.grapple = entity
  }

  public onCollide(other: Entity) {
    this.entity.popComponentByTag(tags.GRAPPLE_CONTROLLER, BaseComponent)
    const controller = new GrapplehookedController(this.entity, this._launcherBody, {})
    this.entity.addComponent(controller)
    controller.create()
    this.grapple.state.transitionTo(GrapleState.HOOKED)
  }

}