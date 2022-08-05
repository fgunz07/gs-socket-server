const { io } = require("socket.io-client");

describe("Socket.IO running test on default namespace", () => {
    let user1, user2;

    beforeAll((done) => {
        user1 = io("http://localhost:1337", {
            reconnectionAttempts: 2,
            query: {
                socket_key: "",
                socket_secret: ""
            }
        });

        user2 = io("http://localhost:1337", {
            reconnectionAttempts: 2,
            query: {
                socket_key: "",
                socket_secret: ""
            }
        });

        user1.on("connect", () => {});
        user2.on("connect", () => done());
    });
    
    afterAll(() => {
        user1.disconnect().close();
        user2.disconnect().close();
    });

    test("user1 should be connected.", (done) => {
        expect(user1.connected).toBeTruthy();
        done();
    });

    test("user2 should be connected.", (done) => {
        expect(user2.connected).toBeTruthy();
        done();
    });

    test("user1 should join:room of user2 in root namespace", (done) => {
        user2.on("join:room", (args) => {
            expect(args).toEqual("joine");
            done();
        });
        user1.emit("join:room", { event: "join:room", room: user2.id, payload: "joined" });
    });

    // test("user2 should join:room of user1 in root namespace", (done) => {
    //     user1.on("join:room", (args) => {
    //         expect(args).toEqual("joined");
    //         done();
    //     });
    //     user2.emit("join:room", { event: "join:room", room: user1.id, payload: "joined" });
    // });

    // test("should run leave:room namespace", (done) => {
    //     socket.on("leave:room", (args) => {
    //         expect(args).toEqual("left");
    //         done();
    //     });
    //     socket.emit("leave:room", { room: socket.id, payload: "left" });
    // });

    // test("should run message namespace", (done) => {
    //     socket.emit("message:room", { room: socket.id, payload: "messaged" });
    //     socket.on("message:room", (args) => {
    //         expect(args).toEqual("messaged");
    //         done();
    //     });
    // });
});