interface Game{
    id?:string;
    title?: String;
    description?: String;
    image?: String;
    creatorId?:String;
    rounds:Array<String>;
}
interface g{
    gameInfo:Game
}
export default function CreatePlayer(props:g){
    const {gameInfo}=props;
return(
    <>
        <p className="gameHeading">Title: <i>{gameInfo.title}</i></p>
        <p className="gameHeading">Description: {gameInfo.description}</p>
        <p>Lexicon is a collaborative world-building game, in which each player takes the role of an academic author, 
        working together to compile a reference book about a specific topic. The book will be written over a number of
        rounds, and as the game continues we will learn more about the world as we go!</p>
        <p>The title of this particular reference book is, "{gameInfo.title}," so everyone will be creating fictional 
        entries that relate to that. The first round will be {gameInfo.rounds[0]}, so everyone will write a short (~200 word) 
        entry that begins with {gameInfo.rounds[0]} (not counting words like "A" or "The"). In these entries, everyone will also 
        mention further entries in the book—ones that do not begin with {gameInfo.rounds[0]} and which will remain undefined for the moment.</p>
        <p>In the next round, {gameInfo.rounds[1]}, everyone will first claim any entries written by other people in previous 
        rounds, and will write that entry, finally giving context to what was previously a meaningless word. These entries 
        will also reference future entries, and so on until the entire book is completed and we have learned all
        about <i>{gameInfo.description}</i>.
        </p>
    </>)
} 