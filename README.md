#### Installation
Pre-requisite
* nodejs
* pm2

##### Running server
```cmd
// open terminal run
// cd to root folder of the socket server
// run
yarn install
npm i -g pm2

// run the server
pm2 start index --name=socket-server --watch

// view pm2 running service status
pm2 status

// view pm2 socket service monitoring
pm2 monit
```

##### Nginx config
```
upstream websocket {
    server 127.0.0.1:3000;
}

server {
    listen 80 default;

    server_name map-socket.gogetserved.com;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;

        proxy_pass http://websocket;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

#### Example: Receiver
```javascript
    // Note: First you must have socket.io installed in your project
    const socket = io('http://localhost:3000');

    socket.on('connect', function() {
        socket.emit('subscribe', { room_id: <room_id> });

        socket.on('new_location', function newLocation(payload) {
            // Do something
        });
    });
```

#### Example: Sender
```javascript
    const socket = io('http://localhost:3000');

    socket.on('connect', function() {
        socket.emit('subscribe', { room_id: socket.id });
        setInterval(function() {
            const object = {
                payload: {
                    ip: "180.190.175.38",
                    type: "ipv4",
                    continent_code: "AS",
                    continent_name: "Asia",
                    country_code: "PH",
                    country_name: "Philippines",
                    region_code: null,
                    region_name: "Eastern Samar",
                    city: "Salcedo",
                    zip: 6807,
                    latitude: 11.148059844970703,
                    longitude: 125.6602783203125
                },
                room_id: <room_id>
            };
            socket.emit('update_location', object);
        }, 4000);

        socket.on('new_location', function newLocation(payload) {
            // Do something
        });
    });
```