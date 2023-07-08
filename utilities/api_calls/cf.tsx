import axios, { AxiosResponse } from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_CF_URL?process.env.NEXT_PUBLIC_CF_URL:''


export type userInfo ={
    handle:string,
    email:string,
    firstName?:string,
    lastName?:string,
    country?:string,
    city?:string,
    organization?:string,
    contribution:number,
    rank:string,
    rating:number,
    maxRank	:string,
    maxRating:number,
    friendOfCount:number,
    avatar:string,
    titlePhoto:string



}
/**
 * Fetches user information based on the given handle.
 *
 * @param {string} handle - The user's handle.
 * @return {Promise<userInfo>} The user information.
 */


export const fetchUserInfo =async (handle:string) :Promise<userInfo> =>{

    const url = `${BASE_API_URL}/user.info?handles=${handle}`;
    try{

        const res: AxiosResponse<any> =await axios.get(url);
        return res.data.result[0];

    }catch(e:any){
        console.log(e);
        throw new Error(e)
        
    }
    
}



