const fs = require("fs")
const path = require('path');


function findTreasureSync(roomPath) {
    const fileContent = fs.readdirSync(path.relative(__dirname , roomPath))
    console.log(fileContent)
    fileContent.forEach((path) => {
        openChestSync(roomPath + "/" + path)
    }) 
     
}

function openChestSync(chestPath) {
    try {
    const fileContent = JSON.parse(fs.readFileSync(path.relative(__dirname , chestPath)))
    if (fileContent.clue) {
        findTreasureSync(fileContent.clue)
    }
    if (fileContent.treasure) {
        return fileContent.treasure;
    }
}
    catch {
    findTreasureSync(chestPath)
    }
}

findTreasureSync("mazeX")