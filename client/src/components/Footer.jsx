import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook,BsInstagram,BsTwitter,BsGithub, BsDribbble} from 'react-icons/bs'
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1col-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-200 via-lime-300 to-emerald-400 rounded-lg text-white">
                Muze
              </span>
              Space
            </Link>
          </div>
          <div className="grid grid-cols-2  gap-8  mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link>Projects</Footer.Link>
                <Footer.Link>More Blogs</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link>Github</Footer.Link>
                <Footer.Link>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link>Privacy policy</Footer.Link>
                <Footer.Link>Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
          
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="MuzeSpace"
            year={new Date().getFullYear()}
          />
          <div className=" flex gap-6 sm:mt-0 mt-4 sm:justify-center" >
            <Footer.Icon href="#" icon={BsFacebook}/>
            <Footer.Icon href="#" icon={BsInstagram}/>
            <Footer.Icon href="#" icon={BsTwitter}/>
            <Footer.Icon href="#" icon={BsGithub}/>
            <Footer.Icon href="#" icon={BsDribbble}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
