const fs = require("fs");
const { dirname } = require("path");
const path = require('path');
let a=1;

function findTreasureSync(roomPath) {
    fs.access(path.relative(__dirname , roomPath), fs.R_OK , (err) => {
        if (!err) {
            if (!roomPath.includes(".json")) {
                const fileContent = fs.readdirSync(path.relative(__dirname , roomPath))
                fileContent.forEach((path) => {
                    openChestSync(roomPath + "/" + path)
            })}
            else {
                if (a<15){
                    openChestSync(roomPath)
                }
            }
        }
        else {
            console.log("error")
        }
    })
     
}

function openChestSync(chestPath) {
    try {
    const fileContent = JSON.parse(fs.readFileSync(path.relative(__dirname , chestPath)))
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