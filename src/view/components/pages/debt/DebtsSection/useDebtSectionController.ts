import { useMemo,useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDebts } from "@/app/hooks/useDebts";
import { useOpenCreateNewDebtModal } from "@/view/components/modals/OpenNewCreateDebtModal/useOpenCreateNewDebtModal";
import { useOpenEditNewDebtModal } from "@/view/components/modals/OpenNewEditDebtModal/useOpenNewEditDebtModal";


const useDebtSectionController = () => {
  const windowWidth = useWindowWidth();
  const { toggleCreateDebtModal } = useOpenCreateNewDebtModal();
  const { toggleEditDebtModal } = useOpenEditNewDebtModal();
  const { debts, isLoading } = useDebts();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filteredDebts = useMemo(() => {
    let result = [...debts];

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter((debt) =>
        debt.description.toLowerCase().includes(term) ||
        debt.totalAmount.toString().includes(term) ||
        new Date(debt.createdAt).toLocaleDateString().includes(term) ||
        new Date(debt.dueDate).toLocaleDateString().includes(term)
      );
    }
    switch (activeFilter) {
      case "Maior valor":
        result.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case "Menor valor":
        result.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
      case "Mais antiga":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "Mais recente":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return result;
  }, [debts, searchTerm, activeFilter]);

  return {
    toggleCreateDebtModal,
    windowWidth,
    isLoading,
    toggleEditDebtModal,
    debts: filteredDebts,
    setSearchTerm,
    setActiveFilter,
    activeFilter,
  };
};

export default useDebtSectionController;
