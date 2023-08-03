export interface IUser {
    user: {
        username: string;
        email: string;
        password: string;
        token?: any;
        _id?: any;
    };
    success: boolean
}