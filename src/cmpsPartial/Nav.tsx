import { Link,useLocation } from 'react-router-dom';
import './nav.css'
import {useState} from 'react'



export const Nav = ({ startLogout, status, user }) => {


   const [menuToggle, setMenuToggle]=useState(true)
   let location = useLocation();


  return (
    <div className="navbar navbar-dark bg-black mb-4 px-4 navCSS">

        <span className="navbar-brand">
          <img src="https://static.wixstatic.com/media/a617a2_67d036f6dd3b4982977cbbad96895316~mv2.png/v1/fill/w_339,h_116,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LOGO%20PROYECTRIC%20FONDO%20OSCURO.png" 
          width="200" height="44" alt="" />
        </span>

      

        {  status !== 'not-authenticated' && location.pathname !== '/auth/login'  && location.pathname !== '/auth/register' &&<>
        <button className='btnNav btn shadow-none' onClick={()=>setMenuToggle(!menuToggle)}>
             MENU <span className="navbar-toggler-icon"></span>
         </button>

          <nav className='desk'>
            <p>{localStorage.userName}</p>
              {
                  localStorage.userName === 'superadmin' &&
                  <Link  to="/users"> Users</Link>
              }
              <Link  to="/productos"> Productos </Link>
              <Link  to="/categorias">Categorias</Link>

            <Link className="btn btn-outline-danger btn-sm h-50 mb-0" to="/auth/login" onClick={ startLogout }>
                <i className="fas fa-sign-out-alt"></i> salir
            </Link>
          </nav>
          </>}

     
      <div className='menuMovil'>
        {  status !== 'not-authenticated' && location.pathname !== '/auth/login'  && location.pathname !== '/auth/register' &&<>
       

          <nav className={menuToggle ? 'menuItemsTrue' : 'menuItemsFalse' }>
            <p>{localStorage.userName}</p>
              {
                  localStorage.userName === 'superadmin' &&
                  <Link  to="/users" onClick={()=>setMenuToggle(!menuToggle)}> Users </Link>
              }
              <Link  to="/productos" onClick={()=>setMenuToggle(!menuToggle)}> Productos </Link>
              <Link  to="/categorias" onClick={()=>setMenuToggle(!menuToggle)}>Categorias</Link>

            <Link className="btn btn-outline-danger btn-sm h-50 mb-0" to="/auth/login" onClick={ startLogout }>
                <i className="fas fa-sign-out-alt"></i> salir
            </Link>
          </nav>
          </>}
      </div>


    </div>
  )

}
