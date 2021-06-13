import axios from "axios";
import AWS from "aws-sdk"
const path="https://8xa8pgu8uj.execute-api.us-east-1.amazonaws.com";
const stage="Delta"
interface emailParam{
    Destination: {
        ToAddresses: string[]
    },
    Message: {
        Body: {
            Text: { Data: string}                
        },            
        Subject: { Data: string}
    },
    Source:string
}
interface newAdmin{
    Item:{
        userId:string,  
        userName:string, 
        accessLevel:number}
}
let API={
    getGames: function(token:string, id:string){
        let req=`${path}/${stage}/list/?id=${id}`;
        return axios.get(req,{
            headers:{
                'authorization':token
            }
        });
    },
    getSpecificGame: function(token:string, gameId:string){
        // need to rename this method to something more useful than "query"
        let req=`${path}/${stage}/query/?id=${gameId}`;
        return axios.get(req,{
            headers:{
                'authorization':token
            }
        });
    },
    createGame:function(params:any, token:string){
        let req=`${path}/${stage}/create/`;
        let headers={headers:{"authorization":token}} 
        return axios.post(req, params, headers)
    },
    updateGame:function(params:any, token:string){
        let req=`${path}/${stage}/update/`;
        let headers={headers:{"authorization":token}} 
        return axios.post(req, params, headers)    
    },
    deleteGame:function(token:string, gameId:string, creatorId:string){
        let req=`${path}/${stage}/delete/?id=${gameId}&creatorId=${creatorId}`;
        console.log(req);
        return axios.get(req,{
            headers:{
                'authorization':token
            }
        });
    },
    sendInviteEmail:function(token:string, params:emailParam){
        let req=`${path}/${stage}/invite`;
        let headers={headers:{"authorization":token}} 
        return axios.post(req, params, headers)    
    },
    createNewPlayer:function(token:string, params:newAdmin){
        let req=`${path}/${stage}/createPlayer`;
        let headers={headers:{"authorization":token}} 
        return axios.post(req, params, headers)    
    },
    getSpecificPlayer:function(charId:string){
        let req=`${path}/${stage}/queryPlayer?charId=${charId}`;
        return axios.get(req)    
    }
};





const uploadGameLogo=(f:HTMLInputElement | null)=>{
    let files = f!.files;   
    if (files && !files.length) {
        console.error("Error: No photos");
    }
    else if(files){
        console.log("Uploading "+files[0].name); 
        let file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent("gameLogos") + "/";            
        var photoKey = albumPhotosKey + fileName;
        console.log("to "+photoKey);
        // Use S3 ManagedUpload class as it supports multipart uploads
        var upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: "lexicon-image-storage",
                Key: photoKey,
                Body: file,
                ACL: 'public-read'
            }
        });
        return upload.promise();
    }
}
export default API;
export {uploadGameLogo};