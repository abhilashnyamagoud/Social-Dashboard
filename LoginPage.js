import React,{useState} from 'react'
import axios from 'axios'
import validator from 'validator'
import { Link } from 'react-router-dom'

const LoginPage=(props)=>{
const[email,setEmail]=useState('')
const[users,setUsers]=useState([])
const[formErrors,setFormErrors]=useState({})
const[id,setId]=useState('')
const errors={}
const[login,setLogin]=useState(false)

const handleChange=(e)=>{
    setEmail(e.target.value)
}
const runValidation=()=>{
if(email.trim().length===0){
    errors.email='Enter Email'
}else if(!validator.isEmail(email)){
    errors.email='Invalid email format'
}
}    

const handleSubmit=(e)=>{
    e.preventDefault()
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((responce)=>{
        const result=responce.data
        setUsers(result)
        const filterEmailvalue=result.find((ele)=>{
            return ele.email.toLowerCase()===email.toLowerCase()
        }) 
        if(filterEmailvalue){
            setId(filterEmailvalue.id)
            setLogin(true)
            const formData={
                id:filterEmailvalue.id,
                login:true                                            
            }
            localStorage.setItem('formData',JSON.stringify(formData))
        }else(
            errors.email='User Not Found'
        )
        setFormErrors(errors)
    })
    runValidation()
    if(Object.keys(errors).length===0){
        setFormErrors({})
      
    }else{
        setFormErrors(errors)
    }
    
}
    return(
        <div className='container m-5'>
            <div className='card row align-items-center bg-secondary'> 
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='form-group'>
                <input className="form-control" type='text' value={email} onChange={handleChange} />
                {formErrors.email && <span style={{color:'red'}}> {formErrors.email} </span> }
                <br/>
                 {login && <Link to={`/users/${id}`}><input type='submit' /></Link> }    
              
            </form>
            </div>
        
        </div>
    )
}

export default LoginPage