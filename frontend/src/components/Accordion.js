import React, { useEffect, useState } from 'react';

import TaskAccordion_Profile from './TaskAccordion_Profile';

import "../styles/css/accordion.css"
import CardAccordion_Profile from './CardAccordion_Profile';

const Accordion = (props) => {
  var accordion_header = props.accordion_header;
  var accordion_content = props.accordion_content;
  var accordion_tasks = props.accordion_tasks;
  //var accordion_content = "Hello, World";
  var card_and_tasks = {}
  var order = props.order
  var [accordionStatus, setAccordionStatus] = useState(false);

  for (var i in Object.values(accordion_content)){
    card_and_tasks = {...card_and_tasks, ...{[accordion_content[i][0]]: accordion_content[i][1]}}
  }


  const change_accordion_icon = {
    class: accordionStatus ? "fa fa-minus" : "fa fa-plus"
  }


  const card_display_profile = {
    display: accordionStatus ? "block": "none",
  };

  var toggleAccordion = () => {
   
    if (accordionStatus === false){
      setAccordionStatus(true)
    }else{
      setAccordionStatus(false)
    }
  }


  return (
    <div className='accordion-section'>
      <header className='accordion-header' id={`passed_id${order}`} onClick={() => toggleAccordion()}>
        <p>{accordion_header}</p>
        <span><i className={change_accordion_icon.class} style={change_accordion_icon}></i></span>
      </header>
      <section className='accordion-content' style={card_display_profile}>
        <ul>
        {Object.keys(card_and_tasks).map((card_name, index) => 
          <CardAccordion_Profile key={index} index={index} card_sorter={card_and_tasks} card_name={card_name} />
        ) }
        </ul>
        
        
      </section>
    </div>
  )
}

export default Accordion