import AWSContext from "../../context/auth/AWSContext";
import {Auth} from 'aws-amplify';
import { useState, useContext, useEffect } from "react";
import API from "../../utils/API";

export default function CreateAdmin(props:any){
    const awsContext = useContext(AWSContext); 
    const {user} = awsContext;
    props.loading(false);

    if(user) 
    console.log(user);
   // {console.log(user.signInUserSession.idToken.jwtToken);}
    // The user has just been sent an email inviting them to become an administrator

    function register(e:any){
        props.loading(true);
        e.preventDefault();
        const name=(document.getElementById("name")as HTMLInputElement).value;
        let data={
            "userId":user.attributes.sub,
            "accessLevel":50,
            "userName":name
        }
        let params={"Item":data} 
        let token=user.signInUserSession.idToken.jwtToken;
        API.createNewAdmin(token, params) 
        .then((resp)=>{
          console.log(resp);    
          let text=document.getElementById("welcomeText");
          if(resp.status===200)
          {
                Auth.updateUserAttributes(user, {'custom:fullName': name, 'custom:accessLevel':'50'})
                .then((resp)=>{     
                    console.log(user);
                    text!.innerHTML=`<div><p class="gameHeading">Congratulations, ${name}!</p>
                    <p class="gameHeading">You have been granted Administrator access.</p>
                    <p><a href="/admin">Create Lexicon Game</a></p></div>`
                    props.loading(false);
                })
                .catch((err)=>{
                    console.error("Update Custom Attribute error");
                    text!.innerHTML=`<div><p class="gameHeading">Error!</p><p class="gameHeading">${err}</p></div>`
                    console.error(err); 
                    props.loading(false);
                })
            }
        })
        .catch((err)=>{         
            props.loading(false);     
            console.error(err);
        })
    }




    return(
        <div id="welcomeText">
            <div >
                <p className="gameHeading">Welcome to Lexicon, {user.username}!</p>
                <p className="gameHeading">How should we refer to you?</p>
            </div>
            <div>
                <form id="newAdmin" name="newAdmin" onSubmit={register}>
                    <p><label htmlFor="name">Name: </label><input type="text" required id="name" placeholder="Jane Doe" />
                     <input type="submit" /></p>
                </form>
            </div>
        </div>
    )
} 