import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import SelectiveCardRender from './SelectiveCardRender.jsx'
import SingleCardInfo from './SingleCardInfo'
import RenderBySet from './RenderBySet.jsx'
import './App.css'

function App() {
const [currColor, setCurrColor] = useState('red')
const [currManaValue, setCurrManaValue] = useState(0)
const [currCardList, setCurrCardList] = useState([])
const [url, setUrl] = useState(`https://api.scryfall.com/cards/search?order=cmc&q=c%3Ared+pow%3D0`)
const [currSearchedNameString, setCurrentSearchedNameString] = useState('')
const [nextPage, setNextPage] = useState('')

const navigate = useNavigate();



  useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCurrCardList(data.data)
      if(data.has_more){
      setNextPage(data.next_page)}})

  }, [url])
  console.log(nextPage)
  useEffect(() => {
    if(currManaValue === ''){
      setUrl(`https://api.scryfall.com/cards/search?order=cmc&q=c%3A${currColor}+pow%3D0`);
    }
    else{
      setUrl(`https://api.scryfall.com/cards/search?order=cmc&q=c%3A${currColor}+pow%3D${currManaValue}`);
    }
  }, [currColor, currManaValue]);



  //HANDLE CLICK FUNCTIONS
  const changeColor = (colorValue) =>{

    setCurrColor(colorValue)
  }
  const changeMana = (manaValue) => {
      setCurrManaValue(manaValue)
  }

  const handleNameSearch = (string) =>{
    setCurrentSearchedNameString(string)
  }

  const returnToMain = () =>{
    navigate('/')
  }

  const handleNextPage = ()=>{
    setUrl(nextPage)
  }

  const handlePreviousPage = () =>{
    setUrl()
  }


  if(!currCardList){
    return(
      <div>
        Loading
      </div>
    )
  }

  return(
  <>
  <div className = 'nav'>
    <p>Choose card color</p>
    <select onChange={(event)=>changeColor(event.target.value)} className = "color-select" name = "color" >
      <option value = "red">Red</option>
      <option value = "blue">Blue</option>
      <option value = "black">Black</option>
      <option value = "white">White</option>
      <option value = "green">Green</option>
    </select>

    <p>Sort by strength</p>
    <input className = "toughness-select" onChange={(event)=>changeMana(event.target.value)} value = {currManaValue}type = "text" placeholder="mana value"></input>

    <p>Sort by name</p>
    <input className = "filter-by-name" onChange={(event)=>handleNameSearch(event.target.value)} value = {currSearchedNameString} type = "text" placeholder = "Search for cards by name!"></input>

    <button onClick={returnToMain} className = 'return-to-main' >Return to main</button>
    <button onClick = {()=>handleNextPage()}>Next page --&gt;</button>
    <button onClick= {handlePreviousPage}>&lt;--Previous page</button>

  </div>



    <Routes>
      <Route path = '/:id' element = {<SingleCardInfo />}></Route>
      <Route path = '/' element = {<SelectiveCardRender cardList = {currCardList} currentSearchByName ={currSearchedNameString}/>} />
      <Route path = '/set/:id' element = {<RenderBySet currentSearchByName = {currSearchedNameString}/>} />
    </Routes>

  </>
  )

}

export default App
