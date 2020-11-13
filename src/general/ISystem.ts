export default interface ISystem {
  create(): void
  update(time: number, delta: number)
  delete(): void
}