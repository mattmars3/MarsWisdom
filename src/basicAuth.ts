import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const SUPER_SECRET_TOKEN = process.env["SUPER_SECRET_TOKEN"];

export function requestHasExtremelySecretSuperSecureTokenMiddleware(req: Request, res: Response, next: () => void) {
  console.log("Checking authorization");

  const authToken = req.headers["authorization"];

  if (!authToken) {
    console.log("Failed auth");
    return res.status(401).json({message: "Authorization header is missing."});
  }

  if (authToken != SUPER_SECRET_TOKEN) {
    console.log("Failed auth");
    return res.status(401).json({message: "Incorrect token"}); 
  }

  console.log("Auth passed")

  next();
}
