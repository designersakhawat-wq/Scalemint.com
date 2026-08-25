import { z } from "zod";
import { ContactStatus } from "@prisma/client";

export const createContactSubmissionSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
    email: z.string().email("Please provide a valid email address"),
    message: z.string().min(5, "Message must be at least 5 characters long").max(5000),
  }),
});

export const updateContactStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required"),
  }),
  body: z.object({
    status: z.nativeEnum(ContactStatus, {
      errorMap: () => ({ message: "Invalid status value" }),
    }),
    notes: z.string().optional(),
  }),
});
