import BaseScene from "./BaseScene"
import IComponent from './IComponent'
import ILifecycleAware from './ILifecycleAware'
import ITagged from './ITagged'
import TagManager from "./TagManager"
import _ from "lodash"

export default class Entity implements ITagged, ILifecycleAware {
  protected _scene: BaseScene
  protected tagManager: TagManager
  protected components: IComponent[]
  
  public get scene(): BaseScene {
    return this._scene
  }

  constructor(scene: BaseScene, components: IComponent[], tags: string[]) {
    this._scene = scene
    this.components = components
    this.tagManager = new TagManager(tags)
  }

  public create(): void { for(const component of this.components) { component.create() } }
  public update(time, delta): void { for(const component of this.components) { component.update(time, delta) } }
  public delete(): void { for(const component of this.components) { component.delete() } }

  public hasTag(tag: string): boolean { return this.tagManager.hasTag(tag) }
  public hasAnyTag(tags: string[]): boolean { return this.tagManager.hasAnyTag(tags) }

  public getComponentByTag<T extends IComponent>(tag: string, type: any): T {
    for(const component of this.components) {
      if (component.hasTag(tag) && component instanceof type) {return component as T}
    }
    throw new Error(`Component with tag ${tag} was not found `)
  }
  public getComponentsByTag<T extends IComponent>(tag: string, type: any): T[] {
    return this.components.filter(c => c.hasTag(tag) && c instanceof type) as T[]
  }
  public getComponentsByTags<T extends IComponent>(tags: string[], type: any): T[] {
    return this.components.filter(c => _.some(tags.map(t => c.hasTag(t) && c instanceof type))) as T[]
  }

  public addComponent(component: IComponent) {this.components.push(component)}
}