export default interface ILifecycleAware {
  create: () => void
  update: (time: number, delta: number) => void
  delete: () => void
}