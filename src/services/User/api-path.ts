/* eslint-disable import/no-anonymous-default-export */
import { apiUrl } from "../../contants/constant";
export const GET_CURRENT_USER = `${apiUrl}/user`
const GET_USER_BY_ID = `${apiUrl}/user/getUser`
const FOLLOW = `${apiUrl}/follow/create`
const UNFOLLOW = `${apiUrl}/follow/delete`


export default {
    GET_USER_BY_ID,
    FOLLOW,
    UNFOLLOW
}
