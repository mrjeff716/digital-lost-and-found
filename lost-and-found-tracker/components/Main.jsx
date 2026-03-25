import RenderData from "./renderData.jsx"
import { useState, useEffect } from "react"

export default function Main() {

  const [allData, setAllData] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getLatestData = () => {
    setLoading(true)
    fetch("https://sheetdb.io/api/v1/x78dwgs9fwn1d?sheet=Database")
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData)
        setAllData(fetchedData) // Save the full list here
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching sheet:", err)
        setLoading(false)
      })
      console.log("data fetched")
  }

  console.log(allData)


  useEffect(() => {
    getLatestData()
  }, [])
  
  const dataHTML = data.map((datum, index) => {
    return <RenderData datum = {datum} key = {index} /*isFound={isFound}setIsFound={setIsFound}*/ data={data} setData={setData}/>
  })
  const filteredDataHTML = data.map((datum, index) => datum.isFound === "FALSE" && <RenderData datum = {datum} key = {index} /*isFound={isFound}setIsFound={setIsFound}*/ data={data} setData={setData}/> )

  function resetList() {
    getLatestData()
  }

  function searchById(e) {
    setData(prevData => {
      
        if (data.length < 1) {
          return allData
        } else {
          return (
            data.filter(datum => {
          if(e.target.value === "") {
            setData(allData)
            return data
          } else {
            return e.target.value === datum.id ? true : false
          }
          
        })
          )
        }
        
      
    })
    console.log("filtered")
  }
  function searchByCategory(e) {
    setData(prevData => {
      
        if (data.length < 1) {
          return allData
        } else {
          return (
            data.filter(datum => {
          if(e.target.value === "") {
            setData(allData)
            return data
          } else {
            return e.target.value === datum.itemType ? true : false
          }
          
        })
          )
        }
        
      
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
        🔎 Use the search bar to type the item ID or to select your missing item's type or scroll down to look through the pictures.
      </li>
      <li className="intro-paragraph">
        You can remove a certain item from the list to facilitate searching.
      </li>
      <li className="intro-paragraph">
        Make sure to press the refresh List button below to get the most recent and updated version of the list
      </li>
      <li className="intro-paragraph" style={{fontWeight: "bold"}}>
        <a className="intro-paragraph" style={{color: "blue", textDecoration: "underline", cursor:"pointer"}}
        href="https://docs.google.com/forms/d/e/1FAIpQLSeFsTjbmguNZ-10QWgRbnAzy3_wbDxenGi4dY5i-CcrUEyL8g/viewform?usp=dialog"
        target="_blank">Click here</a> to submit a lost item
      </li>

      <button className="reset-list-button" onClick={resetList}>Refresh List</button>
      
      <input onChange={(e) => {searchById(e)}} className="search" type="tel" placeholder="Please insert the ID of the missing item if available" />
      <label className="intro-paragraph" style={{fontSize: "1rem"}}>--Please insert the type of the missing item if available--</label>
      <select onChange={(e) => {searchByCategory(e)}} className="search" id="searchByDescription" placeholder="Please insert the type of the missing item if available" >
        <option value="" style={{color: "black"}}>--Please insert the type of the missing item if available--</option>
        <option>Hoodie</option>
        <option>Jacket</option>
        <option>Lunch box</option>
        <option>Water bottle</option>
        <option>Pencil case</option>
      </select>

      <section className="items-list">
        {filteredDataHTML}
      </section>
    </main>
  )
}