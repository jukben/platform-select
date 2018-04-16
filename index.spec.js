const testCommand = require("./test-utils/command");
const pick = require("./index");

describe("macOS", () => {
  beforeAll(() => {
    Object.defineProperty(process, "platform", { value: "darwin" });
  });

  beforeEach(() => {
    testCommand.__shouldFail = [];
  });

  it("should follow the path, pick 2nt", () => {
    testCommand.__shouldFail = ["google chrome"];

    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          win32: testCommand.run("chrome canary"),
          _: testCommand.run("google-chrome-canary")
        }
      )
    ).toBe("google chrome canary");
  });

  it("should follow the path, pick 2nt from default value", () => {
    testCommand.__shouldFail = ["google chrome"];

    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          win32: testCommand.run("chrome canary"),
          _: testCommand.run("google-chrome-canary")
        }
      )
    ).toBe("google-chrome-canary");
  });

  it("should follow the path, pick 1st", () => {
    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          _: testCommand.run("google-chrome-canary"),
          win32: testCommand.run("chrome canary")
        }
      )
    ).toBe("google chrome");
  });

  it("should follow the path, should throw error", () => {
    testCommand.__shouldFail = ["google chrome", "google chrome canary"];

    expect(() =>
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          _: testCommand.run("google-chrome-canary"),
          win32: testCommand.run("chrome canary")
        }
      )
    ).toThrowError(/No suitable job for "darwin"/);
  });
});

describe("win32", () => {
  beforeAll(() => {
    Object.defineProperty(process, "platform", { value: "win32" });
  });

  beforeEach(() => {
    testCommand.__shouldFail = [];
  });

  it("should follow the path, pick 2nt", () => {
    testCommand.__shouldFail = ["chrome"];

    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          win32: testCommand.run("chrome canary"),
          _: testCommand.run("google-chrome-canary")
        }
      )
    ).toBe("chrome canary");
  });

  it("should follow the path, pick 1st", () => {
    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          _: testCommand.run("google-chrome-canary"),
          win32: testCommand.run("chrome canary")
        }
      )
    ).toBe("chrome");
  });

  it("should follow the path, should throw error", () => {
    testCommand.__shouldFail = ["chrome", "chrome canary"];

    expect(() =>
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          _: testCommand.run("google-chrome-canary"),
          win32: testCommand.run("chrome canary")
        }
      )
    ).toThrowError(/No suitable job for "win32"/);
  });
});

describe("linux", () => {
  beforeAll(() => {
    Object.defineProperty(process, "platform", { value: "linux" });
  });

  beforeEach(() => {
    testCommand.__shouldFail = [];
  });

  it("should follow the path, pick 2nt", () => {
    testCommand.__shouldFail = ["google-linux"];

    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          linux: testCommand.run("google-linux"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          win32: testCommand.run("chrome canary"),
          linux: testCommand.run("google-linux-canary"),
          _: testCommand.run("google-chrome-canary")
        }
      )
    ).toBe("google-linux-canary");
  });

  it("should follow the path, pick 1st", () => {
    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          _: testCommand.run("google-chrome-canary"),
          win32: testCommand.run("chrome canary")
        }
      )
    ).toBe("google-chrome");
  });

  it("should follow the path, should throw error", () => {
    testCommand.__shouldFail = ["google-chrome"];

    expect(() =>
      pick(
        {
          darwin: testCommand.run("google chrome"),
          _: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          win32: testCommand.run("chrome canary")
        }
      )
    ).toThrowError(/No suitable job for "linux"/);
  });

  it("should follow the path, should throw error", () => {
    testCommand.__shouldFail = ["google-chrome"];

    expect(
      pick(
        {
          darwin: testCommand.run("google chrome"),
          linux: testCommand.run("google-chrome"),
          win32: testCommand.run("chrome")
        },
        {
          darwin: testCommand.run("google chrome canary"),
          _: testCommand.run("google-chrome-canary"),
          win32: testCommand.run("chrome canary")
        }
      )
    ).toBe("google-chrome-canary");
  });
});
