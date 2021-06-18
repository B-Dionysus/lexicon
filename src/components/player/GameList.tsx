import { useEffect, useState } from "react";
import {callBackURL} from "../../context/auth/AWSContext";
import API from "../../utils/API"
interface gameInfo{
    name:string,
    id:string,
    currentRound:string,
    url:string

}

export default function GameList(props:any){
    const [games, setGames]=useState<gameInfo[]>([]);
    const {setLoadingIndicator, user}= props;
    // When the props.user changes (e.g., when the user information is loaded) we retrieve the array of games
    // that hte user is player, and then retrieve the data from each of those games.
    // This is displayed in a tidy little list.
    useEffect(()=>{
        async function loadPlayerData(){
            const playerId:string=user.attributes.sub;
            const token:string=user.signInUserSession.accessToken.jwtToken;
            let playerData=await API.getSpecificPlayer(playerId);
            const gameIds=playerData.data.Items[0].gameIds;
            let tempArray:gameInfo[]=[];
            for(const id of gameIds){
                let gameData=await API.getSpecificGame(token, id);
                if(gameData.data){
                    let info=gameData.data.Items[0];                        
                    let anotherGame:gameInfo={
                        name:info.title,
                        id:id,
                        currentRound:info.rounds[info.currentRound],
                        url:callBackURL+"play?gameId="+id
                    }
                    tempArray.push(anotherGame);
                }
                else console.error("Error loading game data: ",gameData)
            }
            setLoadingIndicator(false);
            setGames(tempArray);
        }        
        setLoadingIndicator(true);
        loadPlayerData();
    },[user, setLoadingIndicator]);

    return(

        <div>
            <p><b>Your Games</b></p>
            <ul>
                {
                    games.length ? games.map(
                        (game:gameInfo)=>(<li key={game.id}><a href={game.url}>{game.name}</a>: Round {game.currentRound}</li>)
                    ) : <li>Loading</li>
                }
            </ul>
        </div>
    );
}