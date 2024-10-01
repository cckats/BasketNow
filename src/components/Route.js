import NavigationContext from "../context/Navigation"
import { useContext } from "react";

function Route({path,children}){
    const {currentPath} = useContext(NavigationContext);

    if(currentPath===path){
        return children
    }else{
        return null
    }

}

export default Route