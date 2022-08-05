import { Omit } from "lodash";
import mongoose, { DocumentDefinition } from "mongoose";
import SocketModel, { SocketDocument } from "../model/socket.model";

export async function findSocket(socketId: string) {
    const socket = await SocketModel.findOne({ socket_id: socketId });

    if(!socket) {
        return false;
    }

    return socket.toJSON();
}

export async function createSocket(input: DocumentDefinition<Omit<SocketDocument, "createdAt"|"updatedAt">>) {
    try {
        const socket = await SocketModel.create(input);
        return socket.toJSON();
    } catch(error: any) {
        return new Error(error);
    }
}

export async function deleteSocket(socket_id: string) {
    try {
        const socket = await SocketModel.findOne({ socket_id });
        
        if(socket) {
            socket.remove();
            return socket.toJSON();
        }

    } catch(error: any) {
        return new Error(error);
    }
}
