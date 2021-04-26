import {Fragment, useState} from "react";
import UserImage from "../UserImage"
import AWS from "aws-sdk"
import "../../css/create.css"

const Create=(props:any)=>{

    const [rounds, setRounds]=useState([""]);
    const [gameImage, setGameImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
    async function makeGame(){

    }
    async function uploadFile(e:any){
        e.preventDefault();
        let files = ((document.getElementById("photoupload")) as HTMLInputElement).files;   
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
            upload.promise()
            .then((res:any)=>{
                console.log(res);
                setGameImage(res.Location);
            })
            .catch((err)=>{
                // User did not select a photo (perhaps that chose "Cancel" in the file manager)
                console.error(err);
                return false;    
            })
        } 
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
            <form id="createGame" onSubmit={makeGame}>
                <p><label htmlFor="title">Game Title. Something that will give the players ideas without being too limiting</label></p>
                <p><input type="text" name="title" size={40} placeholder="The Book of Lost Battlemagi"></input></p>
                <p><label htmlFor="description">Description. Again, nothing too specific. But give the initial round something to work with.</label></p>
                <p><textarea name="description" cols={40} rows={3}placeholder="Medieval fantasy setting, with lots of epics spells and interested characters!"></textarea></p>
                <p><label htmlFor="categories">Rounds. Each round has a different starting letter. For example, the classic game started with entries beginning with A, and then moved on to B entries, and so on.</label></p>
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
                    <input id="photoupload"  name="photoupload" onChange={uploadFile} type="file" accept="image/*" />
                    <UserImage image={gameImage}/> 
                </span>
                </div>
                <input id="subButton" type="submit" />
            </form>
        </div>
    )

}

export default Create;