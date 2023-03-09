
import { useEffect, useState} from 'react'
import { PostForm } from './PostForm';
import { useUsers } from '../../hooks'

export const Users = () => {

    const usersListCSS = {
        display: "block",
        border: "2px solid salmon",
        padding: "10px",
        width: "94%",
        marginLeft: "3%",
        marginBottom: "10px",
        backgroundColor: "lightgray"
    }


    const { dataUsersGet, users, deleteUser, postUser, switchUser, setInfoToForm,
            editMode, newDataEdit, defaultModeEdith, uploadUserImg, usersFinder, 
            paginationSelect, paginationNext } = useUsers()



    useEffect(() => {
        dataUsersGet()
    }, [])


    const handleDelete = (el: Object) => {
        deleteUser(el)
    }

    const handleSwitch = (el) => {
        switchUser(el)
    }

    const handleEdith = (el: String) => {
        setInfoToForm(el)
        setModal(!modal)
    }


    const handlePaginationSelect=(ps)=>{
        let step = Number(ps)
        paginationSelect(step)
    }

    const [modal, setModal] = useState(false)

    const InModal =()=>{
        setModal(!modal)
    }

    return (
        <div>
            <h3 className='mx-5'>Usuarios</h3>
            <div className='mx-5 my-2'>
            
                <div>{`Usuarios del: ${localStorage.step-7} para ${localStorage.step}, en Total: ${localStorage.UsersTotal}`}</div>

                <input type="button" value='Previous' onClick={()=>paginationNext(false)} className='btn btn-secondary'/>

                {JSON.parse(localStorage.UsersArray)?.map((el, i) => (
                    i < localStorage.UsersTotal/8 &&
                        <input key={i+'<^>'} type="button" value={i+1} onClick={()=>handlePaginationSelect((i+1)*8)} className='btn btn-secondary'/> 
                ))}
           
                <input type="button" value='Next' onClick={()=>paginationNext(true)} className='btn btn-secondary'/>
                <br/>
                
                <input type="button" className='btn btn-primary mt-4 mb-3' onClick={()=>setModal(!modal)} value={modal?'Modal Nuevo usario':'Crear Nuevo Usuario'}/>

                <select className='form-select col-12 my-2' style={{width:'200px'}} onChange={(e)=>handlePaginationSelect(e.target.value)}>
                    {JSON.parse(localStorage.UsersArray)?.map((el, i) => (
                        i < localStorage.UsersTotal/8 && 
                            <option key={i} value={(i+1)*8}>   {`${((i+1)*8)-7} a ${(i+1)*8}`}   </option>
                    ))}
                </select>

            </div>

            <PostForm postUser={postUser} editMode={editMode} newDataEdit={newDataEdit} defaultModeEdith={defaultModeEdith} modal={modal} InModal={InModal} />

                       

            <input type="search" className='form-control col-12 my-2 mx-5' style={{width:'200px'}} placeholder='Buscar Usuarios' onChange={(e)=> usersFinder(e.target.value.trim())} />

            {users.usuarios?.length < 3 &&  
                <div className='mx-5 my-4'>
                    <button onClick={()=>handlePaginationSelect(8)} className='btn btn-info'> Click para Ver todos los Usuarios</button>
                </div>
            }
 
            {users?.usuarios?.map((el, i) => (
                <div key={i + '!@#'} style={usersListCSS}>

                    <h3>Nombre: {el.nombre}</h3>
                    <p>Mail:   {el.correo}</p>

                    <p>Role:   {el.rol}</p>
                    <p>Id:     {el.uid}</p>

                    <p>Estado:  {el.estado ? ' true' : ' false'}</p>
                    <p>Google: {el.google ? ' true' : ' false'}</p>

                    <img src={el.img} width='100px' />
                    <p>Toggle: {el.toggle ? ' true' : ' false'} </p>

                    <button onClick={() => handleDelete(el)}>Eliminar</button>
                    <button onClick={() => handleSwitch(el)}>Toggle</button>
                    <button onClick={() => handleEdith(el)}>Edit</button>
                    <input type="file" id="file-upload" onChange={(e) => uploadUserImg(el.uid, e.target.files[0])} />

                </div>
            ))}

        </div>
    )
}
