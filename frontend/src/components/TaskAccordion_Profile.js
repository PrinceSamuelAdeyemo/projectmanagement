import React from 'react'

const TaskAccordion_Profile = (props) => {

    var cardaccordion_contents = props.cardaccordion_contents
    var cardaccordionStatus = props.cardaccordionStatus

    
    const task_display_profile = {
        display: cardaccordionStatus ? "block": "none",
      };

  return (
    <div className='accordion-section'>
      <section className='accordion-content' style={task_display_profile}>
        <ul className='text-start'>
              {Object.keys(cardaccordion_contents).map((task, index) => 
              <li key={index} className='list-type-none text-start bg-info' >{cardaccordion_contents[task]}
              </li>
              )}
              
            </ul>
        
        
      </section>
    </div>
  )
}

export default TaskAccordion_Profile