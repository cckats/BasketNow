
import ReactDom from "react-dom"
import { useEffect, useState } from "react"

function Modal({message,title,onDismiss,children}) {
    const [domReady, setDomReady] = useState(false)

    // useEffect(()=>{
    //     document.body.classList.add('overflow-hidden')

    //     return()=>{
    //         document.body.classList.remove('overflow-hidden')
    //     }
    // },[])
    useEffect(() => {
        setDomReady(true)
      }, [])
    

    return domReady ? ReactDom.createPortal(
    <div>
        <div className="background fixed inset-0 bg-black bg-opacity-40" onClick={()=>onDismiss(false)}></div>
        <div className="modal min-w-max h-auto min-h-[220px] fixed w-auto flex flex-col items-center justify-between p-4 inset-60 bg-white">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-xl">{message}</p>
            <div className="buttons w-full flex justify-evenly">
                {children}
            </div>
        </div>
    </div>, document.querySelector('.modal-container')):null
}

export default Modal