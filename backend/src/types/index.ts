import { Request } from "express";
import { Role } from "@prisma/client";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive?: boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}
