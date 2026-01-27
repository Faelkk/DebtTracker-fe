import { getAll } from "./getAll";
import { getById } from "./getById";
import { signin } from "./signin";
import { me } from "./user";

export const authService = {
    signin,
    me,getAll,getById
};