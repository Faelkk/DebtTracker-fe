import { LogOut, MenuIcon } from "lucide-react";
import { useEffect,useRef, useState } from "react";
import { localStorageKeys } from "@/app/config/localStorageKeys";

const MenuDropdown = () => {
  const [isToggled, setIsToggled] = useState(false);


  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleLogout() {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    window.location.href = "/signin";
  }


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsToggled(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsToggled(!isToggled)}
        className="cursor-pointer"
      >
        <MenuIcon className="h-6 w-6 text-teal-900" />
      </button>

      {isToggled && (
        <ul
          ref={dropdownRef}
          className="flex flex-col absolute right-0 mt-2 p-2 bg-woodsmoke-800   transition rounded min-w-[10rem] z-50 shadow-lg"
        >
          <li
            className="flex p-2 rounded cursor-pointer font-roboto text-woodsmoke-100 hover:text-woodsmoke-300 font-medium gap-2"
            onClick={handleLogout}
          >
            <LogOut />
            Sair da conta
          </li>
        </ul>
      )}
    </div>
  );
};

export default MenuDropdown;