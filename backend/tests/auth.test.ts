import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/prisma";

describe("Auth & Protection API", () => {
  const testEmail = `authtest_${Date.now()}@scaleminte.com`;
  let authToken = "";

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: testEmail },
    });
    await prisma.$disconnect();
  });

  it("POST /api/v1/auth/register - should create a new user account", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Auth Test User",
      email: testEmail,
      password: "StrongPassword123!",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data.user.email).toBe(testEmail.toLowerCase());
    authToken = res.body.data.accessToken;
  });

  it("POST /api/v1/auth/login - should authenticate user and return token", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: testEmail,
      password: "StrongPassword123!",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("accessToken");
  });

  it("GET /api/v1/auth/me - should return authenticated user profile", async () => {
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(testEmail.toLowerCase());
  });

  it("GET /api/v1/admin/dashboard - should deny access for regular USER role", async () => {
    const res = await request(app)
      .get("/api/v1/admin/dashboard")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });
});
