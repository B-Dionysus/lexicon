export default function PlayerList(props:any){

    return(    
        <div>
            Current Players:
            <ul>
                {props.ids.map((id:string,i:number)=>(
                    <li className="playerList" key={i}>ID: {id}</li>
                ))}
            </ul>
        </div>
    )
}