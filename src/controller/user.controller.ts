import { Request, Response } from "express";
import { create as createUser } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const create = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch(error: any) {
        return res.status(400).send(error);
    }
}

export const show = async (req: Request, res: Response) => {

}

export const update = async (req: Request, res: Response) => {

}

export const del = async (req: Request, res: Response) => {

};
