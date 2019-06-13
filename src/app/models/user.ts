export class User {
    username: string;
    email: string;
    uid: string;

    objectToUser(userObject) {
        const newUser = new User();
        newUser.username = userObject.username;
        newUser.email = userObject.email;
        newUser.uid = userObject.uid;
        return newUser;
    }

    userToObject(userModel: User) {
        const userObject = {
            username: userModel.username,
            email: userModel.email,
            uid: userModel.uid,
        }
        return userObject;
    }

    constructor() {
        this.email = '';
        this.username = '';
        this.uid = '';
    }
}