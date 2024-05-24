import { Navigate, useNavigate } from "react-router-dom";
// import "./profilemenu.css";
import './profilemenu.css'
import { useState } from "react";
import { IoIosContact } from "react-icons/io";
import { Avatar, Button, Menu } from "@mantine/core";
import { replace } from "lodash";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false); // State to track whether the dropdown is open
  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <Menu width={"100px"} shadow="md">
        <Menu.Target>
          <Avatar src={user?.picture} alt="user image" radius={"xl"} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>Favourites</Menu.Item>
          <Menu.Item onClick={() => navigate("./booking", { replace: true })}>
            Bookings
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              localStorage.clear();
              logout();
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
