const fs = require("fs")
const path = require("path")
const exec = require("child_process")
const {series, parallel} = require("gulp")
const rimraf = require("rimraf")
const customPacker = require("./scripts/customPacker")
const { extrudeTilesetToImage } = require("tile-extruder");

const baseOriginalSprites = "public/sprites/original"
const basePngSprites = "public/sprites/png"
const baseSpriteSheets = "public/sprites/spritesheets"

const tiles = [
    {name: "building"},
]

const sprites = [
    {name: "player"},
    {name: "grapple"},
    {name: "button", spriteSize: {x: 100, y: 33}}
]

const raw = [
    {name: "backgrounds"},
]

function createDir(cb, path) {
    fs.mkdir(path, {recursive: true}, cb)
}

function copyDir(cb, from, to) {
    const cmd = `cp -r ${from} ${to}`
    exec.exec(cmd, function(err, stdout, stderr) {
        cb(err)
    })
}

function exportToPng(cb, spriteKey) {
    const source = path.join(baseOriginalSprites, spriteKey)
    const target = path.join(basePngSprites, spriteKey)
    const cmd = `./scripts/exportToPng.sh ${source} ${target}`
    exec.exec(cmd, function (err, stdout, stderr) {
        // console.log(stderr);
        cb(err);
    });
}

function packageSprites(cb, spriteKey, spriteSize) {
    const sourceFolder = path.join(basePngSprites, spriteKey)
    const targetSpriteSheet = path.join(baseSpriteSheets, spriteKey + ".png")
    const targetMetadata = path.join(baseSpriteSheets, spriteKey + ".json")
    customPacker({
        sourceDirectory: sourceFolder,
        targetFile: targetSpriteSheet,
        targetDataFile: targetMetadata,
        tileSize: spriteSize
    })
    .then(() => cb())
    .catch(err => cb(err))
}

function packageTiles(cb, spriteKey) {
    const sourceFolder = path.join(basePngSprites, spriteKey)
    const targetSpriteSheet = path.join(baseSpriteSheets, spriteKey + ".png")
    customPacker({
        sourceDirectory: sourceFolder,
        targetFile: targetSpriteSheet,
    })
    .then(() => cb())
    .catch(err => cb(err))
}

function expandTask(arrow, name, prefix) {
    const fun = function (cb) {
        arrow(cb)
    }
    Object.defineProperty(fun, 'name', {value: `[${prefix}] => ${name}`})
    return fun
}

function cleanPng(cb) {
    rimraf(basePngSprites, {force: true}, cb)
}

function cleanSpriteSheets(cb) {
    rimraf(baseSpriteSheets, {force: true}, cb)
}

function extrudeTiles(cb, spriteKey) {
    const tilesSheet = path.join(baseSpriteSheets, spriteKey + ".png")
    const extrudedTilesSheet = path.join(baseSpriteSheets, spriteKey + "-ex.png")
    extrudeTilesetToImage(32, 32, tilesSheet, extrudedTilesSheet)
        .then(() => cb())
        .catch(cb)
}

function makeTilesTasks() {
    const tasks = tiles.map(tile => series(
        expandTask(
            cb => createDir(cb, path.join(basePngSprites, tile.name)),
            `Ensure png dir exists`,
            tile.name),
        expandTask(
            cb => createDir(cb, baseSpriteSheets),
            `Ensure spritesheet dir exists`,
            tile.name),
        expandTask(
            cb => exportToPng(cb, tile.name),
            `Export to png`,
            tile.name),
        expandTask(
            cb => packageTiles(cb, tile.name),
            `Package into spritesheet`,
            tile.name),
        expandTask(
            cb => extrudeTiles(cb, tile.name),
            `Extrude tiles`,
            tile.name)
    ))
    return parallel(...tasks)
}

function makeSpritesTaks() {
    const tasks = sprites.map(sprite => series(
        expandTask(
            cb => createDir(cb, path.join(basePngSprites, sprite.name)),
            `Ensure png dir exists`,
            sprite.name),
        expandTask(
            cb => createDir(cb, baseSpriteSheets),
            `Ensure spritesheet dir exists`,
            sprite.name),
        expandTask(
            cb => exportToPng(cb, sprite.name),
            `Export to png`,
            sprite.name),
        expandTask(
            cb => packageSprites(cb, sprite.name, sprite.spriteSize),
            `Package into spritesheet`,
            sprite.name),
    ))
    return parallel(...tasks)
}

function makeRawTasks() {
    const tasks = raw.map(raw => series(
        expandTask(
            cb => createDir(cb, path.join(basePngSprites, raw.name)),
            `Ensure png dir exists`,
            raw.name),
        expandTask(
            cb => exportToPng(cb, raw.name),
            `Export to png`,
            raw.name),
        expandTask(
            cb => copyDir(cb, path.join(basePngSprites, raw.name), path.join(baseSpriteSheets, raw.name)),
            `copy to sprite directory`,
            raw.name
        )
    ))
    return parallel(...tasks)
}

const clean = parallel(cleanPng, cleanSpriteSheets);
exports.clean = clean
exports.default = series(clean, parallel(makeTilesTasks(), makeSpritesTaks(), makeRawTasks()))