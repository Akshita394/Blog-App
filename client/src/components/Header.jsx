import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link ,useLocation} from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import{ FaMoon} from 'react-icons/fa'
import 'flowbite/dist/flowbite.css';


export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2 '>
      <Link
        to='/'
        className="self-center whitespace-nowrap text-sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-yellow-200 via-lime-300 to-emerald-400 rounded-lg text-white">
          Muze
        </span>
        Space
      </Link>
       <form>
        <TextInput 
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className="hidden lg:block"
        />
      </form>
      <Button className='w-12 h-10  lg:hidden' color='gray' pill>
        <AiOutlineSearch/>
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className="w-12 h-10 hidden sm:block " color='gray'  pill>
          <FaMoon/>
        </Button>
        <Link to='/sign-in'>
          <Button gradientDuoTone='tealToLime' outline={false} >
            SignIn
          </Button>
        </Link>
        <Navbar.Toggle/>
      </div> 
      <Navbar.Collapse>
          <Navbar.Link active={path === '/'}as={'div'} className="text-black background-color: #">
            <Link to='/'>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'} className="text-black">
            <Link to='/about'>
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/projects'} as={'div'} className="text-black">
            <Link to='/projects' >
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
        
    </Navbar>
  );
}

