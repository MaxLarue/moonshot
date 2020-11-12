import Phaser from "phaser"
import Entity from "./Entity"
import _ from "lodash"
import ISystem from './ISystem'

type EntitySet = Set<Entity>
type Systems = Record<string, ISystem>

export default class BaseScene extends Phaser.Scene {
  private _entities: EntitySet = new Set()
  protected _systems: Systems = {}
  
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

  public getSystem<T extends ISystem>(name: string, type: any): T {
    if (name in this._systems && this._systems[name] instanceof type) {
      return this._systems[name] as T
    }
    throw new Error(`Cannot find system with name ${name}`)
  }

  public preload() {}
  public create() {
    this.scale.setZoom(2)
    this.entities.forEach(e => e.create())
    _.mapValues(this._systems, s => s.create())
  }
  public update(time, delta) {
    this.entities.forEach(e => e.update(time, delta))
    _.mapValues(this._systems, s => s.update(time, delta))
  }
  public stop() {
    this.entities.forEach(e => e.delete())
    this.entities = new Set()
    _.mapValues(this._systems, s => s.delete())
    this._systems = {}
  }

}