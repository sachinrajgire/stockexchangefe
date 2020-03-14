

import React from 'react';

function Events({allEvents}) {

    if(!allEvents || allEvents.length ===0 ){
        return null
    }
   
    let lastEvent={}
     lastEvent =allEvents.pop() 
    
    const {event,time} =lastEvent
    console.log(lastEvent,'lastEvent')
const [eventId,unixEpoch,eventName,price1,share1,xchg1,price2,share2,xchg2] =event

  return (
    <div className={{style:'flex'}}>

  <div>Event:{lastEvent.event[2]}</div>

    </div>
  );
}

export default Events;
