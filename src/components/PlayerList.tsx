import {useEffect, useState} from "react";
import API from "../utils/API";
interface playerInfo{
    name:string,
    email:string,
    id:string,
}
export default function PlayerList(props:any){
    const [players, setPlayers] = useState<playerInfo[]>([])
    // Once the props have fully loaded (games are guaranteed to have at least one player)
    // we call update player, which goes through all of the ids and makes an API call to get info about each one
    // This is stored in the player state, and displayed under "Current Players"
    useEffect(()=>{
        async function loadPlayerData(){
            console.log("props.ids",props.ids)
            let tempArray:playerInfo[]=[];
            for(const id of props.ids){
                let data=await API.getSpecificPlayer(id);
                let newPlayer:playerInfo={
                    name:data.data.Items[0].userName,
                    email:"mailto://"+data.data.Items[0].userEmail,
                    id:id
                }
                tempArray.push(newPlayer);
            }
            setPlayers(tempArray);
        }
        if(props.ids.length>0) loadPlayerData();
    },[props.ids]); 
    return(    
        <div>
            Current Players:
            <ul>
                {players.map((player:playerInfo,i:number)=>(
                    <li className="playerList" key={player.id}><a href={player.email}>{player.name}</a></li>
                ))}
            </ul>
        </div> 
    )
}