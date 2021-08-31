# Kaheet

[![GitHub stars](https://img.shields.io/github/stars/EShrestha/kaheet?style=for-the-badge&logo=appveyor)](https://github.com/EShrestha/kaheet/stargazers)

[![GitHub issues](https://img.shields.io/github/issues/EShrestha/kaheet?style=for-the-badge)](https://github.com/EShrestha/kaheet/issues)

[![made with love](https://img.shields.io/badge/made%20with-%F0%9F%92%99-blue?style=for-the-badge)](https://github.com/EShrestha/kaheet)

## Overview

Kaheet is a free kahoot cheat originally by [pxtrez](https://github.com/pxtrez)
Modified by [EShrestha](https://github.com/EShrestha) and [Ratel](https://github.com/Ratel8989)

- [How to use](#How-to-use?)
    * [Cheat](#Cheat)
- [Any bugs or problems?](#Any-bugs-or-problems?)

## How to use?

To use the cheat, simply copy [script](#Cheat) then paste it into the browsers console once you are in the game.

### Cheat

1. Join Kahoot Game
2. Open browser console (F12) and paste the script from below:

```ts
fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/Run.js")
.then((a) => a.text()
.then((b) => eval(b)
.then((c) => eval(c))))
```
3. A GUI bubble will appear at the bottom right of your screen.
![image](./docs/bubble.png)

4. It will only be visible for the first click as Incognito mode is on by default, once closed you can open again by either clicking the invisible space at the bottom right of your screen or by pressing Ctrl + Shift, which will also close the GUI when it is open.

5. Then enter the quiz ID.


* Wrong answers should be darker than the correct ones.
*  In Incognito mode the correct answers box corner will be slightly rounder then the rest and when you hover over it your cursor symbol should be loading.
* In Incognito mode when you hover over wrong answers your cursor symbol will be a not-allowed symbol.



![image](./docs/example.png)


## Unit Test

```ts
fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/Test/testRunner.js")
.then((a) => a.text()
.then((b) => eval(b)
.then((c) => eval(c))))
```
- Kheet should be working fine if all tests pass.
    * Ignore the red errors chrome throws, as long as all of the tests are green you're good. 

## Bugs

Known unpatched bugs.

1. When the teacher chooses: random answers, the kaheet is in trouble. Highlights wrong answers and themes do not work properly. Then you should read the correct answer in the upper left corner, in the Correct tab or check console.
2. Cheat doesn't work for private quizzes

## Any bugs or problems?

create an issue
