import {useState, useEffect} from "react";
import UserImage from "../UserImage"
import API, {uploadGameLogo} from "../../utils/API";
import "../../css/create.css"

interface editProp{
    user:string,
    gameId:string
}
const Edit=(props:editProp)=>{
    const [rounds, setRounds]=useState([""]);
    const [gameImage, setGameImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");

    useEffect(()=>{
        let token=props.user.signInUserSession.idToken.jwtToken;
        let gameId=props.gameId;
        loadGame(token, gameId);
    },[props.gameId]);

    function loadGame(idToken, gameId){
        props.setLoading(true);
        API.getSpecificGame(idToken, gameId)
        .then((resp)=>{
            console.log(resp);
            props.setLoading(false);
            let game=resp.data.Items[0];
            let newArray=game.rounds;
            setRounds(newArray);
            console.log(game.rounds);
            setGameImage(game.logo);            
            let form:any=document.getElementById("createGame");
            form.title.value=game.title;
            form.description.value=game.description;
        })
        .catch((err)=>{ 
            props.setLoading(false);
            console.error(err);
        });
    }
    function commitEdits(){

    }
    async function gameLogo(e:any){
        e.preventDefault();
        uploadGameLogo(document.getElementById("photoupload"))
        .then((res:any)=>{
            console.log(res);
            setGameImage(res.Location);
        })
        .catch((err)=>{
            // User did not select a photo (perhaps that chose "Cancel" in the file manager)
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
    return(
        <div className="create greyGrad">
        <form id="createGame" onSubmit={commitEdits}>
            <p><input type="text" name="title" size={40}></input></p>
            <p><textarea name="description" cols={40} rows={3}></textarea></p>
            <div className="roundsAndImage">
            <span>
            <span id="roundSpan">
                    {/* @ts-ignore */}
                    {rounds.map((r,i)=>(
                        <div key={i}><label htmlFor={`round${i}`}>Round {i+1}</label><input onChange={updateRounds} type="text" 
                        className="rounds" id={`round${i}`} name={`round${i}`} data-index={i} value={r}></input></div>
                    ))}
                </span> 
                <button onClick={addRound}>Add Round</button>
            </span>
            <span className="gameLogoSpan">
                <div>Game Logo (optional)</div>
                <input id="photoupload"  name="photoupload" onChange={gameLogo} type="file" accept="image/*" />
                <UserImage image={gameImage}/> 
            </span>
            </div>
            <input id="subButton" type="submit" />
        </form>
    </div>
    ); 
}

export default Edit;