import { useState, useEffect} from 'react';
import Session from './Components/SessionLength';
import Break from './Components/BreakLength';
import MainScreen from './Components/MainScreen';
import Actions from './Components/Actions';


function App() {
  const [session, setSession] = useState(25);
  const [rest, setRest] = useState(5);
  const [timeLeft, setTimeLeft] = useState(session * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(t => {
          if (t > 0) {
            return t - 1;
          } else {
            const audio = document.getElementById("beep");
            audio.play();
            if (isSession) {
              setIsSession(false);
              return rest * 60; 
            } else {
              setIsSession(true);
              return session * 60; 
            }
          }
        });
      }, 1000);
    } else  {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isSession, session, rest]);


  useEffect(() => {

    setTimeLeft(isSession ? session * 60 : rest * 60);
  }, [session, rest, isSession]);

    const formatTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const seconds = secs % 60;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
      return `${formattedMinutes}:${formattedSeconds}`;
    }

  const increment = (value, setValue) => {
    if (value < 60) {
      setValue(value + 1);
    }
  }
  const decrement = (value, setValue) => {
    if (value > 1) { 
      setValue(value - 1);
     }
  }

  const playPause = () => {
    setIsRunning(prev => !prev);
  };

  const reset = () => {
    setIsRunning(false);
    setIsSession(true);
    setTimeLeft(25 * 60);
    setSession(25);
    setRest(5);
    const audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
  }







  return (
    <main>
      <div className='time'>
        <Session display={session} setDisplay={setSession} work={isRunning} up={increment} down={decrement}/>
        <Break display={rest} setDisplay={setRest} work={isRunning} up={increment} down={decrement} />
      </div>
      <MainScreen display={isSession} time={timeLeft} func={formatTime}/>
      <Actions playOrPause={playPause} reset={reset}/>
    </main>
  );
}

export default App;
