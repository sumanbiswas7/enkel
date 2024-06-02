import animals_data from "../../../data/animals.json";
import { Request, Response } from "express";

export default function get_animals_by_id(req: Request, res: Response) {
  try {
    const animalById = animals_data.filter(
      (a) => a.id === parseInt(req.params.id)
    );
    res.json(animalById);
  } catch (error) {
    console.error(error);
  }
}
