import { useState } from 'react';
import Forminput from './components/Formimput';
import Showpost from './components/Showpost';

function App() {
  const [sendData , setSendData]=useState(false);

  function AddItemHandler(){
    setSendData(!sendData);
  }

  return (
    <div style={{backgroundColor:'pink'}}>
      <Forminput onAddData={AddItemHandler}/>
      <Showpost  ChangedData ={sendData} />
    </div>
  );
}

export default App;
