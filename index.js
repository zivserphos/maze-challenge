const { error } = require("console");
const fs = require("fs");
const { readFile } = require("fs/promises");
const path = require("path");
const generateMaze = require("./maze_generator/mazeGenerator");
generateMaze("maze-1" , 5, 5, 22)

async function promiseTreasure(roomPath) {
  fs.promises.access(path.resolve(__dirname , roomPath))
  .then(() => fs.promises.readdir(path.resolve(__dirname , roomPath))
  .then((files) => {
    fs.promises.appendFile("map.txt", `.${roomPath.split("maze-1")[1]}\n`)
    for(let file of files) {
      fs.promises.stat(path.resolve(roomPath, file))
      .then((stats) => {
        if (stats.isFile()) {
          promiseChest(path.resolve(roomPath , file))
          .then(() => console.log("roompath"))
        }
      }).catch(console.error("NO STATS"))

    }
  }).catch("No directory")
  ).catch(console.error("File not exist"))
}


async function promiseChest(roomPath) {
  fs.promises.readFile(path.resolve(__dirname , roomPath))
  .then((data) => {
    try{
      const {treasure , clue} = JSON.parse(data)
      if(clue) {
        console.log(clue)
        const roomPath = clue;
        promiseTreasure(roomPath)
      }
      if (treasure) {
        console.log(treasure)
      }
    }
    catch {
      console.log("not a valid json")
    }
  })
  .catch("CANT READ FILE")
}


promiseTreasure("maze-1")
.then((treasure) => console.log(`Found treasure: ${treasure}`))


