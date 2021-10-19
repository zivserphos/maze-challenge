const fs = require("fs");
const path = require("path");
const generateMaze = require("./maze_generator/mazeGenerator");
//generateMaze("mazeX", 5, 5, 22);

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
              //console.log(path.resolve(roomPath, file))
              openChestASync(
                path.resolve(roomPath, file),
                (err, truessure) => {
                  //console.log(truessure)
                  if (!err) {
                    callback(null, truessure);
                    returcn;
                  }
                }
              );
            }
          });
        }
        callback("Cant find");
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
        findTreasureASync(rommPath, (err, truessure) => {
          if (err) {
            callback(err);
            return;
          }
          callback(undefined, truessure);
          return;
        });
      }
      if (treasure) {
        // fs.appendFile("map.txt", "money", (err) => {
        console.log("tresure")
        callback(null, truessure);
        return;
      }
    } catch {
      callback("cant open");
      return;
    }
  });
} // valid json

const cb1 = (err, data) => {
  if (!err) {
    openChestASync(data, cb2);
  }
};

const cb2 = (err, data) => {
  if (!err) {
    findTreasureASync(data, cb1);
  }
};

findTreasureASync("mazeX", (err, treasure) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Found tressure: ", treasure);
});
