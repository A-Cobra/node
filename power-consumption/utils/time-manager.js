export class TimeManager {
  #startTime;
  #task;

  constructor(task = null) {
    reset();
    this.#task = task;
  }

  getCurrentTime() {
    return Date.now() - this.#startTime;
  }

  reset() {
    this.#startTime = Date.now();
  }

  getCurrentTimeMessage() {
    return `${this.#task} took ${this.getCurrentTime}ms`;
  }
}
