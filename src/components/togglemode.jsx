import "./togglemode.css"
export default function ToggleMode({toggleBg, handleToggle}){
    return (
        <div className="button-container" onClick={handleToggle} style={{backgroundColor : toggleBg ? "/src/assets/2.jpg":"/src/assets/1.jpg"}}>
          <img src={toggleBg?"src/assets/sun.png":"src/assets/moon.png"}/>
        </div>
    )
}