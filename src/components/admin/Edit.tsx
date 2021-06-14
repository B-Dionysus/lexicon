import {useState, useEffect} from "react";
import UserImage from "../UserImage"
import PlayerList from "../PlayerList"
import API, {uploadGameLogo} from "../../utils/API"; 
import {joinGamePath} from "../../context/auth/AWSContext"; 
import '../../css/mainBook.css';
interface editProp{
    user:any,
    gameId:string,
    setLoading:any,
    setState:any,
    token:string;
}
const Edit=(props:editProp)=>{
    const [rounds, setRounds]=useState<string[]>([]);
    const [playerIds,setIds]=useState<string[]>([])
    const [gameImage, setGameImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
    const {token, gameId, setLoading} = props;

    useEffect(()=>{
        setLoading(true);
        API.getSpecificGame(token, gameId)
        .then((resp)=>{
            setLoading(false);
            let game=resp.data.Items[0];
            let newArray=game.rounds;
            setRounds(newArray);
            setGameImage(game.logo);   
            setIds(game.playerIds);         
            let form:any=document.getElementById("editGame");
            form.title.value=game.title;
            form.description.value=game.description;
        })
        .catch((err)=>{ 
            setLoading(false);
            console.error(err);
        });
        //React Hook useEffect has a missing dependency: 'setLoading'.
         // eslint-disable-next-line
    },[gameId, token]);

    function commitEdits(e:any){
        e.preventDefault();
        props.setLoading(true);
        let token=props.user.signInUserSession.idToken.jwtToken;
        let form:any=document.getElementById("editGame");
        let categories=removeBlanks(rounds);
        setRounds([...categories]);
        let params={
              "id":props.gameId,
              "creatorId": props.user.attributes.sub,
              "title": form.title.value,
              "description": form.description.value,
              "logo": gameImage,
              "rounds":categories
          };
          console.log(params); 
          API.updateGame(params, token)
          .then((resp)=>{
            console.log(resp);    
            props.setLoading(false); 
            props.setState("create"); 
          })
          .catch((err)=>{              
              console.log(err);
          })
    }
    async function gameLogo(e:any){
        e.preventDefault();
        // Object is possibly undefined.
        //@ts-ignore
        uploadGameLogo(document.getElementById("photoupload"))
        .then((res:any)=>{
            console.log(res);
            setGameImage(res.Location);
        })
        .catch((err)=>{
            // User did not select a photo (perhaps they chose "Cancel" in the file manager)
            console.error(err);
        })
    } 
    function removeBlanks(arr:Array<string>):Array<string>{
        arr.forEach((elem, i)=>{
            console.log(elem);
            if(elem===""){
                arr.splice(i,1);
                console.log("Removed element "+i);
            }
        });
        return arr;
    }
    function addRound(e:any){
        e.preventDefault();
        let newArray=[...rounds];
        // Add a blank round to the array state
        newArray.push("");
        setRounds(newArray);
    }
    function updateRounds(e:any){
        let newArray=[...rounds];
        newArray[e.target.dataset.index]=e.target.value;
        setRounds(newArray);      
    }
    function deleteGame(e:any){        
        e.preventDefault(); 
        let gameName=(document.getElementById("editGame"))!.title; 
        if(window.confirm(`Delete game "${gameName}? This cannot be undone.`)){
            props.setLoading(true);
            API.deleteGame(props.user.signInUserSession.idToken.jwtToken, props.gameId, props.user.attributes.sub)
            .then((resp)=>{
                console.log(resp);
                props.setLoading(false);
                props.setState("create");
            })
            .catch((err)=>{
                console.error(err);
            });
        }
    }
    function emailNewUser(e:any){
        e.preventDefault();        
        props.setLoading(true);
        const address=(document.getElementById("newUser") as HTMLInputElement).value;    
        (document.getElementById("newUser") as HTMLInputElement).value="";    
        let form:any=document.getElementById("editGame");      
        const path=joinGamePath+`&state=${props.gameId}`  
        let emailText=
        `Greetings! You have been invited to take part in a game of Lexicon! Lexicon is a collaborative world-building game, in which each player takes the role of an academic author, working together to compile a reference book about a specific topic. The book will be written over a number of rounds, and as the game continues we will learn more about the world as we go! 
        
        The title of this particular reference book is, "${form.title.value}," so everyone will be creating fictional entries that relate to that. The first round will be ${rounds[0]}, so everyone will write a short (~200 word) entry that begins with ${rounds[0]} (not counting words like "A" or "The"). In these entries, everyone will also mention further entries in the book—ones that do not begin with ${rounds[0]} and which will remain undefined for the moment.

        In the next round, ${rounds[1]}, everyone will first claim any entries written by other people in previous rounds, and will write that entry, finally giving context to what was previously a meaningless word. These entries will also reference future entries, and so on until the entire book is completed and we have learned all about ${form.description.value}.

        If you would like to join this project, please visit this URL: "${path}" to make an account and get started!

        Title: ${form.title.value}
        Description: ${form.description.value}`;
        let htmlText=
        `<p>Greetings! You have been invited to take part in a game of Lexicon! Lexicon is a collaborative world-building game, in which each player takes the role of an academic author, working together to compile a reference book about a specific topic. The book will be written over a number of rounds, and as the game continues we will learn more about the world as we go! 
        </p><p>
        The title of this particular reference book is, "${form.title.value}," so everyone will be creating fictional entries that relate to that. The first round will be ${rounds[0]}, so everyone will write a short (~200 word) entry that begins with ${rounds[0]} (not counting words like "A" or "The"). In these entries, everyone will also mention further entries in the book—ones that do not begin with ${rounds[0]} and which will remain undefined for the moment.
        </p><p>
        In the next round, ${rounds[1]}, everyone will first claim any entries written by other people in previous rounds, and will write that entry, finally giving context to what was previously a meaningless word. These entries will also reference future entries, and so on until the entire book is completed and we have learned all about ${form.description.value}.
        </p><p>
        If you would like to join this project, please click <a href="${path}">here</a> to make an account and get started!
        </p><p>
        <b>Title:</b> ${form.title.value}</p><p>
        <b>Description:</b> ${form.description.value}</p>`;
        const emailParams = {
            Destination: {
                ToAddresses: [address]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: htmlText
                    }, 
                    Text: { Data: emailText}                
                },           
                Subject: { Data: "Invition to Lexicon: "+form.title.value}
            },
            Source: "benjaminDionysus@benjaminDionys.us"
        }
        API.sendInviteEmail(props.token, emailParams)
        .then((resp)=>{         
            (document.getElementById("newUser") as HTMLInputElement).value="";  
            props.setLoading(false);       
            console.log(resp);
        })
        .catch((err)=>{            
            props.setLoading(false);
            console.error(err);
        })
    }
    return(
    <div className="mainBook">
    <div className="mainPage ">
    <div className="mainText">
        <form id="editGame" onSubmit={commitEdits}>
        <div className="grid">
            <div>
                <div><p>
                    <label style={{display:"block"}} htmlFor="title">Title</label>
                    <input type="text" name="title" size={38}></input></p>
                    <p><textarea name="description" cols={40} rows={3}></textarea></p>
                </div>
                <div>
                    <span id="roundSpan">
                        {/* @ts-ignore */}
                        {rounds.map((r,i)=>(
                            <div key={i}><label htmlFor={`round${i}`}>Round {i+1}: </label><input onChange={updateRounds} type="text" 
                            className="rounds" id={`round${i}`} name={`round${i}`} data-index={i} value={r}></input></div>
                        ))} 
                    </span> 
                    <button onClick={addRound}>Add Round</button>
                </div>
            </div>
            <div>
                <PlayerList ids={playerIds}/>
                <div>
                    <span className="gameLogoSpan">
                        <div>Game Logo (optional)</div>
                        <input id="photoupload"  name="photoupload" onChange={gameLogo} type="file" accept="image/*" />
                        <UserImage image={gameImage}/> 
                    </span>
                </div>
            </div>
        </div>        
        <div>
            <input id="subButton" type="submit" /> <button onClick={deleteGame}>Delete</button>
        </div>
        </form>
        <div>
            <form onSubmit={emailNewUser}>
                <label htmlFor="newUser">Add a user to the game:</label>
                <input type="email" required id="newUser" placeholder="email@email.com"></input>
                <input type="submit" value="Invite User" />
            </form>
        </div>
        </div>
        </div>
    </div>
    ); 
}

export default Edit;