import { useState } from "react";
import { useLocation } from "wouter";
import SideBarIcon from "./SideBarIcon";
import { theme } from "../../../core/config/theme";
import logo from "../../../assets/images/logo.png";
import settingsIcon from "../../../assets/images/settings.png";
import addStudent from "../../../assets/images/add-student.png";
import home from "../../../assets/images/home.png";
import profile from "../../../assets/images/profile.png";

function SideBar() {
  const [location, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navigationItems = [
    { iconName: "home", 
      label: "Inicio", 
      path: "/students-list", 
      icon: home },
    { 
      iconName: "profile",
      label: "Perfil",
      path: "/profile",
      icon: profile,
    },
    { 
      iconName: "home", 
      label: "Registrar estudiante", 
      path: "/register-student", 
      icon: addStudent }
  
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <div
      className={`fixed left-5 top-4 bottom-4 z-50 text-white transition-all duration-300 ease-in-out  ${
        isCollapsed ? "w-18" : "w-64"
      } flex flex-col shadow-2xl rounded-xl`}
      style={{ background: theme.colors.primary.pink }}
    >
      {/* Header/Logo */}
      <div className="flex justify-center pt-4 pb-18">
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-pink-400/30 transition-colors hover:cursor-pointer"
        >
          <SideBarIcon
            altText="logo"
            size={50}
            logoSrc={logo}
            isCollapsed={isCollapsed}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.path)}
            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 hover:cursor-pointer ${
              isCollapsed ? 'justify-center' : 'justify-start'
            } ${
              location === item.path
                ? "bg-white/20 text-white shadow-lg"
                : "hover:bg-white/10 text-pink-100 hover:text-white"
            }`}
          >
            <SideBarIcon
              iconName={item.label}
              size={24}
              isCollapsed={isCollapsed}
              logoSrc={item.icon}
            />
          </button>
        ))}
      </nav>

      <div className={`p-4 mb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <SideBarIcon
          altText="settings"
          size={25}
          logoSrc={settingsIcon}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}

export default SideBar;
