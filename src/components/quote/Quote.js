import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import refresh from '../../assets/desktop/icon-refresh.svg';


export default function Quote(props) {

  const urlListOfQuotes = 'https://programming-quotes-api.herokuapp.com/Quotes?count=0';
  const {data: dataListOfQuotes} = useFetch(urlListOfQuotes);

  const randomFromList = (num=dataListOfQuotes.length) =>{
    return (Math.floor(Math.random() * num))
  }

  const [url, setUrl] = useState('https://programming-quotes-api.herokuapp.com/Quotes/random');
  const {data: quotes} = useFetch(url);

  const change = props.display;

  console.log(change)

  return (
  <>
    <section className="container-page__quote quote-section" style={(!change && {top:'7%'}) || (change && {top:'-500%'})}>

      <div className="quote-section__quote-container">

        <p className="quote-section__quote-container-quote">
          {quotes && `"${quotes.en}"`}
        </p>

        <p className="quote-section__quote-container-author">
          {quotes && quotes.author}
          
        </p>

      </div>
      <div
        className="quote-section__change-container">

        <button onClick={() => {
          const random = randomFromList();
          const idQuote = dataListOfQuotes[random].id;
          setUrl(`https://programming-quotes-api.herokuapp.com/Quotes/${idQuote}`);
          }}className="quote-section__change-container-btn">
                <img className="quote-section__change-container-btn-img" src={refresh} alt="icon refresh" />
        </button>
      
      </div>
    </section>
  </>
    
  )
}






