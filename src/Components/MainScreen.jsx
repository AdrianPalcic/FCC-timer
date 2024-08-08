
    function MainScreen({display, time, func}) {
        return (
            <div className='main-screen'>
            <h1 id="timer-label">{display ? "Session" : "Break"}</h1>
            <p id="time-left">{func(time)}</p>
          </div>
        );
    }

    export default MainScreen;