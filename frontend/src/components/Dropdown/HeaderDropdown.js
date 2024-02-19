import React, { useState } from "react";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const HeaderDropdown = ({onClick}) => {
  const dropdownOptions = [
    { title: "About", url: "/about" },
    { title: "Blog", url: "/blog" },
    { title: "FAQ", url: "/faqs" },
    { title: "Pricing", url: "/home#pricing" },
    { title: "White Paper", url: "/documents/whitepaper.pdf" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <button
        id="basic-button"
        className="text-16 py-3"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Resources
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{marginTop: '20px'}}
      >
        {dropdownOptions.map((option) => (
          <MenuItem key={option.title} onClick={handleClose} className="!p-0">
            <Link href={option.url} onClick={onClick} className="py-1 px-3 w-full">{option.title}</Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default HeaderDropdown;
