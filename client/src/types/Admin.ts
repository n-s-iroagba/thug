import { User } from "./User";

export type Admin ={
    id?: number,
    username:string;
    userId:string;
    user:User
}
export type CreateAdmin = {
    username: string;
    email: string;
    whatsAppNumber: string;
    password: string;
};

export type CreateAdminFormData = CreateAdmin & { confirmPassword: string };


