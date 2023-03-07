import {useEffect, useState} from 'react'
import './postForm.css';
import { useForm } from '../../helpers';




export const PostForm = ({postUser, editMode, newDataEdit, defaultModeEdith, modal, InModal }) => {

    const[name2, setName2]=useState({
        nameUser: '',
        email: '',
        password:''
    })

    const { nameUser, email, password, onInputChange: onPostInputChange, onResetForm } = useForm(name2);

  
     useEffect(() => { 
        if(editMode !== undefined) {
            const { nombre, correo, } = editMode
            setName2({nameUser:nombre, email:correo})}
    }, [editMode]) 

    

    const onSubmitUsers = (event: any) => {
        event.preventDefault();

        if(editMode){
            newDataEdit(nameUser, email, editMode.uid)
            setName2({nameUser: '',email: '',password:''})
        }else{
            postUser({nombre:nameUser, correo:email, password:password})
        }

         onResetForm()
         InModal()
    }


    
    const handleCancelEdit =()=>{
        defaultModeEdith()
        InModal()
        setName2({nameUser: '', email: '', password:''})
        
    }

    const handleClose=()=>{
        InModal()
        defaultModeEdith()
        setName2({nameUser: '', email: '', password:''})
    }
  



  return (
    <div className={modal ? "login-container login-containerUser fix" : "login-container login-containerUser fixModal"}>
    <div className="row">
        <div className="col-md-6 login-form-1 fixed">
            <h3>{editMode ? 'Edit User' : 'Post User'}</h3>

            <form onSubmit={onSubmitUsers}>

                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="name"
                        name="nameUser"
                        value={nameUser}
                        onChange={onPostInputChange}
                    />
                </div>

                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="eMail"
                        name="email"
                        value={email}
                        onChange={onPostInputChange}
                    />
                </div>
                
                {!editMode &&
                <div className="form-group mb-2">
                    <input
                        type='password'
                        className="form-control"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={onPostInputChange}
                    />
                </div>
                }

                <div className="d-grid gap-2">
                    <input type="submit" className="btnSubmitPost btn" value={ editMode ? 'Edit User':"New user"} />

                    {editMode && 
                        <input type="button" onClick={handleCancelEdit} className="editButton mt-4 btn" value={ editMode ? 'Cancel Edition':'oko'} />
                    }
                </div>


            </form>

            <input type="button" value="Cerrar" className='btn btn-danger w-100 mb-5' onClick={handleClose} />
        </div>
    </div>
</div>
  )
}
