import { AxiosResponse } from "axios";
import { IQuerySorts, IUser, IUserUnrequired } from "../models/IUser";
import { instance } from "./api";

export type UserType = {
    _id?: string

    name: string
    description: string
    picture: string
}

export const usersAPI = {
    getUsers(): Promise<AxiosResponse<IUser[]>> {
        return instance.get('users')
            .then(res => res)
    },
    getSortedUsers(sorts: IQuerySorts): Promise<AxiosResponse<IUser[]>> {
        return instance.post(`users/sorted`, sorts)
            .then(res => res)
    },
    getCurrentUser(id: String): Promise<AxiosResponse<IUser>> {
        return instance.get(`users/${id}`)
            .then(res => res)
    },
    updateUser(user: IUserUnrequired): Promise<AxiosResponse<IUser>> {
        return instance.put('users', user)
            .then(res => res)
    },
    deleteUser(id: string) {
        return instance.delete(`users/${id}`)
            .then(res => res)
    },
    createPair(userId: string, createUserPairId: string) {
        return instance.post(`users/pairs`, {userId, createUserPairId})
            .then(res => res)
    },
    deletePair(userId: string, createUserPairId: string) {
        return instance.put(`users/pairs`, {userId, createUserPairId})
            .then(res => res)
    },
    savePicture(picture: any, userId: string, setting: 'avatar' | 'gallery'): Promise<AxiosResponse<IUser>> {
        return instance.post(`users/savePicture`, {picture, userId, setting}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res)
    },
    deletePicture(pictureName: string, userId: string, setting: 'avatar' | 'gallery'): Promise<AxiosResponse<IUser>> {
        return instance.put(`users/deletePicture`, {pictureName, userId, setting})
            .then(res => res)
    }
}