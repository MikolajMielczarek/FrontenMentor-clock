import { useState, useEffect } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null)

  //isPending for loading data :) for ex some inf 
  //about loading as an condition to display when it is true :)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)

      try{
        //to abort fetch request by AbortController()
        // we add it below:)
        //when abort happend, fetch will throw very
        //specific Error "AbortError" it is going to be
        // catch in catch block
        const res = await fetch(url, { signal: controller.signal })
        //ok value is about response, is false or true :)
        if(!res.ok) {
          //if there will be an new Error catch block will start!!!:) its going to console log
          //res.statusText from below Error
          throw new Error(res.statusText)
        }
        
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      } 
    }

    fetchData()
  //clean up function to abort fetch and stop streaming data
  //is fire when component which using useEffect will be unmounted
    return () => {
      controller.abort()
    }

  }, [url])

  return { data, isPending, error }
}


/*

 const [url, setUrl] = useState('http://localhost:3000/trips')
  const { data: trips } = useFetch(url)

*/

/*

db.json

 "trips": [
      {
        "title": "2 Night Stay in Venice",
        "price": "£195",
        "id": "1",
        "loc": "europe"
      },

*/