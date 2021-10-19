const fs = require("fs");
const path = require("path");
const generateMaze = require("./maze_generator/mazeGenerator");
//generateMaze("maze-1", 5, 5, 22);


function findTreasureASync(roomPath , callback){
  try {
    fs.access(path.resolve(__dirname, roomPath) , fs.R_OK , (err) => {
      if (err)
        console.error('No Read access');
      else {
          fs.readdir(path.relative(__dirname, roomPath) , (err,files) => {
          if (err) {
            console.log(err)
          }
          else {
            fs.appendFile("map.txt", (`.${roomPath.split("mazeX")[1]}\n`) , (err) => {
              if(!err) {
                  files.forEach((dirName) => {
                  const stats = fs.statSync(path.resolve(roomPath ,dirName))
                  if (!stats.isDirectory()) {
                  openChestSync(path.resolve(roomPath , dirName)) // check chests
              }
            });
          }
        })

          }
        }); // read dir
    }
      
    })
  }
  catch {

  }
}


function findTreasureSync(roomPath) {
  // TODO: change to fs.accessSync
  try {
    fs.accessSync(path.resolve(__dirname, roomPath) , fs.R_OK)
      const dirContent = fs.readdirSync(path.relative(__dirname, roomPath)); // read dir
        fs.appendFileSync("map.txt", (`.${roomPath.split("mazeX")[1]}\n`));
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
      findTreasureASync(fileContent.clue);
    }
    //console.log(fileContent)
    if (fileContent.treasure) {
      fs.appendFileSync("map.txt", "money");
    }
  } catch {
    //console.log(chestPath)
  }
}

findTreasureASync("mazeX")
