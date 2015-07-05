# Xiaomi Yi Desktop

This is a desktop app for the Xiaomi Yi action cam.

Mainly uses [Electron](https://github.com/atom/electron) and [React](https://github.com/facebook/react).

## Features

- [ ] Display current camera settings
- [ ] Modify camera settings
- [ ] List stored photos
- [ ] List stored videos
- [ ] View stored photos
- [ ] Play stored videos
- [ ] Download stored photos
- [ ] Download stored videos

Due to some technical limitations of Node.js/Electron, the following features will NOT be implemented for now :

- Live preview (uses RTSP protocol which is [not supported](https://code.google.com/p/chromium/issues/detail?id=25573) by Chromium)
- Automatic connection to the camera WIFI network

## Requirements

- Node.js/NPM
- Grunt
- Compass
- Electron

## Quickstart

    npm install
    grunt
    NODE_ENV=development electron .
