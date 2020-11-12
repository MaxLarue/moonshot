import BaseScene from '../BaseScene'
import Entity from "../Entity"
import createMockInstance from "jest-create-mock-instance"
import IComponent from '../IComponent'

class DummyComponent implements IComponent {
  entity = jest.fn() as unknown as Entity
  create = jest.fn()
  update = jest.fn()
  delete = jest.fn()
  hasTag = jest.fn()
  hasAnyTag = jest.fn()
  addComponent = jest.fn()
}


describe("testing the entity tag system", () => {
  it("has a tag", () => {
    const entity = new Entity(createMockInstance(BaseScene), [], ["hello"])
    expect(entity.hasTag("hello")).toBe(true)
  })
  it("does not have a tag", () => {
    const entity = new Entity(createMockInstance(BaseScene), [], ["hey"])
    expect(entity.hasTag("hello")).toBe(false)
  })
})

describe("testing the entity scene integration", () => {
  test("the scene is accessible on the entity", () => {
    const sceneMock = createMockInstance(BaseScene)
    const entity = new Entity(sceneMock, [], ["hello"])
    expect(entity.scene).toBe(sceneMock)
  })
  test("an entity can fetch another entity by tag", () => {
    const scene = new BaseScene({})
    const entity1 = new Entity(scene, [], ["a"])
    const entity2 = new Entity(scene, [], ["b"])
    scene.addEntities(entity1, entity2)
    expect(scene.getEntityByTag("a").scene.getEntityByTag("b")).toBe(entity2)
  })
})

describe("Testing entity component delegation", () => {
  const fakeA = new DummyComponent()
  const fakeB = new DummyComponent()

  beforeEach(() => jest.resetAllMocks())

  it("calls create on components", () => {
    const entity = new Entity(createMockInstance(BaseScene), [fakeA, fakeB], [])
    entity.create()
    expect(fakeA.create).toHaveBeenCalled()
    expect(fakeB.create).toHaveBeenCalled()
  })

  it("calls update on components", () => {
    const entity = new Entity(createMockInstance(BaseScene), [fakeA, fakeB], [])
    entity.update(1, 2)
    expect(fakeA.update).toHaveBeenCalledWith(1, 2)
    expect(fakeB.update).toHaveBeenCalledWith(1, 2)
  })

  it("calls delete on components", () => {
    const entity = new Entity(createMockInstance(BaseScene), [fakeA, fakeB], [])
    entity.delete()
    expect(fakeA.delete).toHaveBeenCalled()
    expect(fakeB.delete).toHaveBeenCalled()
  })
})

describe("test cross component access", () => {
  it("allows to get a single component by tag", () => {
    const component = new DummyComponent()
    component.hasTag.mockReturnValue(true)
    const entity = new Entity(createMockInstance(BaseScene), [component], [])
    expect(entity.getComponentByTag<IComponent>("a", DummyComponent))
      .toEqual(component)
  })

  it("allows to get multiple components by tag", () => {
    const component1 = new DummyComponent()
    const component2 = new DummyComponent()
    component1.hasTag.mockReturnValue(true)
    component2.hasTag.mockReturnValue(true)
    const entity = new Entity(createMockInstance(BaseScene), [component1, component2], [])
    expect(entity.getComponentsByTag<IComponent>("a", DummyComponent))
      .toEqual([component1, component2])
  })

  it("allows to get multiple components by multiple tags", () => {
    const component1 = new DummyComponent()
    const component2 = new DummyComponent()
    component1.hasTag.mockReturnValue(true)
    component2.hasTag.mockReturnValue(true)
    const entity = new Entity(createMockInstance(BaseScene), [component1, component2], [])
    expect(entity.getComponentsByTags<IComponent>(["a", "b"], DummyComponent))
      .toEqual([component1, component2])
  })
})