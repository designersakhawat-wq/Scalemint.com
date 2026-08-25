import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/prisma";

describe("Public Content APIs", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("GET /api/v1/services - should return list of services", async () => {
    const res = await request(app).get("/api/v1/services");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/v1/portfolio - should return list of portfolio projects", async () => {
    const res = await request(app).get("/api/v1/portfolio");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/v1/packages - should return list of pricing packages", async () => {
    const res = await request(app).get("/api/v1/packages");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/v1/team - should return list of team members", async () => {
    const res = await request(app).get("/api/v1/team");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/v1/blogs - should return paginated blog posts", async () => {
    const res = await request(app).get("/api/v1/blogs");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toHaveProperty("total");
  });
});
