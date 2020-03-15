import React from 'react';
import './card.css'



function smallCard ({body,title,buttonLabel,onClickHandler}) {
    return (
      <div className='cardContainer'>
      <div className='cardtitle'> {title} </div>
      <div className='cardbody'> {body} </div>
      <div className='cardaction'> 
      </div>
    </div>

    );
}
export default smallCard