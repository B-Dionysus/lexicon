import { useEffect, useState, useCallback } from "react";
import API from "../../utils/API"
interface gameInfo{
    name:string,
    id:string,
    currentRound:string
}
// Under certain conditions (a full page refresh, for example) the component can load multiple times in quick succession,
// which means that the state won't necessarily be cleared in time for the data to be loaded, which means that we'll get a
// log of repeat data (not to mention unnecessary database calls). This variable is set to true once it's clear the first time.
let cleared=false;
export default function GameList(props:any){
    const [games, setGames]=useState<gameInfo[]>([]);
    
    const loadGameData=useCallback((token, id)=>{
        console.info("%cLoading game data","color:green")
        console.log(games.length)

        if(games.length>0) console.log("No need to get player info, because games.length is ",games.length)
        else API.getSpecificPlayer(id)
        .then((userData=>{              
            let gameIds=userData.data.Items[0].gameIds;
            console.log("gameIDs:", gameIds.length )
            for(const id of gameIds){
                API.getSpecificGame(token, id)
                .then((gameData=>{
                    let info=gameData.data.Items[0];                        
                    let anotherGame:gameInfo={
                        name:info.title,
                        id:id,
                        currentRound:info.rounds[info.currentRound]
                    }
                    
                    console.log("Setting! ",games.length)
                    setGames(games=>[...games, anotherGame])
                }))
                .catch(error=>{                        
                    console.error(error);
                });
            }
        }))
        .catch(error=>{
            console.error(error);
        });
    },[]);

     // State is preserved on component reload, so we need to clear it every time we load the list of games,
    // otherwise it just continually adds the same games to the list. It takes a little time to run setGames,
    // though, so we need to be sure it's done before we carry on.
    useEffect(()=>{
        const clearState=async ()=>{
            await setGames([]);
            cleared=true;
            if(props.user.attributes) loadGameData(props.user.signInUserSession.accessToken.jwtToken, props.user.attributes.sub);
        }
        // See above for more info on the cleared variable.
        if(!cleared) clearState();
    },[props.user]);

   

    return(

        <div>
            <p><b>Your Games</b></p>
            <ul>
                {
                    games.length ? games.map(
                        (game:gameInfo)=>(<li key={game.id}><a href={game.id}>{game.name}</a>: Round {game.currentRound}</li>)
                    ) : <li>Loading</li>
                }
            </ul>
        </div>
    );
}