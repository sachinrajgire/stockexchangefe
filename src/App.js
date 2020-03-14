import React,{useEffect,useState} from 'react';
import './App.css';
import Events from './Events' ;


let source,tradeEvents ;
function App() {


  const [allEvents,setAllEvents] = useState([])
  const [start,setStart] = useState("")
  const [choosenSpeed,setChoosenSpeed] = useState('1x')


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
  if(choosenSpeed !=='1x'){
  let  source = new EventSource('http://127.0.0.1:3333/start');  
    source.close()
    fetch(`http://127.0.0.1:3333/set?speed=${choosenSpeed}`).then(response => response.text())
               .then(data => console.log(data))
               .catch(err => {
                 console.log(err)
               })
              }
   
},[choosenSpeed])


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
 setChoosenSpeed(speed)
   }


return (
    <div className="App">
      <button onClick={()=>handleStartAction()}>{handleStartLabel()}</button>
      <button onClick={()=>handleResetAction()}>Reset</button>
      <button onClick={()=>setAllEvents([])}>Clear</button>
      <button disabled={start === 'start'} onClick={()=>handleSpeed('0.1')}>0.1x</button>

    

      <Events
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


