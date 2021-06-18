
interface gameInfo{
    title:string,
    id:string,
    currentRound:string,
    url?:string,
    logo?:string,
}
export default function CurrentGameInfo(props:{game:gameInfo}){

    return(
        <div >
            <div>
                <img className="logo" src={props.game.logo} alt="Game logo"/>
            </div>
            <div className="gameInfo">
                <span>Lexicon: {props.game.title}</span><span></span><span>Current Round: {props.game.currentRound}</span>
            </div>
        </div>
    );
}