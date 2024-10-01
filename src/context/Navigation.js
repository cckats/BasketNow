import { createContext, useEffect, useState } from "react";

    const NavigationContext = createContext()

    function NavigationProvider ({children}){

        const [currentPath,setcurrentPath] = useState(window.location.pathname)

        useEffect(()=>{
            const handler = () =>{
                setcurrentPath(window.location.pathname);
            }

            window.addEventListener('popstate',handler)

            return()=>{
                window.removeEventListener('popstate',handler)
            }

        },[])

        const Navigate=(pathTo)=>{
            window.history.pushState({},'',pathTo)
            setcurrentPath(pathTo);
        }

        return(
            <NavigationContext.Provider value={{Navigate,currentPath}}>
                {children}
            </NavigationContext.Provider>
        );
    };


    export {NavigationProvider};
    export default NavigationContext;