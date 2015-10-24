# Creating new game

Follow these steps:

1. Create HTML bootstrap required in `example.html` and refer to that file in `package.json` field `html`.
2. Create required style in your less file (e.g. `myGameStyle.less`) and point to the `less` entry file in the `package.json` field `style`.
3. Implement your game in a JavaScript file (e.g. `src/index.js`) and point to the file using the `package.json` field `main`.
4. Rename `_package.json` to `package.json` and it will be detected and automatically built when using the `/load-apps` URL or on server restart.

## How to Implement

You are free to do what ever implementation you want. You have access to the entire NPM registry, and can use Myo.js if you want. Just require the dependencies as you normally would. Your entry points will be bundled as a separate file and executed below your game HTML.
