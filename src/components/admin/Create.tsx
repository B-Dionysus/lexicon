import {useState} from "react";
import UserImage from "../UserImage"
import API, {uploadGameLogo} from "../../utils/API";

const Create=(props:any)=>{
    
    const [rounds, setRounds]=useState([""]);
    const [gameImage, setGameImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
    
    async function makeGame(e:any){
        e.preventDefault();
        props.setLoading(true);
        let token=props.user.signInUserSession.idToken.jwtToken;
        let form:any=document.getElementById("createGame");
        let categories=removeBlanks(rounds);
        setRounds([...categories]);
        let params={
            "Item": {
              "creatorId": props.user.attributes.sub,
              "title": form.title.value,
              "description": form.description.value,
              "logo": gameImage,
              "rounds":categories,
              "playerIds":[props.user.attributes.sub],
              "currentRound":0
            }
          };
          console.log(params); 
          API.createGame(params, token)
          .then((resp)=>{
            console.log(resp);         
            let newId=resp.data.body.Item.id;
            props.edit(newId);
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
    return(
        <div className="create">
            <form id="createGame" onSubmit={makeGame}>
                <div id="topSection">
                    <div><label htmlFor="title">Game Title. Something that will give the players ideas without being too limiting</label></div>
                    <div><input type="text" name="title" size={40} placeholder="The Book of Lost Battlemagi"></input></div>
                    <div><label htmlFor="description">Description. Again, nothing too specific. But give the initial round something to work with.</label></div>
                    <div><textarea name="description" cols={40} rows={3}placeholder="Medieval fantasy setting, with lots of epics spells and interested characters!"></textarea></div>
                    <div><label htmlFor="categories">Rounds. Each round has a different starting letter. For example, the classic game started with entries beginning with A, and then moved on to B entries, and so on.</label></div>
                    </div>
                <div className="roundsAndImage">
                <span>
                <span id="roundSpan">
                        {/* @ts-ignore */}
                        {rounds.map((r,i)=>(
                            <div key={i}><label htmlFor={`round${i}`}>Round {i+1}</label><input onChange={updateRounds} type="text" 
                            className="rounds" id={`round${i}`} name={`round${i}`} data-index={i} ></input></div>
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
    )

}

export default Create;