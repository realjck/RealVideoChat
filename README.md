# media-room (wip)

<img src="web/app/images/mascot.svg" alt="popcorn mascot" height="200">

[![python](https://img.shields.io/badge/python-f7dc65?logo=python)](https://www.python.org/)
![javascript vanilla](https://img.shields.io/badge/javascript-grey?logo=javascript)
[![jquery](https://img.shields.io/badge/jquery-0865a7?logo=jquery)](https://jquery.com/)
[![mini.css](https://img.shields.io/badge/mini.css-f22f21)](https://minicss.us/)

A minimal and responsive media chat room

## About

This application is composed of two parts, server and web, intended to be used via Docker container on any Linux server supporting SSL.

It uses a secure websockets for the connection (`wss://`). The server part allows users to log into the desired room and join other people for real-time communication.

### [Demo at mediaroom.pxly.fr](https://mediaroom.pxly.fr)

## Installation

1) ### Clone the repository

    ~~~~
    git clone https://github.com/realjck/media-room.git
    ~~~~

## Usage

Please refer to the README of the corresponding web and server folders.

For the web part, you are free to mount the files via the Dockerfile or to place the files on any web server. Also if you want to run the server part without Docker you can simply run main.py with an alias of your keys, this will listen on port 8080.

## Feature Roadmap

- [X] Build-in Server setup with Docker

- [X] Websockets users connexion with callback

- [X] Real-time chat with Websockets
     
- [ ] Extra Media Support: Shaka Player implementation

- [ ] Video control: Add commands for initiating and pausing video

## MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/realjck/media-room/blob/main/LICENSE)
