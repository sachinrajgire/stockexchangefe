

import React, { useState ,useEffect } from 'react';
import moment from 'moment';
import './orderbook.css' ;
import Card from '../Card'
import Table from '../Table'

function calculateAge(unixdate){
console.log(unixdate,'difffrom function')

  let momentTodayDate =  moment()
  let formattedDate = moment.unix(unixdate/1000)

let diff = moment(formattedDate).diff(momentTodayDate)
console.log(momentTodayDate,'momentTodayDate')
console.log(formattedDate,'formattedDate')
return Math.abs((diff/1000).toPrecision(2))
}



function OrderBook({allEvents}) {

const [bid,setBid] =useState({})
const [ask,setAsk] =useState({})
console.log(bid,'bid')
console.log(ask,'ask')

function bidData(){
  return Object.entries(bid).map(i=>{
    const [exch,currentBid] =i
    let exchString =exch.toString()
    return {
     Age : calculateAge(currentBid[0]),
     Exchange :exchString,
     Shares : currentBid[1],
     Price: currentBid[2],
     
     
    }
  })

}
function askData(){
  return Object.entries(ask).map(i=>{
    const [exch,currentAsk] =i
    let exchString =exch.toString()
    return {
      Price: currentAsk[2],
      Shares : currentAsk[1],
      Exchange :exchString,
      Age : calculateAge(currentAsk[0]),
     
     
    }
  })

}

useEffect(() => {

  if(allEvents.length > 0) {
    let lastEvent =allEvents.slice(-1)[0]
    let eventName =lastEvent.event[2]
    let price =lastEvent.event[4]
    let share =lastEvent.event[3]
    let exch =lastEvent.event[5]
    let copyBid = {...bid}
    let copyAsk = {...ask}
  
  if(eventName === 'Bid'){
    copyBid[exch]=[Date.now(),price,share]
    setBid((prevState)=>{
      return {...prevState,...copyBid}
      })
  }
  if(eventName === 'Ask'){
    copyAsk[exch]=[Date.now(),price,share]
    setAsk((prevState)=>{
      return {...prevState,...copyAsk}
      })
  }
  
}

}, [allEvents])


   return (<div>
    <h2>Order Book </h2>
    <div className='ask-bid-container'>
      <div>

    <h3>Bids</h3>
   <Table
    data ={bidData()}
    />
      </div>
    <div>
    <h3>Asks</h3>
    <Table
    data ={askData()}
    />
    </div>

</div>
  </div>)
}

export default OrderBook;
