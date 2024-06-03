import animals_data from "../../data/animals.json";
import { Request, Response } from "express";
import { errRes } from "../../utils/err-res";

export default function get_animals(req: Request, res: Response) {
  try {
    res.json(animals_data);
  } catch (error) {
    res.json(errRes(error));
  }
}
