interface gameInfo{
    title:string,
    id:string,
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
    gameInfo:gameInfo,
    userId:string, 
    linkedEntries:linkedEntry[], 
    addLinkedEntry:Function,
}
export type {
    gameInfo, linkedEntry, unclaimedEntryProps, databaseEntry, editEntryProps
}