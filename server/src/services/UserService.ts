import fileService from "./fileService";
import UserModel from "../models/user-model";
import UserDto from "../dtos/userDto";
import ApiError from "../exceptions/api-error";

class UserService{

    async getAll() {
        const users = await UserModel.find()

        return users
    }

    async getOne(id: string) {
        if(!id) {
            throw new Error('Id не указан')
        }

        const user = await UserModel.findById(id)
        if(!user) {throw ApiError.BadRequest('User не найден')}
        
        const userDto = new UserDto(user)
    
        return userDto
    }

    async update(user: any) {
        if(!user._id) {
            throw new Error('Id не указан')
        }
        if(user.pictures) {
            fileService.changePicturesDir(user._id, user.pictures.avatar)
        }

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true})

        return updatedUser
    }

    async savePicture(userId: string, pictureFile: any, setting: 'avatar' | 'gallery') {
        if(!userId) throw new Error('Id не указан');
        if(setting != 'avatar' && setting != 'gallery') throw new Error('Setting указан некорректно');

        const fileName = fileService.savePicture(pictureFile, userId, setting)

        const user = await UserModel.findById(userId)

        if(setting === 'avatar') {
            user.pictures.avatar = fileName
        } else {
            user.pictures.gallery.push(fileName)
        }

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true})
        
        return updatedUser
    }

    async deletePicture(userId: string, pictureName: string, setting: 'avatar' | 'gallery') {
        if(!userId) throw new Error('Id не указан');
        if(setting != 'avatar' && setting != 'gallery') throw new Error('Setting указан некорректно');

        const user = await UserModel.findById(userId)

        if(!user.pictures[setting]) throw new Error('Pictures не найдены');
        if(setting === 'gallery') {
            if(!user.pictures.gallery.includes(pictureName)) throw new Error(`Picture с именем ${pictureName} не найдено`);
            const fileName = fileService.deletePicture(pictureName, userId, setting)
            const fileIndex = user.pictures.gallery.indexOf(fileName)

            user.pictures.gallery.splice(fileIndex, 1)
        } else {
            fileService.deletePicture(pictureName, userId, setting)
            user.pictures.avatar = ''
        }

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true})
        
        return updatedUser
    }

    async delete(id: string) {
        await fileService.deleteUserDir(id)

        const user = await UserModel.findByIdAndDelete(id)

        return user
    }
}

export default new UserService()