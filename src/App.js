import React,{useEffect,useState} from 'react';
import './App.css';
import Events from './Events' ;
import OrderBook from './OrderBook' ;
import Button from '@material-ui/core/Button';



let source ;
function App() {


  const [allEvents,setAllEvents] = useState([])
  const [start,setStart] = useState("")
  const [chosenSpeed,setchosenSpeed] = useState('1x')


  useEffect(() => {
    // let source
if(start ==='start'  ) {
 source = new EventSource('http://127.0.0.1:3333/start');  
  source.onmessage = function(e) {
setAllEvents((prevState)=>{
return [...prevState,JSON.parse(e.data)]
})
// console.log(JSON.parse(e.data),'E.DATA')
}
}  
;

if(start ==='stop') {
  source.close()
  
 fetch('http://127.0.0.1:3333/stop').then(response => response.text())
            .then(data => console.log(data))
            .catch(err => {
              console.log(err)
            })
}
if(start ==='reset') {
  source.close()
 fetch('http://127.0.0.1:3333/reset').then(response => response.text())
            .then(data => console.log(data))
            .catch(err => {
              console.log(err)
            })
}
}, [start])

useEffect(()=>{
  if(chosenSpeed !=='1x'){
  let  source = new EventSource('http://127.0.0.1:3333/start');  
    source.close()
    fetch(`http://127.0.0.1:3333/set?speed=${chosenSpeed}`).then(response => response.text())
               .then(data => console.log(data))
               .catch(err => {
                 console.log(err)
               })
              }
   
},[chosenSpeed])


  function handleStartLabel() {
    if(start === "") {
      return 'Start'
    }
    if(start === "start") {
      return 'Stop'
    }
    if(start === "stop") {
      return 'Start'
    }
    return 'Start'
  }
  function handleStartAction() {
    if(start === "" || start === "reset" ) {
      return setStart('start')
    }
    if(start === "start") {
      return setStart('stop')
    }
    if(start === "stop") {
      return setStart('start')
    }
   }

  function handleResetAction() {
      setStart('reset')
   }

  function handleSpeed(speed) {
 setchosenSpeed(speed)
   }

  function getCurrentStatus() {
    if(start === "" || start === 'reset' ) {
      return 'Not Started'
    }
    if(start === "start") {
      return "Started ..."
    }
    if(start === "stop") {
      return "Paused..."
    }
    if(start === "reset") {
      return "Paused..."
    }
   }


return (
    <div className="App">
      <div>
        Current Status : {getCurrentStatus()}
      </div>
      <div className='clock-container'>
      
      <div><Button variant={"contained"} color="primary" onClick={()=>handleStartAction()}>{handleStartLabel()} </Button></div>
      <div> <Button variant="contained" color="primary" onClick={()=>handleResetAction()}>Reset </Button></div>
      Speed
      <div><Button variant="contained" color="secondary" disabled={start === 'start'} onClick={()=>handleSpeed('0.1')}>0.5px </Button></div>
      <div><Button variant="contained" color="secondary" disabled={start === 'start'} onClick={()=>handleSpeed('5')}>5px </Button></div>
      <div><Button variant="contained" color="secondary" disabled={start === 'start'} onClick={()=>handleSpeed('10')}>10px </Button></div>
      </div>

    
      <h2>Events </h2>
      <Events
      allEvents={allEvents}
      />
      <OrderBook
      allEvents={allEvents}
      />

    
    </div>
  );
}

export default App;

// {"event":[404,1563197428895,"NBBO",142.79,100,"Q",142.9,300,"N"],
// "time":{"wallClock":2.104,"eventTime":2.101}}

// {"event":[400,1563197428788,"Trade",142.862,500,"D"],"time":{"wal
// lClock":1.999,"eventTime":1.994}}

// {"event":[904,1563197462535,"Bid",142.73,100,"Y"],"time":{"wallCl
// ock":62.324,"eventTime":62.322}}
// {"event":[905,1563197462535,"Ask",142.93,100,"Y"],"time":{"wallCl
// ock":62.325,"eventTime":62.322}}


