import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Popup, useMap } from 'react-leaflet';
import './CourtPopup.css'
import { useFetchCourtQuery, useMarkCourtMutation, useAddCourtMutation, useFetchCourtBallersQuery } from '../store'
import { GoChevronDown, GoChevronRight } from "react-icons/go"
import getPlaceName from '../hooks/getPlaceName';
import CheckIn from './CheckIn';
import JoinIn from './JoinIn';

import L from 'leaflet';
import { MdRefresh } from 'react-icons/md';


function CourtPopup({ id, inName, lat, lng }) {
  var color = null
  let content = <div></div>;

  const { data: courtData, error: courtError, isFetching: courtIsFetching, refetch: courtRefetch } = useFetchCourtQuery(id.toString());
  const { data: ballersData, error: ballersError, isFetching: ballersIsFetching, refetch: ballersRefetch } = useFetchCourtBallersQuery(id.toString());
  const [markCourt, markCourtresults] = useMarkCourtMutation();
  const [addCourt, addCourtresults] = useAddCourtMutation();
  const [CheckInOpen, setcheckInOpen] = useState(false)
  const [joinInOpen, setJoinInOpen] = useState(false)
  const [joinGroupId, setJoinGroupId] = useState(null)

  const [name, setName] = useState(inName);

  const getNewPlaceName = (async () => {
    console.log('search name');
    if (!name) {
      setName(await getPlaceName(lat, lng))
    }
  })

  const map = useMap();
  useEffect(() => {
    map.on('popupopen resize', function (e) {
      var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
      px.y -= e.target._popup._container.clientHeight / 2 + 130; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      map.panTo(map.unproject(px), { animate: true }); // pan to new center
      //console.log(px);
    });
  }, [])


  //const elementRef = useRef();
  // useEffect(() => {
  //   if (!elementRef.current) return;
  //   const resizeObserver = new ResizeObserver(() => {
  //     map.panBy(L.point(0,-elementRef.current.clientHeight/2), { animate: false }); 


  //   });
  //   resizeObserver.observe(elementRef.current);
  //   return () => resizeObserver.disconnect(); // clean up 
  // }, [])
  // const [height, setHeight] = useState(0);

  // const measuredRef = useCallback(node => { 
  //   if (node !== null) { 
  //     setHeight(node.getBoundingClientRect().height); 
  //   } }, []);

  //   measuredRef()
  //   console.log(height);
  // const elementRef = useCallback(node => {
  //   if (!node) return;
  //   const resizeObserver = new ResizeObserver(() => {
  //     map.panBy(L.point(0, -elementRef.current.clientHeight / 2), { animate: false });
  //     console.log(elementRef.current.clientHeight);
  //   });
  //   resizeObserver.observe(node);
  // }, []);


  const handleMarkClick = (() => {
    let court = {
      id: id.toString(),
      markedFull: new Date().toJSON(),
      name,
      lat,
      lng
    }
    if (courtData[0]) {
      markCourt(court);
    }
    else {
      addCourt(court);
    }
  })

 



  if (courtIsFetching || ballersIsFetching) {
    content = <div>loading</div>
  }
  else if (courtError || ballersError) {
    content = <div> ERROR fetching data</div>
  }
  else {

    //console.log(courtData);

    let court
    if (courtData[0]) {
      court = courtData[0]
      if (court.name && !name) {
        setName(court.name)
      }
    } else {
      getNewPlaceName();
      court = {
        markedFull: null,
      }
    }

    let ballers
    //console.log(ballersData);
    if (ballersData[0]) {
      ballers = ballersData
      //console.log(ballers);

    }
    else {
      ballers = {
        players: " Unknown",
        playersNeeded: " Unknown",
        timeFrom: null,
        timeTo: null
      }
    }


    let status = 'Empty'

    if (ballers.players > 1 && ballers.players < 10 && !court.markedFull) {
      status = "Maybe Available";
      color = true
    }
    else if (ballers.players > 10 || court.markedFull) {
      status = 'Full'
      color = false
    }

    var timeMarked = null
    var elapsed = null
    var day = null
    if (court.markedFull) {
      timeMarked = new Date(court.markedFull);
      elapsed = new Date(Date.now() - timeMarked)
      day = 86400000
    }
    //if(typeof elementRef.current !== "undefined"){
    //  console.log(elementRef.current.clientHeight);}
    content =
      <div className='text-white flex flex-col '>
        <h1 className='font-bold text-xl text-wrap pb-3 px-3 text-center'>{name ? name : "Basketball Court"}</h1>
        <div>
          {court.markedFull && elapsed <= day
            ? <h2 className='mb-3 text-center'>Marked <span className='font-bold text-l my-2'>{status}</span>: {elapsed.getUTCHours() ? `${elapsed.getUTCHours()}hr` : ''} {elapsed.getMinutes()}min ago
            </h2> : ''}
          <div className='groups max-h-[225px] overflow-y-scroll mb-3 scroll-p-0 flex flex-col ml-2'>
            {ballers[0] ? ballers.map((group, index) => {
              return joinInOpen ?
                parseInt(group.playersNeeded) && joinGroupId == group.id ? <JoinIn setJoinInOpen={setJoinInOpen} group={group} /> : <></>
                : parseInt(group.playersNeeded) ? <button
                  onClick={() => { setJoinInOpen(true); setJoinGroupId(group.id) }}
                  className='text-left p-1 mt-3 grow mr-1 flex justify-between items-center cursor-pointer border border-orange-500 rounded hover:bg-orange-500 hover:text-black duration-100'>
                  <div>
                    {group.name ? <b>{group.name}</b> : <b>Group {index + 1} </b>}<br></br>
                    <span>Players: {group.players} <br></br>Need:{group.playersNeeded}</span>
                  </div>
                  <b>{group.timeFrom}-{group.timeTo}<GoChevronRight className='inline text-2xl mb-1' /></b>
                </button>
                  : <div
                    className='text-left p-1 mt-3 grow mr-1 flex justify-between items-center border border-orange-500 rounded'>
                    <div>
                      {group.name ? <b>{group.name}</b> : <b>Group {index + 1} </b>}<br></br>
                      <span>Players: {group.players} <br></br>Need:{group.playersNeeded}</span>
                    </div>
                    <b>{group.timeFrom}-{group.timeTo}</b>
                  </div>
            }) : <></>}
          </div>
          {!joinInOpen ? <div className='flex justify-between gap-5'>
            <button onClick={handleMarkClick} className='font-bold rounded border p-2 border-orange-500'>Mark Full</button>
            <button className=' font-bold rounded border p-2 border-orange-500' onClick={() => setcheckInOpen(true)}>Check-in</button>
          </div> : <></>}
        </div>

      </div>
  }

  return (
    <div className='min-w-52'>

      {CheckInOpen ? <CheckIn courtId={id} setcheckInOpen={setcheckInOpen} /> :
        <div>
          <button className="m-1 p-1 text-3xl absolute left-0 top-0 text-orange-500"
            onClick={() => { courtRefetch(); ballersRefetch(); }}><MdRefresh />
          </button>
          {content}
        </div>}
    </div>
  );
}

export default CourtPopup;
