export class TimeManager {
  #startTime;
  #task;

  constructor(task = null) {
    this.reset();
    this.#task = task;
  }

  getCurrentTime() {
    return Date.now() - this.#startTime;
  }

  reset() {
    this.#startTime = Date.now();
  }

  getCurrentTimeMessage() {
    return `${this.#task} took ${this.getCurrentTime()}ms`;
  }

  setTask(task) {
    this.#task = task;
  }
}
