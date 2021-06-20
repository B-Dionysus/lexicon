import "../css/player.css";
import NavBar from "../components/NavBar"
import CurrentGameInfo from "../components/player/CurrentGameInfo"
import EditEntry from "../components/player/EditEntry"
import UnclaimedEntries from "../components/player/UnclaimedEntries"
import API from "../utils/API"
import { useState, useContext, useEffect } from "react";
import AWSContext from "../context/auth/AWSContext";
import Book from "../components/Book"
import {gameInfo, unclaimedEntry} from "../interfaces/player.interfaces"

export default function Play(){
    const {user} = useContext(AWSContext); 
    const [gameInfo, setGame]=useState<gameInfo>({title:"Loading", id:"0", currentRound:"Loading"})
    let linked:unclaimedEntry[]=[{title:"what", status:"indicator true"}, {title:"just", status:"indicator off"}];
    const [linkedEntries, setLinked]=useState<unclaimedEntry[]>(linked)
    const gameId:string=new URLSearchParams(window.location.search).get("gameId") as string;
    const [bookDisplay, setLoadingIndicator]=useState(false);
    useEffect(()=>{
        async function getGameInfo(token:string, gameId:string){
            let info=await API.getSpecificGame(token, gameId);
            if(info.status===200){
                let roundNum=info.data.Items[0].currentRound;
                let currentRound=info.data.Items[0].rounds[roundNum];
                let gameInfo={
                    title:info.data.Items[0].title,
                    id:gameId,
                    currentRound:currentRound,
                    logo:info.data.Items[0].logo
                }
                setLoadingIndicator(false);
                setGame(gameInfo);
            }
            else {
                console.error(info);
            }
        };
        if(user.signInUserSession){
            const token=user.signInUserSession.idToken.jwtToken;
            setLoadingIndicator(true);
            getGameInfo(token, gameId);
        }
    },[user, gameId]); 

    function addLinkedEntry(entry:string){
        setLinked([...linkedEntries, {title:entry, status:"indicator off"}])
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
        // Bah, we need to re-enable all the markup and all. sigh
        let newTitle=(document.getElementById("title") as HTMLInputElement).value;
        document.getElementById("preview")!.innerHTML=`<p><b>${newTitle}</b></p><p>${textArea.value}</p>`;
    }
    return(  
        <>
        <NavBar />
        <Book display={bookDisplay}/>
        <div className="playMain">
            <CurrentGameInfo game={gameInfo}/>
            <div>
                <div className="editEntry">
                    <EditEntry addLinkedEntry={addLinkedEntry}/> 
                    <div id="preview" className="entry preview">
                       A lexicon entry concisely describing this concept
                    </div>
                    <UnclaimedEntries title="Linked Entries" removeLinkedEntry={removeLinkedEntry} unclaimedEntries={linkedEntries}/>
                </div>
            </div>
        </div>
        </>
    )
}