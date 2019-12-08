// API_KEY=cb01dc00a96645d8a3cb1022e75b090f https://newsapi.org/
const Layout = props =>{
  let imag = {
   buzo:"https://cdn.pixabay.com/photo/2015/03/19/23/03/divers-681516_960_720.jpg",
   tortuga:"https://cdn.pixabay.com/photo/2013/09/23/22/33/turtle-185484_960_720.jpg",
   ballenas:"https://cdn.pixabay.com/photo/2014/03/07/06/42/whale-shark-281498_960_720.jpg",
   coral:"https://cdn.pixabay.com/photo/2013/02/09/04/28/diver-79597_960_720.jpg",
   peces:"https://cdn.pixabay.com/photo/2014/06/27/12/36/fish-378286_960_720.jpg"
  }
  
  
  return(
    <>
    <header className="header">
      <img src={imag.peces} alt="" />
    </header>
  
    {props.children}
  
  </>
  
);}

export default Layout;