import './Home.css'
import Account from './Account'
import Route from "./Route";
import { useContext, useState } from 'react';
import NavigationContext from '../context/Navigation';
import Map from './Map.js';

function Home() {

    const { Navigate, currentPath } = useContext(NavigationContext);


    const clickHandler = (pathTo) => {
        Navigate(pathTo);
    }



    return (
        <div className="Main">

            <Route path={`/login`}>
                <Account route={'login'} />
            </Route>
            <Route path={`/register`}>
                <Account route={'register'} />
            </Route>
            <Route path={`/guest`}>
                <Account route={'guest'} />
            </Route>

            <div className='map max-w-7xl'>
                <Map />
            </div>
        </div>
    )

}

export default Home