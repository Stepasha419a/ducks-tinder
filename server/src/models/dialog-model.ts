import mongoose from "mongoose";

export interface MessageInterface{
    id: string
    content: string
    userId: string
}

export interface IDialog{
    _id: string
    messages: MessageInterface[]
    members: String[]
}

export interface ISorts {
    distance: number,
    onlyNear: boolean,
    age: {min: number, max: number},
    preferAge: {min: number, max: number},
    sex: 'male' | 'female',
    preferSex: 'male' | 'female'
}

const DialogSchema = new mongoose.Schema({
    messages: {type: [] as MessageInterface[]},
    members: {type: [] as string[]}
})

export default mongoose.model('Dialog', DialogSchema)