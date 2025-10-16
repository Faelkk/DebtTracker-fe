import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import useToggle from "@/app/hooks/useToggle";

const FILTERS = [
  "Maior valor",
  "Menor valor",
  "Mais antiga",
  "Mais recente",
  "Limpar Filtros",
];

interface DropdownFilterDebtProps {
  activeFilter: string;
  onSelect: (filter: string) => void;
}

const DropdownFilterDebt = ({
  activeFilter,
  onSelect,
}: DropdownFilterDebtProps) => {
  const { isToggled, setIsToggled, toggle } = useToggle();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsToggled(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsToggled]);

  function handleSelectFilter(filter: string) {
    onSelect(filter === "Limpar Filtros" ? "" : filter);
    setIsToggled(false);
  }

  function handleContainerClick(e: React.MouseEvent) {
    e.stopPropagation(); 
    toggle(); 
  }

  return (
    <div
      ref={dropdownRef}
      onClick={handleContainerClick}
      className="bg-gray-100 rounded-lg text-gray-700 px-3 h-[3.25rem] flex items-center relative cursor-pointer gap-3 font-roboto justify-between text-sm select-none"
    >
      <span className="flex items-center gap-2">
        {activeFilter || "Filtrar por"}
        <ArrowDown className="w-4 h-4 ml-1 relative" />
      </span>

      {isToggled && (
        <ul className="flex flex-col absolute bg-gray-200 top-0 left-0 mt-14 p-3 rounded w-full border-b-4 border-b-teal-600 min-w-[10rem] z-50">
          {FILTERS.map((filter) => (
            <li
              key={filter}
              onClick={(e) => {
                e.stopPropagation(); // evita reabrir
                handleSelectFilter(filter);
              }}
              className={`px-2 py-2 transition hover:bg-gray-100 rounded cursor-pointer ${
                activeFilter === filter ? "bg-gray-300 font-medium" : ""
              }`}
            >
              {filter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilterDebt;
