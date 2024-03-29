import React, {useState} from 'react'
import TaskAccordion_Profile from './TaskAccordion_Profile';

const CardAccordion_Profile = (props) => {
    var index = props.index
    var card_name = props.card_name
    var card_sorter = props.card_sorter
    var emptyFunction = emptyFunction;

    var [cardaccordionStatus, setCardaccordionStatus] = useState(false);
    
  const change_cardaccordion_icon = {
    class: cardaccordionStatus ? "fa fa-minus" : "fa fa-plus"
  }
    
  var toggleTaskAccordion = () => {
  
    if (cardaccordionStatus === false){
      setCardaccordionStatus(true)
    }else{
      setCardaccordionStatus(false)
    }
  }
  return (
    <>
        <li key={index} className='list-type-none bg-white text-start' onClick={(card_sorter[card_name].length !== 0) ? () => toggleTaskAccordion(): emptyFunction}>
                {card_name}
                {(card_sorter[card_name].length !== 0) ? <span><i className={change_cardaccordion_icon.class}  style={{"float": "right", "marginRight": "4rem"}}></i></span> : <></> }
                <TaskAccordion_Profile cardaccordion_contents = {card_sorter[card_name]} cardaccordionStatus={cardaccordionStatus} />
         </li>
    </>
  )
}

export default CardAccordion_Profile