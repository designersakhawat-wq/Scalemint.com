import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/prisma";

describe("Contact Submission API", () => {
  afterAll(async () => {
    // Clean up test contact submissions
    await prisma.contactSubmission.deleteMany({
      where: { email: "test.submitter@example.com" },
    });
    await prisma.$disconnect();
  });

  it("POST /api/v1/contact - should reject invalid payload (empty fields)", async () => {
    const res = await request(app).post("/api/v1/contact").send({
      firstName: "",
      lastName: "",
      email: "invalid-email",
      message: "hi",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it("POST /api/v1/contact - should successfully store valid contact submission", async () => {
    const payload = {
      firstName: "Unit",
      lastName: "Tester",
      email: "test.submitter@example.com",
      message: "We need a complete digital marketing strategy for our company.",
    };

    const res = await request(app).post("/api/v1/contact").send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.email).toBe(payload.email.toLowerCase());
    expect(res.body.data.status).toBe("UNREAD");
  });
});
