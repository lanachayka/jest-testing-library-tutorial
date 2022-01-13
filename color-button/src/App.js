import './App.css';
import {useState} from "react";

export function replaceCamelWithSpaces(colorName){
    return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [color, setColor] = useState('MediumVioletRed');
  const newColor = color==='MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'

  const [disabled, setDisabled] = useState(false);
  return (
   <div className="App">
     <button
         onClick={() => setColor(newColor)}
         style={{backgroundColor:disabled ? 'grey' : color, color:'white'}}
         disabled={disabled}
     >
         Change to {replaceCamelWithSpaces(newColor)}
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
