import Entity from './Entity';
import IComponent from "./IComponent"
import TagManager from './TagManager';


export default abstract class BaseComponent implements IComponent {
  entity: Entity
  tagManager: TagManager

  constructor(entity: Entity, tags: string[]) {
    this.entity = entity
    this.tagManager = new TagManager(tags)
  }

  abstract create(): void
  abstract update(time: number, delta: number): void
  abstract delete(): void
  hasTag(tag: string): boolean {return this.tagManager.hasTag(tag)}
  hasAnyTag(tags: string[]): boolean {return this.tagManager.hasAnyTag(tags)}

}