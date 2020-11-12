import BaseScene from "../BaseScene"
import Entity from "../Entity"
import createMockInstance from "jest-create-mock-instance"


describe("testing base scene entity by tag", () => {
  it("can get an entity by a single tag", () => {
    const scene = new BaseScene({})
    const entity = new Entity(createMockInstance(BaseScene), [], ["a"])
    scene.addEntity(entity)
    expect(scene.getEntityByTag("a")).toBe(entity)
  })
  it("can get an multiple entities by tags", () => {
    const scene = new BaseScene({})
    const entity1 = new Entity(createMockInstance(BaseScene), [], ["a"])
    const entity2 = new Entity(createMockInstance(BaseScene), [], ["b"])
    scene.addEntity(entity1)
    scene.addEntity(entity2)
    expect(scene.getEntityByTag("a")).toBe(entity1)
    expect(scene.getEntityByTag("b")).toBe(entity2)
  })
  it("can get all entities which have a tag", () => {
    const scene = new BaseScene({})
    const entity1 = new Entity(createMockInstance(BaseScene), [], ["a"])
    const entity2 = new Entity(createMockInstance(BaseScene), [], ["a"])
    scene.addEntity(entity1)
    scene.addEntity(entity2)
    expect(scene.getEntitiesByTag("a")).toEqual([entity1, entity2])
  })
  it("can get all entities which have tag that's in a list", () => {
    const scene = new BaseScene({})
    const entity1 = new Entity(createMockInstance(BaseScene), [], ["a"])
    const entity2 = new Entity(createMockInstance(BaseScene), [], ["b"])
    scene.addEntity(entity1)
    scene.addEntity(entity2)
    expect(scene.getEntitiesByTags(["a", "b"])).toEqual([entity1, entity2])
  })
})