export default interface ITagged {
  hasTag: (tag: string) => boolean
  hasAnyTag: (tags: string[]) => boolean
}