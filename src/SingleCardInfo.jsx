import {useLocation,  useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './SingleCardInfo.css'

function SingleCardInfo (){
  const [currCard, setCurrCard] = useState({})
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const cardId = location.state.cardId
  const previousPath = location.state.path;

  const navigate = useNavigate()



  useEffect(()=>{
    fetch(`https://api.scryfall.com/cards/${cardId}`)
    .then(res=>res.json())
    .then(data=>{
      setCurrCard(data)
      setLoading(!loading)})


  }, [])

  const handleButtonClick = (setCode) =>{
    navigate(previousPath, {state: {set: setCode}})
  }

  const handleSetSelect = (setCode) =>{
    navigate(`/set/${setCode}`, {state: {set: setCode }})
  }


  if(loading){
    return(
      <div>
        Loading
      </div>
    )
  }
  return(
  <div className = "single-card-wrapper">
    <div className = 'single-card-info'>
      <p>Name: {currCard.name}</p>
      <img src={currCard.image_uris.normal} />
    </div>
    <div className = "single-card-details">
      <p>Rarity: {currCard.rarity}</p>
      <p className = "set-select" onClick={()=>handleSetSelect(currCard.set)}>Set: {currCard.set_name} --- Click here to explore this set!</p>
      <p>Price: {currCard.prices.usd ? `$${currCard.prices.usd}`: "No current price"}</p>
      <button onClick={()=>handleButtonClick(currCard.set)}>Return</button>
    </div>
  </div>
  )

}

export default SingleCardInfo