import {useEffect, useState} from "react";
import API from "../utils/API";

export default function PlayerList(props:any){
    const [players, setPlayers] = useState([{name:"", email:"", id:""}])
    
    useEffect(()=>{
        // Once the props have fully loaded (and the id list is longer than 0—games are guaranteed to have at least one player)
        // we call update player, which goes through all of the ids and makes an API call to get infor about each one
        // This is stored in the player state, and displayed under "Current Players"
        async function updatePlayerList(ids:string[]){
            let tempArray=[{name:"", email:"", id:""}];
            for(const id of ids){
                if(id){
                    let newP=await getPlayerInfo(id);
                    if(newP) {tempArray.push(newP);}
                }
            } 
            setPlayers(tempArray);
        }
        updatePlayerList(props.ids);
    },[props.ids]); 

    async function getPlayerInfo(id:string){
        let newPlayer=null;
        await API.getSpecificPlayer(id)  
        .then((data)=>{
            newPlayer={
                name:data.data.Items[0].userName,
                email:"mailto://"+data.data.Items[0].userEmail,
                id:id
            }
            return newPlayer;
        }) 
        .catch((err)=>{
            console.error(err);
        });
        return newPlayer;
    };
    return(    
        <div>
            Current Players:
            <ul>
                {players.map((player:any,i:number)=>(
                    <li className="playerList" key={player.id}><a href={player.email}>{player.name}</a></li>
                ))}
            </ul>
        </div>  //dd
    )
}