import "../css/player.css";
import NavBar from "../components/NavBar"
import CurrentGameInfo from "../components/player/CurrentGameInfo"
import EditEntry from "../components/player/EditEntry"
import API from "../utils/API"
import { useState, useContext, useEffect } from "react";
import AWSContext from "../context/auth/AWSContext";
import Book from "../components/Book"
import {gameInfo} from "../interfaces/player.interfaces"
 
export default function Play(){
    const {user} = useContext(AWSContext); 
    const [gameInfo, setGame]=useState<gameInfo>({title:"Loading", id:"0", currentRound:"Loading"})
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

    return( 
        <>
        <NavBar />
        <Book display={bookDisplay}/>
        <div className="main">
            <CurrentGameInfo game={gameInfo}/>
            <div>
                <div className="editEntry"><EditEntry /></div>
                <div className="unclaimed" id="unclaimed">Unclaimed Entries</div>
            </div>
        </div>
        </>
    )
}