interface styleButton{
    prefix:string,
    postfix:string,
    callback:Function,
    iconText:string,
    altText:string,
}
interface styleButtonProps{
    button:styleButton
}
export type{
    styleButton,
    styleButtonProps,
} 