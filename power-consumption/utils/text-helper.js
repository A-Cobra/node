const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
};

export function writeTextWithColors(text, foreground = colors.reset) {
  if (foreground !== colors.reset) {
    if (colors.fg.hasOwnProperty(foreground.toLowerCase())) {
      foreground = colors.fg[foreground];
    } else {
      foreground = colors.reset;
    }
  }
  console.log(foreground + text + colors.reset);
}

export function writeBlack(text) {
  writeTextWithColors(text, "black");
}

export function writeRed(text) {
  writeTextWithColors(text, "red");
}

export function writeGreen(text) {
  writeTextWithColors(text, "green");
}

export function writeYellow(text) {
  writeTextWithColors(text, "yellow");
}

export function writeBlue(text) {
  writeTextWithColors(text, "blue");
}

export function writeMagenta(text) {
  writeTextWithColors(text, "magenta");
}

export function writeCyan(text) {
  writeTextWithColors(text, "cyan");
}

export function writeWhite(text) {
  writeTextWithColors(text, "white");
}
