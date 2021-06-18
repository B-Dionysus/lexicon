import StyleButton from "../StyleButton"
import {styleButton} from "../../interfaces/style.interfaces"

function addStyle(style:styleButton){

}

export default function StyleBar(props:any){
    const bold:styleButton={
        prefix:"<b>",
        postfix:"</b>",
        iconText:"B",
        callback:addStyle,
    }
    return(
        <div className="styleBar">
            <StyleButton button={bold}/>
        </div>
    )
}