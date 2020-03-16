

import React from 'react';
import moment from 'moment';
import './events.css' ;
import Card from '../Card'

function Events({allEvents}) {
    // console.log(allEvents,'allEvents from EVENTs component')

    let friendlyTime,eventId,eventName,price1,share1,xchg1,price2,share2,xchg2

    if(allEvents.length >0) {
        let lastEvent=allEvents.slice(-1)[0]
        // console.log(lastEvent,'lastEvent')
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

 let shootData =[
   {title:'Replay Clock',body:friendlyTime},
   {title:'Event',body:eventId},
   {title:'Name',body:eventName},
   {title:'Exchange 1',body:xchg1},
   {title:'Price 1',body:price1},
   {title:'Share 1',body:share1},
   {title:'Exchange 1',body:xchg1},
   {title:'Price 2',body:price2},
   {title:'Share 2',body:share2},
   {title:'Exchange 2',body:xchg2},

 ]   
   
  return (
    <div className='events-container'>
    

  {shootData.map(i=>{
    const {title,body} =i
    return <Card 
    title={title}
    body={body}
    />
  })}


    </div>
  );
}

export default Events;
