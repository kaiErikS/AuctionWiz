const supertest = require("supertest");
const app = require("../../src/server/app");
const server = require("../../src/server/server");
const request = supertest(app);
const Repository = require("../../src/server/repository");

describe("Endpoints", () => {
  it("Should get all items", async (done) => {
    const response = await request.get("/api/items");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("Should be port 8080", (done) => {
    expect(server.port).toBe(8080);
    done();
  });

  it("Should update sold status", async (done) => {
    const response = await request.put("/api/sold/2");
    expect(response.statusCode).toBe(204);
    done();
  });

  it("Should fail while updating", async (done) => {
    const response = await request.put("/api/sold/jk");
    expect(response.statusCode).toBe(500);
    done();
  });

  it("Should delete item", async (done) => {
    const response = await request.delete("/api/delete/2");
    expect(response.statusCode).toBe(204);
    done();
  });

  it("Should create new item", async (done) => {
    const response = await request.post(
      "/api/new/tommy/watch/beautiful/9000/16000"
    );
    expect(response.statusCode).toBe(204);
    done();
  });

  it("Should place bid", async (done) => {
    const response = await request.put("/api/bid/3/Bob/5000/false");
    expect(response.statusCode).toBe(204);
    done();
  });

  it("Should log out successfully", async (done) => {
    const response = await request.post("/api/logout");
    expect(response.statusCode).toBe(204);
    done();
  });

  it("Should not get user", async (done) => {
    const response = await request.get("/api/user");
    expect(response.statusCode).toBe(401);
    done();
  });
  it("Should return true", async (done) => {
    const result = Repository.createUser("test", "test");
    expect(result).toBe(true);
    done();
  });
});
