const { error } = require("console");
const fs = require("fs");
const path = require("path");
const generateMaze = require("./maze_generator/mazeGenerator");

async function promiseTreasure(roomPath) {
   return new promise((resolve ,reject) => {
     fs.access(path.resolve(__dirname , roomPath))
     .then(fs.readdir)
     .catch((err) => console.log(error))
    
  })
}
async function promiseTreasure(roomPath) {

}
async function drawMapSync(currentRoomPath) {

}

