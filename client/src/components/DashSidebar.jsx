import { Sidebar } from "flowbite-react";
import { HiArrowRight, HiDocumentText, HiOutlineUser, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"; 
export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/user/signout", { 
            method: 'POST',
            credentials: "include",
          })
          const data = res.json();
          if(!res.ok){
            console.error(data.message);
          }
          else{
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="white"
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              label={"Posts"}
              labelColor="white"
              as='div'
            >
              Posts
            </Sidebar.Item>
          </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
            <Sidebar.Item
              active={tab === "users"}
              icon={HiOutlineUserGroup}
              label={"Users"}
              labelColor="white"
              as='div'
            >
              Users
            </Sidebar.Item>
          </Link>
          )}
         
          <Sidebar.Item  icon={HiArrowRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
