import * as C from "../common/constants"
import Phaser from "phaser"
import Entity from "./Entity"
import _ from "lodash"
import ISystem from './ISystem'
import { Vec2 } from 'gameutils'
import MusicSystem from '~/common/systems/MusicSystem'

type EntitySet = Set<Entity>

export default class BaseScene extends Phaser.Scene {
  private _entities: EntitySet = new Set()
  private _systems: Record<string, ISystem> = {}
  private _cleared: boolean = false
  
  public get entities(): EntitySet {
    return this._entities
  }
  public set entities(value: EntitySet) {
    this._entities = value
  }
  
  public addEntity(entity: Entity) {this.entities.add(entity)}
  public addEntities(...entities: Entity[]) {entities.map(e => this.addEntity(e))}

  public getEntityByTag(tag: string): Entity {
    for(const entity of Array.from(this.entities)) {
      if (entity.hasTag(tag)) return entity
    }
    throw new Error(`Entity with tag ${tag} was not found`)
  }

  public getEntitiesByTag(tag: string) {
    return Array.from(this.entities).filter(e => e.hasTag(tag))
  }

  public getEntitiesByTags(tags: string[]) {
    return Array.from(this.entities).filter(e => _.some(tags.map(t => e.hasTag(t))))
  }

  public addSystem(name: string, system: ISystem) {
    this._systems[name] = system
  }

  public getSystemByName<T extends ISystem>(name: string) {
    return this._systems[name] as T
  }

  public removeEntity(entity: Entity) {
    this.entities.delete(entity)
    entity.delete()
  }

  public transition(name: string) {
    this.scene.start(name)
    this._clear()
  }

  public preload() {
    this.scene.scene.load.audio(C.MAIN_AUDIO_TRACK, ["/audio/main-audio.mp3"])
  }

  public create() {
    this._cleared = false
    this.scale.setZoom(2)
    this.entities.forEach(e => e.create())
    this.input.on('pointerup', pointer => {
      if (pointer.leftButtonReleased()) {
        const pos = new Vec2(this.input.activePointer.x, this.input.activePointer.y)
        const cameraPos = new Vec2 (this.cameras.main.scrollX, this.cameras.main.scrollY)
        console.log(pos.add(cameraPos))
      }
    })
    this.addSystem(C.MUSIC_SYSTEM_NAME, new MusicSystem(this))
    _.values(this._systems).map(s => s.create())
    console.log(this._systems)
  }
  public update(time, delta) {
    if (!this._cleared) {
      this.entities.forEach(e => e.update(time, delta))
      _.values(this._systems).map(s => s.update(time, delta))
    }
  }
  public _clear() {
    this._cleared = true
    this.entities.forEach(e => e.delete())
    this.entities = new Set()
    for (const system of _.values(this._systems)) {
      system.delete()
    }
    this._systems = {}
  }

}