import { useContext, useState } from 'react';
import './Account.css'
import Modal from './modal';
import ReactDom from "react-dom"
import NavigationContext from '../context/Navigation';

function Account({ route }) {

    const { Navigate, currentPath } = useContext(NavigationContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = (() => {
        
        

    })

    const handleChange = ((event) => {
        
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;
            case 'location':
                setLocation(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
        }
    })

    const handleform = ((event) => {
        event.preventDefault();
    })
    

    let outForm
    switch (route) {
        case 'login':
            outForm = <form className='form' onSubmit={handleform}>
                <div>
                    <label> Email: </label>
                    <input type="text" id="email" value={email} onChange={handleChange} name="email" />
                </div>
                <div>
                    <label> Password: </label>
                    <input type="text" id="password" value={"*".repeat(password.length)} onChange={handleChange} name="password" />
                </div>
                <input type="submit" value="Submit" onClick={handleClick}></input>
            </form>
            break;

        case 'guest':
            outForm = <form className='form' onSubmit={handleform}>
                <div>
                    <label> Name: </label>
                    <input type="text" id="name"  value={name} onChange={handleChange} name="name" />
                </div>
                <div>
                    <label> Location: </label>
                    <input type="text" id="location" value={location}  onChange={handleChange} name="location" />
                </div>
                <input type="submit" value="Submit" onClick={handleClick}></input>
            </form>
            break;

        case 'register':
            outForm = <form className='form' onSubmit={handleform}>
                <div>
                    <label> Name: </label>
                    <input type="text" id="name" value={name} onChange={handleChange} name="name" />
                </div>
                <div>
                    <label> Location: </label>
                    <input type="text" id="location"  value={location} onChange={handleChange} name="location" />
                </div>
                <div>
                    <label> Email: </label>
                    <input type="text" id="email"  value={email} onChange={handleChange} name="email" />
                </div>
                <div>
                    <label> Password: </label>
                    <input type="text" id="password"  value={"*".repeat(password.length)} onChange={handleChange} name="password" />
                </div>
                <input type="submit" value="Submit" onClick={handleClick}></input>
            </form>
            break;

        default:
            outForm = <div></div>
            break;

    }

    return ReactDom.createPortal(
        <div className="Account">
            {/* <Modal onDismiss={() => Navigate('/')}> */}
            
            <div className="background fixed inset-0 bg-black bg-opacity-40" ></div>
            <div className="modal rounded-3xl bg-gray-900 border-2 border-orange-500 h-max fixed w-max flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center p-4 bg-gray-800">
                <button className="button border rounded p-2 mb-3 text-xl" onClick={() => Navigate('/')} > Back </button>
                {outForm}
            </div>
        </div>, document.querySelector('.modal-container'))

}

export default Account