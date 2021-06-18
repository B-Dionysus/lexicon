
import {gameInfo} from "../../interfaces/player.interfaces"
export default function CurrentGameInfo(props:{game:gameInfo}){

    return(
        <div >
            <div>
                <img className="logo" src={props.game.logo} alt="Game logo"/>
            </div>
            <div className="gameInfo">
                <span>Lexicon: {props.game.title}</span><span></span><span>Round: {props.game.currentRound}</span>
            </div>
        </div>
    );
}