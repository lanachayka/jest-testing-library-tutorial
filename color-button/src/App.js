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
         style={{backgroundColor:color, color:'white'}}
         disabled={disabled}
     >
         Change to {newColor}
     </button>
       <input
           type="checkbox"
           id="enable-button-checkbox"
           defaultChecked={disabled}
           aria-checked={disabled}
           onChange={(e)=> setDisabled(e.target.checked)}
       />
   </div>
  );
}

export default App;
