import React, { useEffect } from 'react';

function Information() {

    const [showModal, setShowModal] = React.useState(false);    

    function openModal() {        
        setShowModal(!showModal);
    }
  
    return (      
        <div>            
            <label><button id="myBtn" onClick={openModal}>?</button></label>
            { showModal && 
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span tabIndex="1" class="close" onClick={openModal}>&times;</span>
                        <p>On this map you find the 7 new wonders of the world + our school!</p>
                        <p></p>
                        <p>Click, scroll and navigate through the map!</p>
                    </div>
                </div> 
            }            
        </div>      
    )    
};
  
export default Information;