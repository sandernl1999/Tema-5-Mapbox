import React, { useEffect } from "react";

function Information() {
  const [showModal, setShowModal] = React.useState(false);

  function openModal() {
    setShowModal(!showModal);
  }

  function keyPressHandler(e) {
    if (e.key === "Enter") {
      setShowModal(false);
    }
  }

  return (
    <div>
      <label>
        <button id="myBtn" onClick={openModal} aria-label="More Information">
          ?
        </button>
      </label>
      {showModal && (
        <div id="myModal" class="modal" role="dialog">
          <div class="modal-content">
            <span
              tabIndex="0"
              class="close"
              onClick={openModal}
              onKeyPress={(e) => keyPressHandler(e)}
              role="button"
              aria-label="Close Information Dialog"
            >
              &times;
            </span>
            <p>
              På dette kartet finner du verdens syv nye underverker + skolen vår
            </p>
            <p></p>
            <p>Klikk, scroll og naviger deg rundt på kartet!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
