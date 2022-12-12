import './App.css';
import TextInput from './TextInput';
import List from './List';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Vote from "./Vote"

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<TextInput />}></Route>
    //   </Routes>
    //     {/* <TextInput />
    //     <List /> */}
    // </BrowserRouter>
    <div>
      <TextInput />
      <List />
    </div>
  );
}

export default App;
