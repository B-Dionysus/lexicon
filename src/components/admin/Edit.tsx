import {useState, useEffect} from "react";
import UserImage from "../UserImage"
import API, {uploadGameLogo} from "../../utils/API";
import "../../css/create.css"

interface editProp{
    user:any,
    gameId:string,
    setLoading:any,
    setState:any,
    token:string;
}
const Edit=(props:editProp)=>{
    const [rounds, setRounds]=useState([""]);
    const [gameImage, setGameImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");

    // const token=props.token;
    // const gameId=props.gameId;
    // const sl=props.sl;
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
    return(
        <div className="create greyGrad">
        <form id="editGame" onSubmit={commitEdits}>
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
            <input id="subButton" type="submit" /> <button onClick={deleteGame}>Delete</button>
        </form>
    </div>
    ); 
}

export default Edit;