<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="img/websocket-logo-91B815D333-seeklogo.com.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">GetServed Socket Server</h3>

  <p align="center">
    Getserved Socket server base on <a href="https://socket.io/" target="_blank">socket.io</a> ready to receive events.
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</div>

<!-- ABOUT THE PROJECT -->
<!-- ## About The Project -->

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

### Built With

- [![Node][node.js]][node-url]
- [![Express][express]][express-url]
- [![SocketIO][socket.io]][socketio-url]

<!-- GETTING STARTED -->

## Getting Started

Needs redis server, required env `NODE_ENV, NODE_PORT, REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASS`

#### Available commands

```cmd
  npm run build
  npm run dev
  npm run test
  npm start
```

### Laravel channels

Needs channel prefix `laravel.event.[(a-zA-Z|0-9)]` so that it won't clash with other channels.

```php
/**
 * Get the data to broadcast.
 *
 * @return array
 */
public function broadcastWith()
{
    return [
      'room' => 'test-event', // optional
      'event' => 'event-name',
      'payload' => [], // string or object
    ];
}

/**
 * Get the channels the event should broadcast on.
 *
 * @return \Illuminate\Broadcasting\PrivateChannel
 */
public function broadcastOn()
{
    return new PrivateChannel('laravel.event.'.$this->order->id);
}
```

#### Socket available events

```javascript

    // Example codes to trigger events

    /**
     * Namespace is
     * Note: Namespace is dynamic can be named anything and it's required
     * https://<domain>/root
     */

    // trigger server-side events
    socket.emit("join:room", { room: "room_name", payload: string|object });
    socket.emit("leave:room", { room: "room_name", payload: string|object });
    // custom Events
    socket.emit("trigger", { room: "room_name", event: "event_name", payload: string|object});

    // register events on client-side
    socket.on("join:room", callback(payload) => {});
    socket.on("leave:room", callback(payload) => {});
    socket.on("event_name", callback(payload) => {});
```

[express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com
[node.js]: https://img.shields.io/badge/node.js-215732?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[socket.io]: https://img.shields.io/badge/socket.io-000000?style=for-the-badge&logo=socketdotio&logoColor=white
[socketio-url]: https://socket.io/
