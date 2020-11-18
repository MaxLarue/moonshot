import * as tags from "../tags"
import * as C from "../constants"
import BaseComponent from '~/general/BaseComponent'
import Entity from '~/general/Entity';
import RendererComponent from './RendererComponent';
import PhysicSystem from '../systems/PhysicSystem';
import TilemapRenderer from './TilemapRenderer';
import {Rect, Vec2} from "gameutils"

export interface BodyOption {
  x: number,
  y: number,
  layer: string
}

export default class BodyComponent extends BaseComponent {
  private _initialX: number;
  private _initialY: number;
  protected layer: string = ""

  protected _gameObject: Phaser.GameObjects.GameObject | null

  constructor(entity: Entity, options: BodyOption, extraTags: string[]) {
    super(entity, [tags.BODY_COMPONENT_TAG, ...extraTags])
    this._initialX = options.x
    this._initialY = options.y
    this._gameObject = null
    this.layer = options.layer
  }

  public get initialX(): number {
    return this._initialX;
  }

  public get initialY(): number {
    return this._initialY;
  }

  public get center(): Vec2 {
    if (this.body) {
      return new Vec2(this.body.center.x, this.body.center.y)
    }
    throw new Error("BodyComponent has no body")
  }

  public get rect(): Rect {
    if (this.body)
      return new Rect(this.body.x, this.body.y, this.body.width, this.body.height)
    throw new Error("BodyComponent has no body")
  }

  public get body() { return this._gameObject?.body as Phaser.Physics.Arcade.Body }

  public get gameObject() {
    if (this._gameObject) {
      return this._gameObject 
    } else {
      throw new Error("BodyComponent has no gameObject")
    }
  }

  public onCollide(other: Entity) {}

  create(): void {
    const renderer = this.entity.getComponentByTag<RendererComponent>(tags.RENDERER_COMPONENT_TAG, RendererComponent)
    this._gameObject = this.entity.scene.physics.add.existing(renderer.sprite, false)
    this._gameObject.setData(C.GAME_OBJECT_COMPONENT_HANDLE, this)
    this.entity.scene.getSystemByName<PhysicSystem>(C.PHYSIC_SYSTEM_NAME)
      .addComponentToLayer(this, this.layer)
    if (this.entity.scene.getEntitiesByTag(tags.TILEMAP_ENTITY_TAG).length) {
      this.entity.scene.getEntityByTag(tags.TILEMAP_ENTITY_TAG)
        .getComponentByTag<TilemapRenderer>(tags.TILEMAP_COMPONENT_TAG, TilemapRenderer)
        .addCollider(this.gameObject)
    }
  }

  update(time: number, delta: number): void {}
  delete(): void {
    if (this._gameObject) {
      this._gameObject.destroy()
      this._gameObject = null
    }
  }

}