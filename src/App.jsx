  import { useState } from 'react'
  import Search from './components/search'
  import './App.css'
  import ToggleMode from "./components/togglemode";

  function App() {
    const [toggleBg, setToggleBg] = useState(true);
    const handleToggle = () => {
      setToggleBg(!toggleBg)
    }
    const bgStyle = {
      backgroundColor: `${toggleBg ? "white" : "#041533"}`,
      backgroundSize: "cover",
      minHeight: "100vh",
      color: `${toggleBg ? "black" : "white"}`,
    };
    return (
      <>
      <div className='div-container' style={bgStyle}>
        <Search/>
        <ToggleMode toggleBg = {toggleBg} handleToggle = {handleToggle}/>
      </div>
        </>
    )
  }

  export default App
