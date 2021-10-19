const fs = require("fs");
const path = require("path");
const generateMaze = require("./maze_generator/mazeGenerator");
generateMaze("maze-1", 5, 5, 22);


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
            fs.appendFile("map.txt", (`.${roomPath.split("maze-1")[1]}\n`) , (err) => {
              if(!err) {
                  files.forEach((dirName) => {
                  const stats = fs.stat(path.resolve(roomPath ,dirName), (err ,stats) => {
                    if(err) {
                      console.log("NO STATS")
                    }
                    else {
                      if (!stats.isDirectory()) {
                        callback(undefined , path.resolve(roomPath , dirName)) // check chests
                    }
                      
                    }
                  })
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

function openChestASync(chestPath , callback) {
  try {
      fs.readFile(path.relative(__dirname, chestPath) , 'utf-8',(err ,data) => {
        if(err) {
          console.log("Cannot Read File")
        }
        else {
          try {
            const fileContent = JSON.parse(data)
            if (fileContent.clue) {
              callback(undefined , fileContent.clue)
            }
            if (fileContent.treasure) {
              fs.appendFile("map.txt", "money" , (err) => {
                if (!err) {
                  return;
                }
                
              });
            }
            
          }
          catch{
            console.log("NOT A VALID JSON")
          }
      
        }
      }

    ); // valid json
  } catch {
    console.log("not valid file")
  }
}

const cb1 = (err ,data) => {
  if (!err) {
    openChestASync(data , cb2)
  }
}

const cb2 = (err,data) => {
  if (!err) {
    findTreasureASync(data , cb1)
  }
}

findTreasureASync("maze-1" , cb1)

