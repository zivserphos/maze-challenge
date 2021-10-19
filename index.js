const fs = require("fs");
const path = require("path");
const generateMaze = require("./maze_generator/mazeGenerator");

function findTreasureASync(roomPath, callback) {
  fs.access(path.resolve(__dirname, roomPath), fs.R_OK, (err) => {
    if (err) {
      callback("No Read access");
      return;
    }

    fs.readdir(path.relative(__dirname, roomPath), (err, files) => {
      if (err) {
        callback(err);
        return;
      }

      fs.appendFile("map.txt", `.${roomPath.split("mazeX")[1]}\n`, (err) => {
        if (err) {
          callback("Cant write map");
          return;
        }

        for (let file of files) {
          fs.stat(path.resolve(roomPath, file), (err, stats) => {
            if (err) {
              console.error("NO STATS");
              return;
            }
            if (stats.isFile()) {
              openChestASync(
                path.resolve(roomPath, file),
                (err, truessure) => {
                  if (!err) {
                    callback(null, truessure);
                    return;
                  }
                }
              );
            }
          });
        }
        callback(`Cant find tresure in ${files}`);
      });
    });
  });
}

function openChestASync(chestPath, callback) {
  fs.readFile(path.relative(__dirname, chestPath), "utf-8", (err, data) => {
    if (err) {
      callback("cant open chest");
      return;
    }

    try {
      const { treasure, clue } = JSON.parse(data);
      if (clue) {
        const rommPath = clue;
        findTreasureASync(rommPath, (err, treasure) => {
          if (err) {
            callback(err);
            return;
          }
          callback(undefined, treasure);
          return;
        });
      }
      if (treasure) {
        fs.appendFile("map.txt", "money", (err) => {
          if(!err) {
            console.log("tresure")
            callback(null, treasure);
            return;
          }
        })
      }
    } catch {
      callback("cant open");
      return;
    }
  });
} // valid json

findTreasureASync("mazeX", (err, treasure) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Found tressure: ", treasure);
});
