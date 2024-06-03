import { Request, Response } from "express";
import { errRes } from "../../utils/err-res";

export default function get_status(req: Request, res: Response) {
  try {
    res.status(200).json({ running: "OK", author: "Suman Biswas" });
  } catch (error) {
    res.json(errRes(error));
  }
}
