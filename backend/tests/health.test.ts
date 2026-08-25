import request from "supertest";
import app from "../src/app";

describe("Health Check API", () => {
  it("GET /api/health - should return 200 and healthy status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("status", "healthy");
    expect(res.body).toHaveProperty("service", "Scaleminte API");
  });

  it("GET /api/v1/non-existent-route - should return 404 with error message", async () => {
    const res = await request(app).get("/api/v1/non-existent-route");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body.message).toContain("Cannot find GET");
  });
});
