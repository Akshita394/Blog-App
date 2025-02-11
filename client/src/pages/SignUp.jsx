import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username'/>
              <TextInput
               type='text'
               placeholder='Username'
               id='username'
              />
            </div>
            <div>
              <Label value='Your Email'/>
              <TextInput
               type='text'
               placeholder='example@email.com'
               id='email'
              />
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput
               type='text'
               placeholder='Password'
               id='password'
              />
            </div>
            <Button gradientDuoTone='tealToLime' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>
              Have an account?
            </span>
            <Link to='/sign-in' className='text-blue-500'>
              SignIn
            </Link>
          </div>
        </div>
      </div>  
    </div>
  )
}
