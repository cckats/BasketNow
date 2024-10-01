import { useState } from "react"
import { useAddBallersMutation } from "../store"
import { GoChevronLeft } from "react-icons/go"

function CheckIn({ courtId, setcheckInOpen }) {
    const [AddBallers, results] = useAddBallersMutation()
    const [groupName, setGroupName] = useState('')
    const [players, setPlayers] = useState(1)
    const [playersNeeded, setPlayersNeeded] = useState(0)
    const [timeFrom, setTimeFrom] = useState(0)
    const [timeTo, setTimeTo] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        var tdate = new Date(Date.now())
        var today = `${tdate.getUTCDate()}${tdate.getUTCMonth()}`
        console.log(today);
        let ballers = {
            name: groupName ? groupName.charAt(0).toUpperCase() + groupName.slice(1) : '',
            players,
            playersNeeded,
            timeFrom,
            timeTo,
            date: today,
            courtId
        }
        setcheckInOpen(false);
        AddBallers(ballers);
    }

    return (<>
        <button className=" text-white p-1 pr-2 flex justify-start items-center rounded border border-orange-500"
            onClick={() => setcheckInOpen(false)}>
            <GoChevronLeft className="inline text-xl" />Back
        </button>
        <form onSubmit={handleSubmit} className="text-white text-l grid grid-rows-3 gap-2 mt-2 p-1">
            <label className=" grid col-span-1 p-1 font-bold text-l flex self-center"> Name:</label>
            <input className="grid p-1 text-l rounded border border-orange-500" type="text" placeholder="No name"
                onChange={(e) => { setGroupName(e.target.value) }} value={groupName} minlength="4" maxlength="10" size="11" ></input>
            <label className=" grid col-span-1 p-1 font-bold text-l flex self-center"> Players</label>
            <input className="grid p-1 text-l rounded border border-orange-500" type="number"
                onChange={(e) => { setPlayers(e.target.value) }} value={players} min={1} max={10}></input>
            <label className="row-span-1 p-1 font-bold text-l flex self-center"> Need Players</label>
            <input className=" p-1 rounded border border-orange-500" type="number"
                onChange={(e) => { setPlayersNeeded(e.target.value) }} value={playersNeeded} placeholder={0} min={0} max={10}></input>

            <label className=" pt-3 col-span-2 row-span-1 text-center font-bold text-xl ">Time</label>
            <label className="p-1 font-bold "> From:</label>
            <input className=" ml-2 p-1 rounded border border-orange-500" type="time"
                onChange={(e) => { setTimeFrom(e.target.value) }} value={timeFrom} required></input>
            <label className="p-1 font-bold"> To:</label>
            <input className=" ml-2 p-1 rounded border border-orange-500" type="time"
                onChange={(e) => { setTimeTo(e.target.value) }} value={timeTo} required ></input>
            <button className=' col-span-2 font-bold rounded border p-2 border-orange-500'
                type="submit">Check-in</button>
        </form>
    </>
    )


}

export default CheckIn