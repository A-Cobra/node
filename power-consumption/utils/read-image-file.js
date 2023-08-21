import fs from "fs";

export async function readImageFile(filePath) {
  console.log("READING");
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      err ? reject(err) : resolve(data);
    });
    // try {
    //   fs.readFile(filePath, (err, data) => {
    //     if (!err) {
    //       resolve(data);
    //     }
    //     err ? reject(err) : resolve(data);
    //   });
    // } catch (error) {
    //   reject(null);
    // }
  });
}
