const fs = require("fs");
const { dirname } = require("path");
const path = require('path');

function findTreasureSync(roomPath) {
    fs.access(path.relative(__dirname , roomPath), fs.R_OK , (err) => { // checks if it is a valdi path
        if (!err) { // valid
            if (!roomPath.includes(".json")) { 
                const fileContent = fs.readdirSync(path.relative(__dirname , roomPath)) // read dir
                fileContent.forEach((path) => { // go through all the files in the directory
                    openChestSync(roomPath + "/" + path) // check chests
            })}
            else {
                    openChestSync(roomPath) // read json
                }
        }
        else {
            console.log("error")
        }
    })
     
}

function openChestSync(chestPath) {
    try {
        const fileContent = JSON.parse(fs.readFileSync(path.relative(__dirname , chestPath))) // valid json
        if (fileContent.clue) {
            findTreasureSync(fileContent.clue)
        }
        if (fileContent.treasure) {
            console.log("MONEY");
        }
    }
    catch {
        if(!chestPath.includes(".json")){
            findTreasureSync(chestPath)
        }
    }
}

findTreasureSync("mazeX")