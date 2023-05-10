import { Request } from "express";
import jwt from "jsonwebtoken";

export type RequestWithJwt = Request & jwt.JwtPayload
