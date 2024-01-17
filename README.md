# media-room (wip-v0.4)

<img src="./assets/images/mascot.svg" alt="popcorn mascot" height="200">

A minimal and responsive media chat room using [Ably.io](https://ably.com/)

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

    Create a file named `settings` within a `./config/` folder and input your API key using the format `API_KEY=_____`

    ~~~~
    mkdir config
    echo API_KEY=_____ > config/settings
    ~~~~

## Usage

Ensure that the `index.html` page is served to launch.

When launched, it displays a modal to connect to the room:

<img src="./web/assets/images/screenshots/ss1.jpg" alt="screenshot">

## Feature Roadmap

1) **Real-time chat system**

	- Chat conversation is transmitted via Ably API to the other client browsers. The data is recorded only in the HTML DOM of client pages.

2) **Video Playback Controls:**

   - Add commands for initiating and pausing video playback.
   Ensure synchronization of video playback across multiple users.
   Use Ably to update all connected users in real-time.

3) **Audio Media Support:**

   - Implement support for audio media files.
   Consider potential integration with external sources such as YouTube (pending).

## MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/realjck/media-room/blob/main/LICENSE)
