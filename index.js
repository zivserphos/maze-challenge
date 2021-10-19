const fs = require("fs");
const path = require("path");
const generateMaze = require("./maze_generator/mazeGenerator");
generateMaze("maze-1", 5, 5, 22);

function findTreasureSync(roomPath) {
  // TODO: change to fs.accessSync
  try {
    fs.accessSync(path.resolve(__dirname, roomPath) , fs.R_OK)
      const dirContent = fs.readdirSync(path.relative(__dirname, roomPath)); // read dir
        fs.appendFileSync("map.txt", (`.${roomPath.split("maze-1")[1]}\n`));
        dirContent.forEach((dirName) => {
        const stats = fs.statSync(path.resolve(roomPath ,dirName))
        if (!stats.isDirectory()) {
          openChestSync(path.resolve(roomPath , dirName)) // check chests
        }
      })
    }
  catch {
  }}

function openChestSync(chestPath) {
  try {
    const fileContent = JSON.parse(
      fs.readFileSync(path.relative(__dirname, chestPath))
    ); // valid json
    if (fileContent.clue) {
      findTreasureSync(fileContent.clue);
    }
    //console.log(fileContent)
    if (fileContent.treasure) {
      fs.appendFileSync("map.txt", "money");
    }
  } catch {
    //console.log(chestPath)
  }
}
findTreasureSync("maze-1");
