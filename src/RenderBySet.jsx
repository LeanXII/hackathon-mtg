import {useLocation, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

function RenderBySet ({currentSearchByName}){
  const location = useLocation()
  const navigate = useNavigate()
  const setCode = location.state.set;
  const [currSetArray, setCurrSetArray] = useState([])


  const currentSearchByNameLowerCase = currentSearchByName.toLowerCase();
  const filteredList = currSetArray.filter((card)=>card.name.toLowerCase().includes(currentSearchByNameLowerCase))

  const handleClick = (id)=>{
    navigate(`/${id}`, {state: {cardId: id, path: location.pathname}})
  }

  useEffect(()=>{
    fetch(`https://api.scryfall.com/sets/${setCode}`)
    .then(res=>res.json())
    .then(data=>{
      fetch(data.search_uri)
      .then(res=>res.json())
      .then(data=>setCurrSetArray(data.data))})
  }, [])




  return(
    <div className = "card-search">
      {filteredList.map((card)=>(
        card.image_uris && card.image_uris.small  &&(
          <div className = "card" >
            <p>Name: {card.name}</p>
            <img onClick={()=>handleClick(card.id)} src = {card.image_uris.small}></img>
         </div>
        )
      ))}
    </div>
    )
}

export default RenderBySet