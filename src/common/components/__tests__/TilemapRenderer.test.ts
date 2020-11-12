import createMockInstance from 'jest-create-mock-instance'
import BaseScene from '../../../general/BaseScene'
import Entity from '../../../general/Entity'
import TilemapRenderer, { TilemapLayerNames } from "../TilemapRenderer"


describe("Testing the TilemapRendererComponent", () => {
  const entity = new Entity(createMockInstance(BaseScene), [], [])
  let tileSetMock
  let tilemapMock
  let tilemapConstructorMock
  let addMock
  

  beforeEach(() => {
    jest.resetAllMocks()
    entity.delete()
    tileSetMock = createMockInstance(Phaser.Tilemaps.Tileset)
    tilemapMock = createMockInstance(Phaser.Tilemaps.Tilemap)
    tilemapMock.addTilesetImage.mockReturnValue(tileSetMock)
    tilemapConstructorMock = jest.fn(() => tilemapMock)
    addMock = {tilemap: tilemapConstructorMock}
    entity.scene.add = addMock as unknown as Phaser.GameObjects.GameObjectFactory
  })

  it("gets his options from options object", () => {
    const tileSetName = 'some tileset'
    const tileSetSheetKey = 'some tilesheet key'
    const component = new TilemapRenderer(entity, {
      dataKey: "",
      tileSetName,
      tileSetSheetKey
    })
    expect(component.tileSetName).toBe(tileSetName)
    expect(component.tileSetSheetKey).toBe(tileSetSheetKey)
  })

  it("takes a tilesize of 32 by default", () => {
    const component = new TilemapRenderer(entity, {
      dataKey: "",
      tileSetName: "",
      tileSetSheetKey: "",
    })
    expect(component.tileSize).toBe(32)
  })

  it("creates the tilemap in create method", () => {
    const component = new TilemapRenderer(entity, {
      dataKey: "key",
      tileSetName: "tilesetname",
      tileSetSheetKey: "tilesheetkey",
    })
    component.create()
    expect(tilemapConstructorMock).toHaveBeenCalledWith("key", 32, 32)
  })

  it("adds the tileset in create method", () => {
    const tileSetName = "tilesetname"
    const tileSetSheetKey = "tilesheetkey"
    const tileSize = 48
    const component = new TilemapRenderer(entity, {
      dataKey: "key",
      tileSetName,
      tileSetSheetKey,
      tileSize
    })
    component.create()
    expect(tilemapMock.addTilesetImage)
      .toHaveBeenCalledWith(tileSetName, tileSetSheetKey, tileSize, tileSize, 1, 2)
  })

  it("creates all layers in create method", () => {
    const component = new TilemapRenderer(entity, {
      dataKey: "key",
      tileSetName: "tileSetName",
      tileSetSheetKey: "tileSetSheetKey",
    })
    
    component.create()
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(1, TilemapLayerNames.Background, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(2, TilemapLayerNames.BackgroundDetails, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(3, TilemapLayerNames.BackgroundExtra, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(4, TilemapLayerNames.Terrain, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(5, TilemapLayerNames.TerrainDetails, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(6, TilemapLayerNames.TerrainExtra, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(7, TilemapLayerNames.Decorations, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(8, TilemapLayerNames.DecorationsDetails, tileSetMock, 0, 0)
    expect(tilemapMock.createStaticLayer)
      .toHaveBeenNthCalledWith(9, TilemapLayerNames.DecorationsExtra, tileSetMock, 0, 0)
  })

  it("does nothing during update", () => {
    const component = new TilemapRenderer(entity, {
      dataKey: "key",
      tileSetName: "tileSetName",
      tileSetSheetKey: "tileSetSheetKey",
    })
    component.update(0, 0)
  })

  it("does nothing during delete", () => {
    const component = new TilemapRenderer(entity, {
      dataKey: "key",
      tileSetName: "tileSetName",
      tileSetSheetKey: "tileSetSheetKey",
    })
    component.delete()
  })
})