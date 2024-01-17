# media-room (wip)

<img src="web/app/images/mascot.svg" alt="popcorn mascot" height="200">

A minimal and responsive media chat room using Ably.io

![javascript vanilla](https://img.shields.io/badge/javascript-grey?logo=javascript)
[![jquery](https://img.shields.io/badge/jquery-0865a7?logo=jquery)](https://jquery.com/)
[![mini.css](https://img.shields.io/badge/mini.css-f22f21)](https://minicss.us/)

## Installation

1) ### Clone the repository

    ~~~~
    git clone https://github.com/realjck/media-room.git
    ~~~~

2) ### Get your Api Key

    Visit [Ably.io](https://ably.io) to sign up, create a project, retrieve your API key.

3) ### Setting Up Configuration for API Key

    Create a file named `settings` within a `./config/` web root folder and input your API key using the format `API_KEY=_____`. You can do it with these command lines :

    ~~~~
    cd web
    mkdir config
    echo API_KEY=_____ > config/settings
    ~~~~

## Usage

To run the application, serve the `web/` directory and launch the `index.html` file. You can use a server or a localhost server for this purpose.

## Feature Roadmap

- Real-time chat with Ably API
     
- Extra Media Support: Shaka Player implementation

- Video control: Add commands for initiating and pausing video

## MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/realjck/media-room/blob/main/LICENSE)
