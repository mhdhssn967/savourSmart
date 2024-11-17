import axios from "axios";

const commmonAPI=async(httpMethod,url,reqBody)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}
export default commmonAPI