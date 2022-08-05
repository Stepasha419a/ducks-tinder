import mongoose from "mongoose";

export interface partnerSettings{
    place: String
    distance: Number
    preferSex: 'male' | 'female'
    age: {
        from: Number
        to: Number
    }
}

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true, default: 'Unnamed user'},
    nickname: {type: String},
    picture: {type: String},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    age: {type: Number},
    sex: {type: String},
    partnerSettings: {type: {} as partnerSettings}
})

export default mongoose.model('User', UserSchema)