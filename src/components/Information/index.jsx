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
        <button id="myBtn" onClick={openModal} aria-haspopup="dialog">
          ?
        </button>
      </label>
      {showModal && (
        <div
          id="myModal"
          class="modal"
          role="alert"
          tabIndex="0"
          aria-labelledby="dialog1_label"
          aria-modal="false"
        >
          <div class="modal-content">
            <button
              class="close"
              onClick={openModal}
              onKeyPress={(e) => keyPressHandler(e)}
              aria-label="close dialog button"
            >
              &times;
            </button>
            <p id="dialog1_label">
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
