import React, { useEffect, useState } from 'react';

import "../styles/css/accordion.css"

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


  const accordion_display = {
    display: accordionStatus ? "block": "none",
  };

  var toggleAccordion = (order) => {
   
    if (accordionStatus === false){
      setAccordionStatus(true)
    }else{
      setAccordionStatus(false)
    }
  }

  return (
    <div className='accordion-section'>
      <header className='accordion-header' id={`passed_id${order}`} onClick={() => toggleAccordion(order)}>
        <p>{accordion_header}</p>
        <span><i className='fa fa-plus'></i></span>
      </header>
      <section className='accordion-content' style={accordion_display}>
        <p><b></b></p>
        <ul>
        {Object.keys(card_and_tasks).map((each_content, index) => 
          <li key={index} className='list-type-none bg-primary'>
            {each_content}
            <ul>
              {Object.keys(card_and_tasks[each_content]).map((task, index) => 
              <li key={index} className='list-type-none bg-info' >{card_and_tasks[each_content][task]}</li>
              )}
              
            </ul>
          </li>
        ) }
        </ul>
        
        
      </section>
    </div>
  )
}

export default Accordion