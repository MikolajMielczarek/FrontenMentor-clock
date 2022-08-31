import { useFetchForTime } from "../../hooks/useFetchForTime";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useMediaPredicate } from "react-media-hook";

//jpg and svg
import sunIcon from '../../assets/desktop/icon-sun.svg';
import moonIcon from '../../assets/desktop/icon-moon.svg';
import moreBtn from '../../assets/desktop/icon-arrow-down.svg';
import lessBtn from '../../assets/desktop/icon-arrow-up.svg';
import daytime from '../../assets/desktop/bg-image-daytime.jpg';
import nighttime from '../../assets/desktop/bg-image-nighttime.jpg';
import daytimeTablet from '../../assets/tablet/bg-image-daytime.jpg';
import nighttimeTablet from '../../assets/tablet/bg-image-nighttime.jpg';
import daytimeMobile from '../../assets/mobile/bg-image-daytime.jpg';
import nighttimeMobile from '../../assets/mobile/bg-image-nighttime.jpg';


export default function DateAll(props) {

  const maxWidth480 = useMediaPredicate("(max-width: 480px)")
  const maxWidth768 = useMediaPredicate("(max-width: 768px)") 


  const [isHover, setIsHover] = useState(false)

  const [change, setChange] = useState(false)

  const urlTime = "http://worldtimeapi.org/api/ip/"
  const {data: times} = useFetchForTime(urlTime)

  const curentos = () => {
    let timesData = []
    let timeCurrent = []
    let finalTime = ''
    let greeting = ''
    let img = ''

    if(times){
    const timeProps = new Date(times.datetime)
    const timePropsHours = timeProps.getHours()
    const timePropsMin = timeProps.getMinutes()
    //in the case we need later also for sec
    const timePropsSec = timeProps.getSeconds()

    if(timePropsHours < 10){
      timeCurrent[0] = [`0${timePropsHours}`]
    }else{
      timeCurrent[0] = [timePropsHours]
    }
    
    if(timePropsMin < 10){
      timeCurrent[1] = [`0${timePropsMin}`]
    }else{
      timeCurrent[1] = [timePropsMin]
    }
    
    if(timePropsSec < 10){
      timeCurrent[2] = [`0${timePropsSec}`]
    }else{
      timeCurrent[2] = [timePropsSec]
    }

    finalTime = `${timeCurrent[0]}:${timeCurrent[1]}`
    
    if(timeCurrent[0] >= 5 && timeCurrent[0] < 12){
      greeting = 'Good morning'
      img = sunIcon

    }else if(timeCurrent[0] >= 12 && timeCurrent[0] < 18){
      greeting = 'Good afternoon'
      img = sunIcon
    }else {
      greeting = 'Good evening'
      img = moonIcon
    }
    
    timesData[0] = finalTime;
    timesData[1] = greeting;
    timesData[2] = img;
    timesData[3] = times.client_ip;
    timesData[4] = times.abbreviation;

  }
    return timesData
}

const currentosValue = curentos()
const timeCurrent = currentosValue[0]
const greeting = currentosValue[1]
const img = currentosValue[2]
const ipAddres = currentosValue[3]
const timezoneShort = currentosValue[4]

const urlWithIp = `http://ipwho.is/${ipAddres}`

const {data: zone} = useFetch(urlWithIp);

let imgBgc = ''

if(img === '/static/media/icon-sun.cb7a2aac3be7bf88b4cf17bd97d62fd2.svg'){
  if(maxWidth480 && maxWidth768){
    imgBgc = daytimeMobile
  }else if(!maxWidth480 && maxWidth768){
    imgBgc = daytimeTablet
  }else{
    imgBgc = daytime
  }

  props.changeBgc(imgBgc)
}else if(img === '/static/media/icon-moon.83b9f0dbe53bfaab2e1c6dc344545e9c.svg'){
  if(maxWidth480 && maxWidth768){
    imgBgc = nighttimeMobile
  }else if(!maxWidth480 && maxWidth768){
    imgBgc = nighttimeTablet
  }else{
    imgBgc = nighttime
  }

  props.changeBgc(imgBgc)
}

const handleClickBtn = () => {
  setIsHover(false)
  if(change === false){
    setChange(true)
    props.changeDisplay(true)
  } else {
    setChange(false)
    props.changeDisplay(false)
  }
}

const handleMouseEnter = () => {
  setIsHover(true)
}

const handleMouseLeave = () => {
  setIsHover(false)
}

let topStart = ''
let topAfter = ''

if(maxWidth480){
  topStart = '4%'
  topAfter = '-38%'
}else if(!maxWidth480 && maxWidth768){
  topStart = '2%'
  topAfter = '-38%'
}else{
  topStart = '2%'
  topAfter = '-42%'
}


  return (
  <>

    <section className="container-page__time time-section"
      style={(!change && {top:`${topStart}`}) || (change && {top:`${topAfter}`})}>

      <div className="time-section__greeting">
                  
        <div
          className="time-section__greeting-img-container">
            <img
              className="time-section__greeting-img-container-img" src={img} alt="sun icon" />
        </div>

        <div
          className="time-section__greeting-hello-container">
            <p
              className="time-section__greeting-hello-container-hello">
              {times && `${greeting}, it's currently`}
              {!times && `good morning, it's currently`}
            </p>
        </div>

      </div>

      <div className="time-section__time">

        <div className="time-section__time-current-container">
            <h1 className="time-section__time-current-container-current">
              {times && timeCurrent}
              {!times && '11:37'}</h1>
        </div>

        <div className="time-section__time-bst-container">
            <p className="time-section__time-bst-container-bst">
            {times && timezoneShort}
            {!times && 'bst'}
             </p>
        </div> 

      </div>

      <div className="time-section__location-and-btn">

        <div className="time-section__location">

          {!zone && <p className="time-section__location-city">in london,</p>}
          {zone && <p className="time-section__location-city">in {zone.city},</p>}

          {!zone && <p className="time-section__location-country">uk</p>}
          {zone && <p className="time-section__location-country">{zone.country_code}</p>}

        </div>
        
        <div className="time-section__button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>

          {!change && <p className="time-section__button-paragraph"
            style={(!isHover && {color:'rgba(0, 0, 0, 1)'}) || (isHover && {color:'rgba(153, 153, 153, 1)'})}>
              more
          </p>}
          {change && <p className="time-section__button-paragraph"
          style={(!isHover && {color:'rgba(0, 0, 0, 1)'}) || (isHover && {color:'rgba(153, 153, 153, 1)'})}>
              less
          </p>}

          <button className="time-section__button-btn"
            style={(!isHover && {background:'rgb(48, 48, 48)'}) || (isHover && {background:'rgba(153, 153, 153, 1)'})}
            onClick={() => {
              handleClickBtn()
            }}>

            {!change && <img className={`"time-section__button-btn-img"`} src={moreBtn} alt="arrow down icon" />}
            {change && <img className={`"time-section__button-btn-img"`} src={lessBtn} alt="arrow up icon" />}

          </button>

        </div>

      </div>

    </section>

  </>
  )
}
