import React, { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { reactIcons } from "components/utils/icons";
import { useRouter } from "next/router";
import { message } from "antd";
import Image from "next/image";
import web3 from "/public/assets/images/web3logo.png"

const ProfileDropdown = ({ onClick }) => {
  const [user, setUser] = useState(null);
//   const dropdownOptions1 = [
//     { title: "My Account", url: "/users/me", icon: reactIcons.user },
//     { title: "Logout", url: "#", icon: reactIcons.logout },
//   ];
  const dropdownOptions2 = [
    { title: "Login", url: "/login", icon: reactIcons.logout },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
    // if (!token) {
    //   window.location.href = '/login';
    // }
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const logOutBtn = () => {
    localStorage.removeItem("token");
    message.success("Logout Successfully!");
    //router.push("/login");
    router.replace( // or push or whatever you want
      {
        pathname: "/login",
        // hash: newHash,
        // query: window.location.search,
      },
      null,
      {
        shallow: true,
      }
    )
    .catch((e) => {
      // workaround for https://github.com/vercel/next.js/issues/37362
      if (!e.cancelled) {
        throw e
      }
    })
    
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {user ? (
        <>
          {/* <div onClick={handleClick} className="bg-primary-hoverBg cursor-pointer w-8 h-8 rounded-full relative overflow-hidden">
                <Image src={web3} fill className='object-cover' />
          </div> */}
          <button
            id="basic-button"
            className="btn h-[50px] w-[50px] p-2 text-16"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
             {/* <Image src={web3} className='object-cover' /> */}
            {reactIcons.user}
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            style={{ marginTop: "10px" }}
          >
           <MenuItem onClick={handleClose} className="!p-0" >
                {/* <Link className="py-1 px-3 w-full flex items-center gap-2" href={'/users/me'} onClick={onClick}>
                {reactIcons.user}My Account
                </Link> */}
                     <Link className="py-1 px-3 w-full flex items-center gap-2" href={'/profile'} onClick={onClick}>
                {reactIcons.user}My Account
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} className="!p-0">
                <Link className="py-1 px-3 w-full flex items-center gap-2" href={'#'} onClick={logOutBtn}>
                {reactIcons.logout}Logout
                </Link>
              </MenuItem>
          </Menu>
        </>
      ) : (
          <>
                            <div className="flex flex-col gap-4 px-4 xl2:px-10">   
                    <Link href={'/login'} className='bg-blue-900 flex items-center justify-center border-2 border-white h-[48px] md:h-[37px] rounded-full  px-5 w-full text-15 text-white hover:text-white'>Login | Register</Link>
                </div>
          {/* <button
            id="basic-button"
            className="btn h-[50px] w-[50px] p-2 text-16"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {reactIcons.user}
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            style={{ marginTop: "20px" }}
          >
            {dropdownOptions2.map((option) => (
              <MenuItem key={option.title} onClick={handleClose} className="!p-0">
                <Link className="py-1 px-3 w-full flex items-center gap-2" href={option.url} onClick={onClick}>
                {option.icon}{option.title}
                </Link>
              </MenuItem>
            ))}
          </Menu> */}
        </>
      )}
    </>
  );
};

export default ProfileDropdown;
