import React, {useEffect} from 'react'

import {useProductos} from '../hooks'

export const Productos = () => {

    const character = {
        display: "block",
        border: "2px solid salmon",
        padding: "10px",
        width: "92%",
        marginLeft:"50px",
        marginBottom:"10px",
        backgroundColor:"lightgray"
    }

    const { dataProductosGet, productos, deleteProducto, switchProducto, productosFinder } = useProductos()

    useEffect(() => {
        dataProductosGet()
    }, [])


    const handleDelete=(pid)=>{
        deleteProducto(pid)
    }

    const handleSwitch=(pid)=>{
        switchProducto(pid)
    }


    
  return (
    <div>
        <h3 style={{marginLeft:"50px"}}>Proyectos</h3>

        <input type="search" className='mx-5 my-2' placeholder='Buscar Productos' onChange={(e)=> productosFinder(e.target.value)}/>

        {productos.productos?.length < 2 ? <button name=' ' className='btn btn-info' onClick={(e)=> productosFinder(e)}>Ver todos los Proyectos</button> : ''} 


          {productos.productos?.map((el, i)=>(
            <div key={i+'!@#'} style={character}>

            {/*     <h3>Categoria: {el.categoria.nombre}</h3> */}

                <h3>Nombre: {el.nombre}</h3>
                <p>Cliente: {el.usuario.nombre}</p>
                <p>Usuario Id: {el.usuario._id}</p>
             {/*    <p>Estado: {el.estado ? 'true' : 'false'}</p> */}

                {/* <img src={el.img} width='50px' /> */}

                <p>Monto: {el.precio}<b>$</b> </p>  

                <p>Id Proyecto: {el.pid}</p>
                {/* <p>Fecha de Inicio: {el.descripcion}</p> */}
                <p>Fecha de Inicio: 11/mayo/2023</p>	
                <p>Numero de Cotización: 323121</p> 
                <p>Estado:{el.disponible ? ' true' : ' false'}</p> 

                <button onClick={()=>handleDelete(el.pid)}>Eliminar</button>
                <button onClick={()=>handleSwitch(el.pid)}>Toggle</button>
            </div>
        ))}  

    </div>
  )
}
