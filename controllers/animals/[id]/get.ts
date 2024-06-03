import animals_data from "../../../data/animals.json";
import { Request, Response } from "express";
import { errRes } from "../../../utils/err-res";

export default function get_animals_by_id(req: Request, res: Response) {
  try {
    const animalById = animals_data.find(
      (a) => a.id === parseInt(req.params.id)
    );

    const response = {
      data: animalById,
      message: `Animal with id ${req.params.id} was found`,
    };

    res.json(response);
  } catch (error) {
    res.json(errRes(error));
  }
}
