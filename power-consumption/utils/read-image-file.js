import fs from "fs";

export async function readImageFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}
