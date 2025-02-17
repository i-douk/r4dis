import { Request , Response } from "express";

export interface JWTRequest extends Request {
  decodedToken: {
    role: string;
    id: number;
  };
}


export interface ReqBodyAuth extends Response {
  email: string,
  password: string,
}

