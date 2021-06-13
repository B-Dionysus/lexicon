import "../css/player.css";
import NavBar from "../components/NavBar"
import EditEntry from "../components/player/EditEntry"
interface playProps{
    gamesId:string;
}
export default function Play(props:playProps){


    return(
        <>
        <NavBar />
        <div className="main">
            <h3><span>Title of Game!</span><span>Current Letter</span></h3>
            <div>
                <div className="editEntry"><EditEntry /></div><div className="unclaimed" id="unclaimed">Unclaimed Entries</div>
            </div>
        </div>
        </>
    )
}