import './App.css';
import {useState} from "react";

function App() {
  const [color, setColor] = useState('red');
  const newColor = color==='red' ? 'blue' : 'red'

  const [disabled, setDisabled] = useState(false);
  return (
   <div className="App">
     <button
         onClick={() => setColor(newColor)}
         style={{backgroundColor:disabled ? 'grey' : color, color:'white'}}
         disabled={disabled}
     >
         Change to {newColor}
     </button>
     <br />
     <div>
         <input
             type="checkbox"
             id="disable-button-checkbox"
             defaultChecked={disabled}
             aria-checked={disabled}
             onChange={(e)=> setDisabled(e.target.checked)}
         />
         <label htmlFor="disable-button-checkbox">Disable button</label>
     </div>
   </div>
  );
}

export default App;
