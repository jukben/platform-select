# Pick

This little function will allow you to define precedence which function evaluate based on the platform.

You can use `_` as fallback to _any_ platform.

```js
const open = app => opn("https://google.com", { app });

try {
  pick(
    {
      darwin: open("google chrome"),
      win32: open("chrome"),
      _: open("google-chrome")
    },
    {
      darwin: open("google-chrome-canary")
    }
  );
} catch (e) {
  // when user on Darwin doesn't have Google Chrome or Google Chrome Canary
  console.log("Unable to run");
}
```
