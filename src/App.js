import { useState } from 'react';
import './css/styles.css'

import daytime from './assets/desktop/bg-image-daytime.jpg';


import DateAll from './components/dateandlocation/DateAll';
import Quote from './components/quote/Quote';
import Expand from './components/expand/Expand';

function App() {

const [imgBgc, setImgBgc] = useState(daytime)

const [display, setDispaly] = useState(false)
const [display2, setDispaly2] = useState(false)

const changeBgc = (imgBgc) => {
  setImgBgc(imgBgc)
}

const changeDisplay = (change) => {

  setDispaly(change)

}

const myStyle = {
  backgroundImage: `url(${imgBgc})`,
  top:(!display && '-5px') || (display && '-75px')
}


  return (
    <>
    
      <div className='bgc-color'>
      </div>

      <div className='bgc-img'
        style = {myStyle} >
      </div>

      <div className="container-page" 
        >

        <Quote display = {display} />
        
        <DateAll changeBgc={changeBgc} changeDisplay = {changeDisplay}/>

        <Expand display = {display} />
        
      </div>
      
    </>
  );
}

export default App;


/*


{{  backgroundImage: `url(${imgBgc})` } (!display && {top:'-5px'}) || (display && {top:'-50px'})}


/*const urlDate = 'https://api.ipbase.com/v2/info?apikey=qf3GXs6I5B6XRudirVEYuKd6350gdiL3e2BpeuoQ&ip/:ipv4';

const {data: date} = useFetch(urlDate);
*/
/*
const [urlTime, setUrlTime] = useState("http://worldtimeapi.org/api/ip/77.254.248.231");

const {data: times} = useFetch(urlTime);

const [dateObject, setDateObject] = useState({
  client_ip: "77.254.248.231",
  datetime: "2022-08-16T10:58:15.463709+02:00",
  day_of_week: 2,
  day_of_year: 228,
  timezone: "Europe/Warsaw",
  week_number: 33
});

/*const dateObjectFunction = () => {
  setDateObject({
    client_ip: times.client_ip,
    datetime: times.datetime,
    day_of_week: times.day_of_week,
    day_of_year: times.day_of_year,
    timezone: times.timezone,
    week_number: times.week_number
  })
}

if(times){
  dateObjectFunction()
}
*/

//console.log(date);

//console.log(times);
