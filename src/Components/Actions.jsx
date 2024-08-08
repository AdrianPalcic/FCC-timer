import Alarm from "../assets/Alarm.mp3"


    function Actions({playOrPause, reset}) {
        return (
        <div className='actions'>
            <button id="start_stop" onClick={playOrPause}>
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed">
                <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
              </svg>
            </button>
            <button id="reset" onClick={reset}>
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed">
                <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
              </svg>
            </button>
            <audio id="beep" src={Alarm}></audio>
          </div>
          );
    }

    export default Actions;