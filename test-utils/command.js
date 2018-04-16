class Command {
  constructor() {
    this.__shouldFail = [];
  }

  run(a) {
    return () => {
      if (this.__shouldFail.includes(a)) throw a;

      return a;
    };
  }
}

module.exports = new Command();
