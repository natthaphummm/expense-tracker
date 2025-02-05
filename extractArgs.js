class ExtractArgs {
  constructor() {}

  add(input) {
    try {
      const args = input.match(/--description\s+"([^"]+)"\s+--amount\s+(\d+)/);
      const description = args[1];
      const amount = parseFloat(args[2]);
      return { description, amount };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  summary(input) {
    try {
      console.log(input.split(" ")[2]);
      return input.split(" ")[2];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  delete(input) {
    try {
      return parseInt(input.split(" ")[1]);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = ExtractArgs;
