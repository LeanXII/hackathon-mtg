import './SelectiveCardRender.css'
import {useNavigate, useLocation} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'


function SelectiveCardRender ({cardList, currentSearchByName}) {
  const navigate = useNavigate()
  const location = useLocation();

  const currentSearchByNameLowerCase = currentSearchByName.toLowerCase();

  const handleClick = (id)=>{
    navigate(`/${id}`, {state: {cardId: id, path: location.pathname}})
  }
  const filteredList = cardList.filter((card)=>card.name.toLowerCase().includes(currentSearchByNameLowerCase))



  return(
    <div className = "card-search">
      {filteredList.map((card)=>(
        card.image_uris && card.image_uris.small  &&(
          <div className = "card" >
            <p>{card.name}</p>
            <img onClick={()=>handleClick(card.id)} src = {card.image_uris.small}></img>
         </div>
        )
      ))}
    </div>
    )

}

export default SelectiveCardRender