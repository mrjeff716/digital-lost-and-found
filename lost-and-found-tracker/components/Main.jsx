import { rawData, builtInRawData } from "../utils/data.js"
import RenderData from "../utils/renderData.jsx"
import { useState, useEffect } from "react"

export default function Main() {

  const [data, setData] = useState(getInitialArray())
  
  function getInitialArray () {
    const savedData = JSON.parse(localStorage.getItem('dataArrayKey'));
    // Parse the saved string back to an array; use an empty array as a default if nothing is found
    const rawDataSaved = JSON.parse(localStorage.getItem("savedRawData")) || rawData()
    return savedData ? savedData : rawDataSaved;
  };
  
  useEffect(() => {
    localStorage.setItem("dataArrayKey", JSON.stringify(data))
  }, [data])

  const dataHTML = data.map((datum, index) => {
    return <RenderData datum = {datum} key = {index} /*isFound={isFound}setIsFound={setIsFound}*/ rawData={rawData} data={data} setData={setData}/>
  })

  function resetList() {
    setData((prevData) => {return prevData = builtInRawData})
  }

  function search(e) {
    setData(prevData => {
      return (
        builtInRawData.filter(datum => {
          if(e.target.value === "") {
            return rawData
          }
          return Number(e.target.value) === datum.id ? true : false
        })
      )
    })
    console.log("filtered")
  }

  return (
    <main>
      <h2>
      Welcome to the Digital Lost & Found
      </h2>

      <li className="intro-paragraph">
        This website helps you quickly search for lost items in school.
        Each item is listed with a photo, description, and a unique ID.
      </li>
      <li className="intro-paragraph">
        🔎 Use the search bar to type the item ID or scroll down to look through the pictures.
      </li>
      <li className="intro-paragraph">
        📍 If you find your item, note its ID and come to the lost & found to collect it.
      </li>
      <li className="intro-paragraph">
        You can remove a certain item from the list to facilitate searching.
      </li>
      <li className="intro-paragraph">
        Make sure to press the refresh List button below to get the most recent and updated version of the list
      </li>

      <button className="reset-list-button" onClick={resetList}>Reset List</button>
      
      <input onChange={(e) => {search(e)}} className="search" type="tel" placeholder="Please insert the ID of the missing item if available" />

      <section className="items-list">
        {dataHTML}
      </section>
    </main>
  )
}