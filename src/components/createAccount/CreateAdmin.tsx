import AWSContext from "../../context/auth/AWSContext";
import {Auth} from 'aws-amplify';
import { useContext } from "react";
import API from "../../utils/API";

export default function CreateAdmin(props:any){
    const awsContext = useContext(AWSContext); 
    const {user} = awsContext;
    props.loading(false);

    if(user) 
    console.log(user);
   // {console.log(user.signInUserSession.idToken.jwtToken);}
    // The user has just been sent an email inviting them to become an administrator

    function register(e:React.FormEvent){
        props.loading(true);
        e.preventDefault();
        // Note: If the user re-submits this form it will change the data, including the "createdAt" time.
        // In theory, the user shouldn't see this page again, but in theory they could go back to their 
        // email and follow the link again.
        const name=(document.getElementById("name")as HTMLInputElement).value;
        let data={
            "userId":user.attributes.sub,
            "accessLevel":50,
            "userName":name,
            "userEmail":user.attributes.email
        }
        let params={"Item":data} 
        let token=user.signInUserSession.idToken.jwtToken;
        API.createNewPlayer(token, params) 
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