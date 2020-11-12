const fs = require("fs")
const path = require("path")
const {promisify} = require("util")
const { createCanvas, loadImage } = require('canvas')
const _ = require("lodash")

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

const DEFAULTS = {
    tileSize: 32,
    baseWidthInNbOfTiles: 10,
    sourceExtension: "png"
}

function getFileName(path) {
    return _.first(_.last(path.split("/")).split("."))
}

const statusFileBasePath = "./scripts/customPacker"
function buildStatusPath(key) {
    return path.join(statusFileBasePath, key + ".json")
}

function writeStatus(status, key) {
    return writeFile(buildStatusPath(key), JSON.stringify(status, null, 2))
}

function keyify(path) {
    return path.replace(/\./g, '').replace(/\//g, '')
}

function readStatus(key) {
    const statusFilePath = buildStatusPath(key)
    return stat(statusFilePath)
        .then(s => {
            if (s.code && s.code === 'ENOENT') {
                return Promise.resolve([])
            } else {
                return readFile(statusFilePath).then(b => JSON.parse(b.toString()))
            }
        })
        .catch(s => {
            if (s.code && s.code === 'ENOENT') {
                return Promise.resolve([])
            } else {
                throw s
            }
        })
}

function syncStatus(paths, status) {
    paths.map(p => {
        if (!status.includes(p)) {
            status.push(p)
        }
    })
}

async function findImages(options) {
    const {
        sourceDirectory,
        sourceExtension,
    } = options
    const filenames = await readdir(sourceDirectory)
    const paths = filenames
        .map(f => path.join(sourceDirectory, f))
        .filter(p => p.endsWith(sourceExtension))
    return paths
}

function writeCanvas(canvas, target) {
    return new Promise(resolve => {
        const out = fs.createWriteStream(target)
        const stream = canvas.createPNGStream()
        stream.pipe(out)
        out.on('finish', resolve)
    })
}

async function packageSprites(spritePaths, order, options) {
    const metadata = {}
    const count = spritePaths.length
    const columns = options.baseWidthInNbOfTiles
    const size = options.tileSize
    const rows = Math.ceil(count / columns)
    const canvas = createCanvas(size * columns, size * rows)
    const ctx = canvas.getContext('2d')
    const proms = []
    let currentIndex = -1
    for (let x = 0 ; x < columns ; ++x) {
        for(let y = 0 ; y < rows ; ++y) {
            currentIndex++
            if (currentIndex >= count) {
                break
            }
            proms.push(
                loadImage(order[currentIndex])
                    .then(image => ctx.drawImage(image, x * size, y * size))
            )
            metadata[getFileName((order[currentIndex]))] = {
                frame: {x: x * size, y: y * size, w: size, h: size}
            }
        }
    }
    await Promise.all(proms)
    await writeCanvas(canvas, options.targetFile)
    if (options.targetDataFile) {
        await writeFile(options.targetDataFile, JSON.stringify({frames: metadata}, null, 2))
    }
}

async function packSprites(opts) {
    const options = _.defaults(opts || {}, DEFAULTS)
    const {
        sourceDirectory,
        sourceExtension,
    } = options
    const statusKey = keyify(sourceDirectory)
    const status = await readStatus(statusKey)
    const paths = await findImages(options)
    syncStatus(paths, status)
    await packageSprites(paths, status, options)
    await writeStatus(status, statusKey)
}

module.exports = packSprites