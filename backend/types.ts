import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export interface JWTRequest extends Request {
  decodedToken: {
    role: string;
    id: number;
  };
}

export interface ReqBodyAuth extends Response {
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  user: { user: User; };
}