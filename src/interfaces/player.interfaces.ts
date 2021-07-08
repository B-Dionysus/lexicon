interface gameInfo{
    title:string,
    id:string,
    roundNum:number, 
    currentRound:string,
    url?:string
    logo?:string,
}
interface linkedEntry{
    title:string;
    entryId?:string; 
    status:string;
}
interface unclaimedEntryProps{
    title:string,
    unclaimedEntries:linkedEntry[],
    removeLinkedEntry:Function,
}
interface databaseEntry{
    id?:string,
    gameId:string, 
    creatorId:string,
    title:string,
    description:string,
    linkedEntries:linkedEntry[];
}
interface editEntryProps{
    setLoading:Function,
    gameInfo:gameInfo,
    entryId:string,
    userInfo:{userId:string, token:string}
    linkedEntries:linkedEntry[], 
    addLinkedEntry:Function,
}
export type {
    gameInfo, linkedEntry, unclaimedEntryProps, databaseEntry, editEntryProps
}