import React, { useEffect, useState } from 'react';

import "../styles/css/accordion.css"

const Accordion = (props) => {
  var accordion_header = props.accordion_header;
  var accordion_content = props.accordion_content;
  var order = props.order
  var [accordionStatus, setAccordionStatus] = useState(false);
  
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
        <p>{accordion_content}</p>
      </section>
    </div>
  )
}

export default Accordion