import AWSContext, {callBackURL} from "../../context/auth/AWSContext";
import {Auth} from 'aws-amplify';
import {useState} from "react";
import { useContext } from "react";
import API, {uploadGameLogo} from "../../utils/API";
import UserImage from "../UserImage"

interface Game{
    id?:string;
    title?: String;
    description?: String;
    image?: String;
    creatorId?:String;
    rounds:Array<String>;
}
interface g{
    gameInfo:Game
    loading:(bookDisplay: boolean) => void;
}
export default function CreatePlayer(props:g){
    const {gameInfo}=props;
    const [playerImage, setPlayerImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
    const awsContext = useContext(AWSContext); 
    const {user} = awsContext;
    if(user) console.log(user);

    function register(e:React.FormEvent){
        props.loading(true);
        e.preventDefault();
        const name=(document.getElementById("name")as HTMLInputElement).value;
        const charName=(document.getElementById("name")as HTMLInputElement).value;
        let accessLevel=10;
        if(user.attributes["custom:accessLevel"]) accessLevel=user.attributes["custom:accessLevel"];
        let data={
            "userId":user.attributes.sub,
            "accessLevel":accessLevel,
            "userName":name,
            "userEmail":user.attributes.email,
            "gameIds":[gameInfo.id],
            "characterName":charName,
            "characterImageURL":playerImage
        }
        let params={"Item":data} 
        let token=user.signInUserSession.idToken.jwtToken;
        API.createNewPlayer(token, params) 
        .then((resp)=>{
          console.log(resp);    
          if(resp.status===200)
          {
                Auth.updateUserAttributes(user, {'custom:fullName': name, 'custom:accessLevel':data.accessLevel.toString()})
                .then((resp)=>{     
                    console.log(user);
                    props.loading(false);
                    window.location.href=callBackURL+"play?gameId="+gameInfo.id;
                })
                .catch((err)=>{
                    console.error("Update Custom Attribute error");
                    let text=document.getElementById("welcomeText");
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

    async function newImage(e:React.FormEvent){
        e.preventDefault();
        // Object is possibly undefined.
        //@ts-ignore
        uploadGameLogo(document.getElementById("photoupload")) 
        .then((res:any)=>{
            console.log(res);
            setPlayerImage(res.Location);
        })
        .catch((err)=>{
            // User did not select a photo (perhaps that chose "Cancel" in the file manager)
            console.error(err);
        })
    }  

    let userName="Jane Doe";
    if(user.attributes["custom:fullName"]) userName=user.attributes["custom:fullName"];
return(
    <>
        <div id="welcomeText">
            <p className="gameHeading"><i>{gameInfo.title}</i>:</p>
            <p className="gameHeading">{gameInfo.description}</p>
        </div>
        <div>
            <form className="newPlayerForm" id="newPlayer" name="newPlayer" onSubmit={register}>
                <div>
                    <p><label htmlFor="name">Player Name: </label><input type="text" required id="name" defaultValue={userName} /></p>
                    <p><label htmlFor="email">Player email: </label><input type="text" readOnly id="email" value={user.attributes.email} /></p>
                </div>
                <div>
                    <p><label htmlFor="name">Character Name: </label><input type="text" required id="charName" placeholder="Reginald Arbiter V" /></p>
                    <span className="gameLogoSpan">
                        <div>Player Image 500px x 500px (optional)</div>
                        <input id="photoupload"  name="photoupload" onChange={newImage} type="file" accept="image/*" />
                        <UserImage image={playerImage}/> 
                </span>
                </div>
                <div className="newPlayerSubmit"><input type="submit" /></div>
            </form>
        </div>
        <div>
            <p>Lexicon is a collaborative world-building game, in which each player takes the role of an academic author, 
            working together to compile a reference book about a specific topic. The book will be written over a number of
            rounds, and as the game continues we will learn more about the world as we go!</p>
            <p>The title of this particular reference book is, "{gameInfo.title}," so everyone will be creating fictional 
            entries that relate to that. The first round will be {gameInfo.rounds[0]}, so everyone will write a short (~200 word) 
            entry that begins with {gameInfo.rounds[0]} (not counting words like "A" or "The"). In these entries, everyone will also 
            mention further entries in the book—ones that do not begin with {gameInfo.rounds[0]} and which will remain undefined for the moment.</p>
            <p>In the next round, {gameInfo.rounds[1]}, everyone will first claim any entries written by other people in previous 
            rounds, and will write that entry, finally giving context to what was previously a meaningless word. These entries 
            will also reference future entries, and so on until the entire book is completed and we have learned all
            about <i>{gameInfo.description}</i>.
            </p>
        </div> 
    </>)
} 