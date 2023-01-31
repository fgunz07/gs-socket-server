import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { io, Socket } from "socket.io-client";

describe("root namespace", () => {
  let c: Socket;

  beforeAll((done) => {
    c = io(`http://localhost:${process.env.NODE_PORT}/`, {
      auth: {
        token: "123",
      },
    });
    c.on("connect", () => {
      done();
    });
  });

  afterAll(() => {
    c.close();
  });

  describe("/", () => {
    it("should trigger event", (done) => {
      const p = { mg: "root_nsp" };
      c.on("root", (msg) => {
        expect(msg).toEqual(p);
        done();
      });
      c.emit("trigger", { event: "root", data: p });
    });
  });
});

// describe("custom namespace", () => {
//   let c: Socket;

//   beforeAll((done) => {
//     c = io(`http://localhost:${process.env.NODE_PORT}/nsp`);
//     c.on("connect", () => {
//       done();
//     });
//   });

//   afterAll(() => {
//     c.close();
//   });

//   describe("/nsp", () => {
//     it("should trigger event", (done) => {
//       const p = { mg: "custom_nsp" };
//       c.on("custom", (msg) => {
//         expect(msg).toEqual(p);
//         done();
//       });
//       c.emit("trigger", { event: "custom", data: p });
//     });
//   });
// });
