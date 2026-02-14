  
import { MenuIcon } from "lucide-react"
import { useRef, useState } from "react";
import { localStorageKeys } from "@/app/config/localStorageKeys";

const MenuDropdown = () => {
    function handleLogout() {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        window.location.href = '/signin';
    }
    
    const [isToggled, setIsToggled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);   
  return (
    <button onClick={() => setIsToggled(!isToggled)}>
          <MenuIcon className="h-6 w-6 text-teal-900 cursor-pointer" />
            <div className="absolute z-50 top-10 right-0 flex flex-col gap-3 items-end" ref={dropdownRef}>
           {isToggled && (
        <ul className="flex flex-col bg-gray-100 p-1 rounded-md w-full border-b-4 border-b-teal-600 min-w-[10rem] z-50">
          <li
            className="font-roboto cursor-pointer text-gray-800 p-2 transition hover:bg-gray-200 rounded"
            onClick={handleLogout}
          >
            Sair da conta
          </li>

          
        </ul>
      )}

    </div>
        </button>
  )
}

export default MenuDropdown