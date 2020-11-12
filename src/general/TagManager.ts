import _ from "lodash"


export default class TagManager {
  private tags: Set<string> = new Set()

  constructor(tags: string[]) {
    this.tags = new Set(tags)
  }

  public hasTag(tag: string): boolean {
    return this.tags.has(tag)
  }

  public hasAnyTag(tags: string[]): boolean {
    return _.some(tags.map(t => this.hasTag(t)))
  }

}