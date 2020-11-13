import Phaser from "phaser"
import Entity from "./Entity"
import _ from "lodash"
import ISystem from './ISystem'

type EntitySet = Set<Entity>

export default class BaseScene extends Phaser.Scene {
  private _entities: EntitySet = new Set()
  private _systems: Record<string, ISystem> = {}
  
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

  public preload() {}
  public create() {
    this.scale.setZoom(2)
    this.entities.forEach(e => e.create())
  }
  public update(time, delta) {
    this.entities.forEach(e => e.update(time, delta))
  }
  public stop() {
    this.entities.forEach(e => e.delete())
    this.entities = new Set()
  }

}