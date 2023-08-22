import si from "systeminformation";

export async function getPowerDrawnByGPU() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const powerDrawn = await si
          .graphics()
          .then((data) => data.controllers[0].powerDraw);
        resolve(powerDrawn);
      } catch (error) {
        reject(error);
      }
    })();
  });
}
