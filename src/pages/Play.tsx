import "../css/player.css";
import NavBar from "../components/NavBar"
import CurrentGameInfo from "../components/player/CurrentGameInfo"
import EditEntry from "../components/player/EditEntry"
import UnclaimedEntries from "../components/player/UnclaimedEntries"
import API from "../utils/API"
import { useState, useContext, useEffect } from "react";
import AWSContext from "../context/auth/AWSContext";
import Book from "../components/Book"
import {gameInfo, linkedEntry} from "../interfaces/player.interfaces" 
import {updateDesc} from "../components//player/textUpdateUtilities"

export default function Play(){
    const {user} = useContext(AWSContext); 
    let userInfo={userId:"", token:""};
    if(user.attributes) 
    {
        let userId=user.attributes.sub;
        userInfo={userId:userId, token: user.signInUserSession.idToken.jwtToken}
    }
    const [entryId, setId]=useState("0");
    // State showing the basic information about the current game
    const [gameInfo, setGame]=useState<gameInfo>({title:"Loading", id:"0", roundNum:0,currentRound:"Loading"})
    // State holding new entries that the players is currently adding for other players to write, later
    const [linkedEntries, setLinked]=useState<linkedEntry[]>([])
    // State holding all of the current unwritten entries that the player might want to claim
    const [unclaimedEntries, setUnclaimed]=useState<linkedEntry[]>([])
    // Whether or not we should be displaying the loading icon
    const [bookDisplay, setLoadingIndicator]=useState(false);

    const gameId:string=new URLSearchParams(window.location.search).get("gameId") as string;

    useEffect(()=>{
        async function getGameInfo(token:string, gameId:string){
            let info=await API.getSpecificGame(token, gameId);
            console.log(info);
            if(info.status===200){
                let roundNum=info.data.Items[0].currentRound;
                let currentRound=info.data.Items[0].rounds[roundNum];
                let gameInfo:gameInfo={ 
                    title:info.data.Items[0].title,
                    id:gameId,
                    roundNum:roundNum, 
                    currentRound:currentRound,
                    logo:info.data.Items[0].logo
                }
                setLoadingIndicator(false);
                setGame(gameInfo);
            }
            else {
                console.error(info);
                setLoadingIndicator(false);
            }
        };
        async function getEntry(token:string, gameId:string, userId:string){
            let info=await API.getEntry(token, gameId, userId);
            console.log(info);
            if(info.status===200 && info.data.Items.length){
                let form:any=document.getElementById("entry");
                form.title.value=info.data.Items[0].title;
                form.description.value=info.data.Items[0].description;
                setLinked(info.data.Items[0].linkedEntries);
                setId(info.data.Items[0].id);
                // form.description.value=info.data.Items[0].description;
                updateDesc("");
                setLoadingIndicator(false);
            }
            else {
                console.error(info);
                setLoadingIndicator(false);
            }
        };
        async function getUnclaimedEntries(gameId:string){

        }
        if(userInfo.token && gameId){
            const token=userInfo.token;
            setLoadingIndicator(true);
            getGameInfo(token, gameId);
            getEntry(token,gameId, userInfo.userId);
        }
    },[userInfo.userId, userInfo.token, gameId]); 

    function addLinkedEntry(entry:string){
        setLinked([...linkedEntries, {title:entry, entryId:entryId, status:"indicator off"}])
    }
    function removeLinkedEntry(entry:HTMLElement){
        let formerEntry=entry.textContent;
        // Remove the entry form the entry state (which will also take it out of the linked entries component at the bottom)
        let tempArray=linkedEntries.filter(storedEntry =>{
            if(storedEntry.title===formerEntry) return false;
            else return true;
        })
        setLinked(tempArray);
        // Also remove the markup from the textarea         
        let textArea=(document.getElementById("description") as HTMLTextAreaElement);
        
        textArea.value=textArea.value.replace("[l]"+formerEntry+"[/l]",formerEntry!)
        // And re-load the preview
        updateDesc("");
        // // Bah, we need to re-enable all the markup and all. sigh
        // let newTitle=(document.getElementById("title") as HTMLInputElement).value;
        // document.getElementById("preview")!.innerHTML=`<p><b>${newTitle}</b></p><p>${textArea.value}</p>`;
    }
    return(  
        <>
        <NavBar />
        <Book display={bookDisplay}/>
        <div className="playMain">
            <CurrentGameInfo game={gameInfo}/>
            <div>
                <div className="editEntry"> 
                   {gameInfo.roundNum>0 && (<UnclaimedEntries title="Unclaimed Entries" removeLinkedEntry={removeLinkedEntry} unclaimedEntries={unclaimedEntries}/>)}
                    <EditEntry linkedEntries={linkedEntries} setLoading={setLoadingIndicator} gameInfo={gameInfo} userInfo={userInfo} entryId={entryId} addLinkedEntry={addLinkedEntry}/> 
                    <UnclaimedEntries title="Linked Entries" removeLinkedEntry={removeLinkedEntry} unclaimedEntries={linkedEntries}/>
                </div>
            </div>
        </div>
        </>
    )   
}