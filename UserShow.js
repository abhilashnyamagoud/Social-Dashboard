import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserShow=(props)=>{
const[post,setPost]=useState([])
const[user,setUser]=useState({})
const[logout,setLogout]=useState('')
const[localData,setLocalData]=useState([])
const {id}=props.match.params
    useEffect(()=>{
        const result=JSON.parse(localStorage.getItem('formData'))||[]
        setLocalData(result)
    },[])

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((responce)=>{
            const result=responce.data
            setUser(result)
        })
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((responce)=>{
            const result=responce.data
            setPost(result)
        })
    },[id])
   
    const handleClick=()=>{
        setUser({})
        setPost([])
        localStorage.clear()
    }
    return(
        <div className='container'>
        <div className='card'>
       <Link className='btn btn-secondary text-right' to='/'><button className='btn-primary' onClick={handleClick} value={logout} >Logout</button></Link>  
        </div>
        <div className='card mt-5 mb-5 bg-secondary p-3 text-white'>
        <div className='row'>
            <div className='col-md-7 ml-3'>
        <h2>Name:{user.name} </h2>
        <p>Email:{user.email} </p>
        <p>Phone:{user.phone} </p>
        </div>
        <div className='col'>
        <h2>Compeny Name</h2>
        <p>Compeny:{user.company && user.company.name} </p>
        <p>catchPhrase:{user.company && user.company.catchPhrase} </p>
        </div>
        </div>
        </div>
        <div style={{border:'3px solid black'}}>
            {
                post.map((ele)=>{
                    return(
                        <div key={ele.id} className='card m-5 bg-secondary'>
                            <div className='card-title'>
                            <h3 className='m-3'>{ele.title} </h3>
                            </div>
                            <div className='card-body'>
                            <p>{ele.body} </p>
                        </div>
                            </div>
                    )
                })
            }
        </div>
        </div>
    )
}

export default UserShow