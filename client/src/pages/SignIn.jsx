import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInFailure,signInSuccess,signInStart} from '../redux/user/userSlice'
import {useDispatch , useSelector} from'react-redux'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData,setFormData] = useState({});
  const  {loading, error:errorMessage} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({... formData,[e.target.id]: e.target.value.trim()})
  } 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.password || !formData.email){
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try{
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
    
      if(data.success === false){
        dispatch(signInFailure(data.message))
      }
      
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    }catch(error){
        dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        
        <div className="flex-1">
        {/* left */}
          <Link
          to='/'
          className="  font-bold dark:text-white text-4xl"
          >
          <span className="px-2 py-1 bg-gradient-to-r from-yellow-200 via-lime-300 to-emerald-400 rounded-lg text-white">
            Muze
          </span>
          Space
          </Link>
          <p className='text-sm mt-5'>
            Write, Share, Inspire – Your Stories, Your Voice, Your Blog
          </p>
        </div>
      
        <div className='flex-1'>
         {/* right */}
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
           
            <div>
              <Label value='Your Email' />
              <TextInput
               type='email'
               placeholder='example@email.com'
               id='email'
               autoComplete='email' 
               onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
               type='password'
               placeholder='*********'
               id='password'
               autoComplete='current-password'
               onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='tealToLime' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'> loading...</span>
                  </>
                ): 'Sign In'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>
              Dont have an account?
            </span>
            <Link to='/sign-up' className='text-blue-500'>
              SignUp
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>  
    </div>
  )
}

