

import React from 'react';
import moment from 'moment';
import './events.css'

function Events({allEvents}) {
    // console.log(allEvents,'allEvents from EVENTs component')

    let friendlyTime,eventId,eventName,price1,share1,xchg1,price2,share2,xchg2

    if(allEvents.length >0) {
        let lastEvent=allEvents.slice(-1)[0]
        console.log(lastEvent,'lastEvent')
        eventId =lastEvent.event[0]
        eventName =lastEvent.event[2]
        price1 =lastEvent.event[3]
        share1 =lastEvent.event[4]
        xchg1 =lastEvent.event[5]
        price2 =lastEvent.event[6]
        share2 =lastEvent.event[7]
        xchg2 =lastEvent.event[8]
        friendlyTime =moment.unix(lastEvent.event[1]/1000).format("HH:mm:ss.SSS" )
    }
   
  return (
    <div className='events-container'>
 
  <div>Replay Clock:{friendlyTime}</div>
  <div>Event # :{eventId}</div>
   <div>Event:{eventName}</div>
  <div>Exch1 :{xchg1}</div>
  <div>Price 1:{price1}</div>
  <div>Shares1:{share1}</div>
  <div>Exch2 :{xchg2}</div>
  <div>Price 2:{price2}</div>
  <div>Shares2:{share2}</div> 
  

    </div>
  );
}

export default Events;
