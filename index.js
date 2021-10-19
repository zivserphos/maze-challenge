const fs = require("fs");
const path = require("path");

function findTreasureSync(roomPath) {
  // TODO: change to fs.accessSync
  try {
    fs.accessSync(path.resolve(__dirname, roomPath) , fs.R_OK)
      const dirContent = fs.readdirSync(path.relative(__dirname, roomPath)); // read dir
        fs.appendFileSync("map.txt", (`.${roomPath.split("mazeX")[1]}\n`));
        dirContent.forEach((dirName) => {
        const stats = fs.statSync(path.resolve(roomPath ,dirName))
        if (!stats.isDirectory()) {
          console.log(openChestSync(path.resolve(roomPath , dirName))) // check chests
        }
      })
    }
  catch {
    //console.log(roomPath)
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
findTreasureSync("mazeX");


// function findTreasureSync(roomPath) {
//   // TODO: change to fs.accessSync
//   fs.accesss(path.relative(__dirname, roomPath), fs.R_OK, (err) => {
//     // checks if it is a valdi path
//     if (err) {
//       console.log("error");
//       return;
//     } 
//     // valid
//     const dirContent = fs.readdirSync(path.relative(__dirname, roomPath)); // read dir
//     dirContent.forEach((dirName) => {
//       // go through all the files in the directory
//       // Check if path is directory or file
//       // TODO: BUG: cant tell directory from file if both include .json
//       if (dirName.includes(".json")) {
//         openChestSync(roomPath); // read json
//       }
//     });
//   });
// }