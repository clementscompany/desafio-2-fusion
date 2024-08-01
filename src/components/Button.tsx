import React from "react";
interface PropsButton{
    value:string;
    claName:string;
    onClick: ()=> void;
}
const Button : React.FC<PropsButton> = ({ value, onClick, claName}) =>{
    return(
        <button onClick={onClick} className={claName} >
            {value}
        </button>
    );
}
export default Button;

