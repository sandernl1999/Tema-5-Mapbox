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
                        <p>På dette kartet finner du verdens syv nye underverker + skolen vår</p>
                        <p></p>
                        <p>Klikk, scroll og naviger deg rundt på kartet!</p>
                    </div>
                </div> 
            }            
        </div>      
    )    
};
  
export default Information;