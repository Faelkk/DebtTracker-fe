import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import useToggle from "@/app/hooks/useToggle";

interface BtnActionsProps {
  toggleCreateDebtModal: () => void;
  togglePaymentModal: () => void;
}

const BtnActions = ({ toggleCreateDebtModal,togglePaymentModal }: BtnActionsProps) => {
  const { isToggled, setIsToggled, toggle } = useToggle();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToggled(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsToggled]);


  const handleOptionClick = (action: () => void) => {
    action();    
    setIsToggled(false); 
  };

  return (
    <div className="absolute bottom-2 right-2 flex flex-col gap-3 items-end" ref={dropdownRef}>
      {isToggled && (
        <ul className="flex flex-col bg-gray-100 p-3 rounded w-full border-b-4 border-b-teal-600 min-w-[10rem] z-50">
          <li
            className="font-roboto cursor-pointer text-gray-800 px-2 py-2 transition hover:bg-gray-200 rounded"
            onClick={() => handleOptionClick(toggleCreateDebtModal)}
          >
            Criar dívida
          </li>
          <li
            className="font-roboto cursor-pointer text-gray-800 px-2 py-2 transition hover:bg-gray-200 rounded"
            onClick={() => handleOptionClick(() => handleOptionClick(togglePaymentModal))}
          >
            Fazer Pagamento
          </li>
        </ul>
      )}

      <button
        className="bg-teal-700 shadow-md rounded-full w-8 h-8 flex items-center justify-center relative transition-colors cursor-pointer"
        onClick={toggle} 
      >
        <Plus className="w-8 h-8 text-gray-50" />
      </button>
    </div>
  );
};

export default BtnActions;
