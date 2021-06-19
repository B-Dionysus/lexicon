interface gameInfo{
    title:string,
    id:string,
    currentRound:string,
    url?:string
    logo?:string,
}


interface unclaimedEntry{
    title:string;
    status:string;
}
interface unclaimedEntryProps{
    title:string,
    unclaimedEntries:unclaimedEntry[],
    removeLinkedEntry:Function,
}
export type {
    gameInfo, unclaimedEntry, unclaimedEntryProps
}
