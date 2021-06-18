import {styleButtonProps} from "../interfaces/style.interfaces"
 
export default function StyleButton(props:styleButtonProps){

    return(
        <div className="styleButton">{props.button.iconText}</div>

    );
}