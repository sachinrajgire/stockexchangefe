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
let url =  `https://sse-server-p.herokuapp.com`
// let url =  `http://127.0.0.1:3333`


  useEffect(() => {
    // let source
if(start ==='start'  ) {
 source = new EventSource(`${url}/start`);  
  source.onmessage = function(e) {

setAllEvents((prevState)=>{
 let parseddata= JSON.parse(e.data)
  if(typeof parseddata !== 'string') {
    return [parseddata]
  }
})
// console.log(JSON.parse(e.data),'E.DATA')
}
}  
;

if(start ==='stop') {
  source.close()
  
 fetch(`${url}/stop`).then(response => response.text())
            .then(data => console.log(data))
            .catch(err => {
              console.log(err)
            })
}
if(start ==='reset') {
  source.close()
 fetch(`${url}/reset`).then(response => response.text())
            .then(data => console.log(data))
            .catch(err => {
              console.log(err)
            })
}
}, [start])

useEffect(()=>{
  if(chosenSpeed !=='1x'){
  // let  source = new EventSource(`${url}`);  
    // source.close()
    fetch(`${url}/set?speed=${chosenSpeed}`).then(response => response.text())
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
      <div style={{margin:'20px'}}>
        <strong>Current Status :</strong> {getCurrentStatus()}
      </div>
      <div className='clock-container'>
      
      <div><Button variant={"contained"} color="primary" onClick={()=>handleStartAction()}>{handleStartLabel()} </Button></div>
      <div> <Button variant="contained" color="primary" onClick={()=>handleResetAction()}>Reset </Button></div>
      <div>
      Speed
      <div className='buttons'>
      <div><Button variant="contained" color="secondary" disabled={start === 'start'} onClick={()=>handleSpeed('0.1')}>0.5px </Button></div>
      <div><Button variant="contained" color="secondary" disabled={start === 'start'} onClick={()=>handleSpeed('5')}>5px </Button></div>
      <div><Button variant="contained" color="secondary" disabled={start === 'start'} onClick={()=>handleSpeed('10')}>10px </Button></div>
      </div>
      </div>
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
