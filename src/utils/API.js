import axios from "axios";
const path="https://8xa8pgu8uj.execute-api.us-east-1.amazonaws.com";
const stage="beta"

let API={

    getGames: function(token, id){
        let req=`${path}/${stage}/list/?id=${id}`;
        return axios.get(req,{
            headers:{
                'Authorization':token
            }
        });
    },
    createGame:function(params, token){
        let req=`${path}/${stage}/create/`;
        let headers={headers:{"Authorization":token}} 
        return axios.post(req, params, headers)
    }
};
export default API;