# Platform Select

This little library allows you to define precedence which function evaluate based on the platform.

[Currently possible values are](https://nodejs.org/api/process.html#process_process_platform):

* 'aix'
* 'darwin'
* 'freebsd'
* 'linux'
* 'openbsd'
* 'sunos'
* 'win32'

You can use `_` as fallback for _undefined_ platform.

The function returns whatever returns the provided function otherwise throw an error in format `No suitable job for "darwin"`

The function could also throw an error `Function for current platform ("darwin") is not defined!` when you omit specifics platform definition.

```js
const open = app => opn("https://google.com", { app });

try {
  pick(
    {
      darwin: open("google chrome"),
      win32: open("chrome"),
      // on other platforms than Windows or Mac try to open...
      _: open("google-chrome")
    },
    {
      // if attempt to run Google Chrome was unsuccessful, let's run Safari...
      darwin: open("safari")
    }
  );
} catch (e) {
  // when user is on Darwin and doesn't have Google Chrome or Safari (probably impossible :))
  console.log("Unable to run");
}
```
