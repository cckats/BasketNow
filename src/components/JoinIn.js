import { useState } from "react"
import { useJoinBallersMutation } from "../store"
import { GoChevronLeft } from "react-icons/go"

function JoinIn({ group, setJoinInOpen }) {
    const [JoinBallers, results] = useJoinBallersMutation()
    const [playersJoin, setPlayersJoin] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playersJoin > parseInt(group.playersNeeded)) {
            return
        }
        let ballers = {
            id: group.id,
            name: group.name,
            players: `${parseInt(group.players) + parseInt(playersJoin)}`,
            playersNeeded: `${parseInt(group.playersNeeded) - parseInt(playersJoin)}`,
            timeFrom: group.timeFrom,
            timeTo: group.timeTo,
            date: group.date,
            courtId: group.courtId
        }
        setJoinInOpen(false);
        JoinBallers(ballers)
    }

    return (<>
        <button className="p-1 pr-2 mb-2 col-span-1 flex justify-start items-center rounded border border-orange-500"
            onClick={() => setJoinInOpen(false)}>
            <GoChevronLeft className="inline text-xl" />Back
        </button>
        <form onSubmit={handleSubmit} className="text-white text-l grid grid-rows-3 grid-cols-2 gap-3 pb-2 p-1">
            {group.name ? <b className=" font-bold text-xl flex items-end ">{group.name}</b> : <></>}
            <div className=" col-span-2 grid grid-cols-2">
                <span>Players: {group.players} <br></br>Needed: {group.playersNeeded}</span>
                <label className=" font-bold text-l flex items-center justify-center">{group.timeFrom}-{group.timeTo}</label>
            </div>
            <label className=" grid col-span-1 p-1 font-bold text-l flex self-center"> Players</label>
            <input className="grid p-1 text-l rounded border border-orange-500" type="number"
                onChange={(e) => { setPlayersJoin(e.target.value) }} value={playersJoin} min={1} max={parseInt(group.playersNeeded)}></input>
            <button className=' col-span-2 font-bold rounded border p-2 border-orange-500'
                type="submit">Join-in</button>
        </form></>
    )


}

export default JoinIn