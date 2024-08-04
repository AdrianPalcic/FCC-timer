import { useState, useEffect } from 'react'
import { useRef } from 'react';

function App() {

  const [session, setSession] = useState(25 );
  const [rest, setRest] = useState(5);
  const [isRunning, setIsRunning] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(session * 60); 
  const [isSession, setIsSession] = useState(true);
  const [isPaused, setIsPaused] = useState(false);


  const intervalRef = useRef(null);

  const decrement = (value, setValue) => {
    if (value > 0) {
      setValue(value - 1)
    }
  }
  const increment = (value, setValue) => {
    if (value < 60) {
        setValue(value + 1)
    }
  }
 
  const reset = () => {
    setSession(25);
    setRest(5);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsSession(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };
   
  const toggleTimer = () => {
    if (isRunning) {
      if (isPaused) {
        startTimer();
      } else {
        stopTimer();
      }
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsSession((prev) => !prev);
            return (isSession ? rest : session) * 60;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else if (isPaused) {
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsSession((prev) => !prev);
            return (isSession ? rest : session) * 60;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    setTimeLeft(isSession ? session * 60 : rest * 60);
  }, [session, rest, isSession]);



  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  return (
    <main>
    <div className='time'>
      <div className='session'>
        <h1>Session Length</h1>
        <div className='session toggle'>
          <button className='decrement' disabled={isRunning} onClick={() => decrement(session, setSession)}><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></button>
          <p>{session}</p>
          <button className='increment' disabled={isRunning} onClick={() => increment(session, setSession)}><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg></button>
        </div>
      </div>
      <div className='break'>
        <h1>Break Length</h1>
          <div className='break toggle'>
            <button className='decrement' disabled={isRunning} onClick={() => decrement(rest, setRest)}><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></button>
            <p>{rest}</p>
            <button className='increment' disabled={isRunning} onClick={() => increment(rest, setRest)}><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg></button>
          </div>
      </div>
    
    </div>

    <div className='main-screen'>
        <h1>{isSession ?  "Session" : "Break" }</h1>
        <p>{formatTime(timeLeft)}</p>
      </div>
      <div className='actions'>
        <button onClick={toggleTimer}><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg></button>
        <button onClick={stopTimer}><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg></button>
        <button onClick={reset}><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/></svg></button>
      </div>
    </main>
  )
}

export default App
