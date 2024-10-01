
import Route from "./Route";
import { useContext, useState } from 'react';
import NavigationContext from '../context/Navigation';

function Header({ }) {

    const { Navigate, currentPath } = useContext(NavigationContext);

    return (
            <header className="App-header flex w-full justify-between items-center max-w-7xl pt-3">
                <div className="font-bold text-3xl pl-3"><span className="italic text-orange-500">Basket...</span>Now!!!</div>
                <div className='w-max'>
                    <button className="button p-2 text-center text-xl" onClick={()=>Navigate('/login')} >Login</button>
                    <button className="button p-2 mx-2  text-xl" onClick={()=>Navigate('/register')}>Register</button>
                    {/* <button className="button p-2  text-xl" onClick={()=>Navigate('/guest')}>Guest</button> */}
                </div>
            </header>
    )

}

export default Header