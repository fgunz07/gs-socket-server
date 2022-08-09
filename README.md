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
* [![Node][Node.js]][Node-url]
* [![Express][Express]][Express-url]
* [![SocketIO][Socket.io]][SocketIO-url]
<!-- * [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url] -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- GETTING STARTED -->
## Getting Started

#### Available commands
```cmd
    //  installing libs
    yarn install
    // starting application
    yarn start
    // test preformance
    yarn test:preformance
    // start inside pm2
    yarn pm2:start
    // open pm2 plus dashboard
    yarn pm2:plus
    // opem pm2 monitoring
    yarn pm2:monit
    // open pm2 status
    yarn pm2:status
    // pm2 restart running process
    yarn pm2:restart
    // pm2 stop running process
    yarn pm2:stop
    // pm2 delete running process or record
    yarn pm2:delete
    // open pm2 logs
    yarn pm2:logs
    // run application on development mode
    yarn dev
    // build application from ts files
    yarn build,
```
#### Socket available events
```javascript

    // Example codes to trigger events
     
    /**
     * root namespace events
     * https://<domain>/
     */

    // trigger server-side events
    socket.emit("join:room", { room: "room_name", payload: string|object });
    socket.emit("leave:room", { room: "room_name", payload: string|object });
    socket.emit("message:room", { room: "room_name", payload: string|object });
    socket.emit("update:location", { room: "room_name", payload: string|object });
    socket.emit("disconnect", { room: "room_name", payload: string|object });
    // register events in client-side
    socket.on("join:room", callback(payload) => {});
    socket.on("leave:room", callback(payload) => {});
    socket.on("message:room", callback(payload) => {});
    socket.on("update:location", callback(payload) => {});
    socket.on("disconnect", callback(payload) => {});


    /**
     * orders namespace evetns
     * https://<domain>/orders
     */

    // trigger server-side events
    socket.emit("broadcast", { room: "room_name", payload: string|object });
    socket.emit("disconnect", { room: "room_name", payload: string|object });
    socket.emit("join:room", { room: "room_name", payload: string|object });
    socket.emit("leave:room", { room: "room_name", payload: string|object });
    socket.emit("order:add:cart", { room: "room_name", payload: string|object });
    socket.emit("order:created", { room: "room_name", payload: string|object });
    socket.emit("order:completed", { room: "room_name", payload: string|object });
    socket.emit("order:pickedup", { room: "room_name", payload: string|object });
    socket.emit("order:ontheway", { room: "room_name", payload: string|object });
    // register events in client-side
    socket.on("broadcast", callback(payload) => {});
    socket.on("disconnect", callback(payload) => {});
    socket.on("join:room", callback(payload) => {});
    socket.on("leave:room", callback(payload) => {});
    socket.on("order:add:cart", callback(payload) => {});
    socket.on("order:created", callback(payload) => {});
    socket.on("order:completed", callback(payload) => {});
    socket.on("order:pickedup", callback(payload) => {});
    socket.on("order:ontheway", callback(payload) => {});

    /**
     * chat namespace events
     * https://<domain>/chat
     */
    // trigger server-side events
    socket.emit("chat:enter", { room: "room_name", payload: string|object });
    socket.emit("chat:active", { room: "room_name", payload: string|object });
    socket.emit("chat:typing", { room: "room_name", payload: string|object });
    socket.emit("chat:message", { room: "room_name", payload: string|object });
    // register events in client-side
    socket.on("chat:enter", callback(payload) => {});
    socket.on("chat:active", callback(payload) => {});
    socket.on("chat:typing", callback(payload) => {});
    socket.on("chat:message", callback(payload) => {});

    // trigger server-side events
    socket.emit("chat:group:enter", { room: "room_name", payload: string|object });
    socket.emit("chat:group:active", { room: "room_name", payload: string|object });
    socket.emit("chat:group:typing", { room: "room_name", payload: string|object });
    socket.emit("chat:group:message", { room: "room_name", payload: string|object });
    // register events in client-side
    socket.on("chat:group:enter", callback(payload) => {});
    socket.on("chat:group:active", callback(payload) => {});
    socket.on("chat:group:typing", callback(payload) => {});
    socket.on("chat:group:message", callback(payload) => {});

    // trigger server-side events
    socket.emit("join:room", { room: "room_name", payload: string|object });
    socket.emit("leave:room", { room: "room_name", payload: string|object });
    socket.emit("broadcast", { room: "room_name", payload: string|object });
    socket.emit("disconnect", { room: "room_name", payload: string|object });
    // register events in client-side
    socket.on("join:room", callback(payload) => {});
    socket.on("leave:room", callback(payload) => {});
    socket.on("broadcast", callback(payload) => {});
    socket.on("disconnect", callback(payload) => {});

    /**
     * Registering custom events
     * Note: This event will be register as a global event in which namespace you are connected 
     *       which means not isolated to specifc room
     * 
     */

    // register client-side event
    socket.emit("channel:action", {}); // payload object or string
    socket.on("channel:action", callback() => {})

```

[Express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com
[Node.js]: https://img.shields.io/badge/node.js-215732?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en/
[Socket.io]: https://img.shields.io/badge/socket.io-000000?style=for-the-badge&logo=socketdotio&logoColor=white
[SocketIO-url]: https://socket.io/