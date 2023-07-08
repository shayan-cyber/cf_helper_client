import axios, { AxiosResponse } from "axios";

const BASE_API_URL=process.env.NEXT_PUBLIC_API_URL?process.env.NEXT_PUBLIC_API_URL:''


export type Problem ={
    name:string,
    contestId:number,
    index:string,
    link:string
}

export type Mashup = {
    [rating: number]: Problem[];
};


export const createMashup = async (handles:string[], ratings:number[], limits:number[]):Promise<Mashup> =>{

    try{
        var handlesStr ='';
        handles.forEach((item, index)=>{
            if(index==0){
                handlesStr = item
            }else{
                handlesStr =  handlesStr + ';' + item;
            }
           
        })
        var ratingsStr ='';
        ratings.forEach((item,index)=>{
            if(index==0){
                ratingsStr = item.toString()
            }else{
                ratingsStr =  ratingsStr + ';' + item.toString();
            }
        })

        var limitsStr=''
        limits.forEach((item,index)=>{
            if(index==0){
                limitsStr = item.toString()
            }else{
                limitsStr =  limitsStr + ';' + item.toString();
            }
        })


        const url = `${BASE_API_URL}/cf/mashup?handles=${handlesStr}&ratings=${ratingsStr}&limits=${limitsStr}`
        const res: AxiosResponse<any> =await axios.get(url);
        return res.data.result;

    }catch(e:any){

        console.log(e);
        throw new Error(e)

    }

    
}