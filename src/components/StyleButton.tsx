import {styleButtonProps} from "../interfaces/style.interfaces"
 
export default function StyleButton(props:styleButtonProps){
    // The parent gives us the look of the button and the strings to be added to the beginning and the end once it's clicked.
    // On click, we pass this button information back up to the parent's parent, where there's a callback function to handle it
    return(
        <div className="styleButton" onClick={()=>{props.button.callback(props.button)}}>{props.button.iconText}</div>

    );
}