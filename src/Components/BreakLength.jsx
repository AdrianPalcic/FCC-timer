
    function Break({display, setDisplay, work, up, down}) {
        return (
            <div className='break'>
          <h1 id="break-label">Break Length</h1>
          <div className='break toggle'>
            <button id="break-decrement" className='decrement' disabled={work}  onClick={() => down(display, setDisplay)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed">
                <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
              </svg>
            </button>
            <p id="break-length">{display}</p>
            <button id="break-increment" className='increment' disabled={work}  onClick={() => up(display, setDisplay)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed">
                <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
              </svg>
            </button>
          </div>
        </div>
        );
    }

    export default Break;