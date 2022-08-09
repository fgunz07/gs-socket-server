import { omit, Omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../model/user.model";

export const create = async (input: DocumentDefinition<Omit<UserDocument, "createdAt"|"updatedAt"|"comparePassword">>) => {
    try {
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password");

    } catch(error: any) {
        return new Error(error);
        
    }
}