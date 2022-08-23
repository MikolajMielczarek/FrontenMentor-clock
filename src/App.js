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