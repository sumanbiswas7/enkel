import { Request, Response } from "express";

export default function get_status(req: Request, res: Response) {
  try {
    res.json({ running: "OK", author: "Suman Biswas" });
  } catch (error) {
    console.error(error);
  }
}
