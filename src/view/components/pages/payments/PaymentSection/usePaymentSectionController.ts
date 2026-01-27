import { useMemo,useState } from "react";
import { useSearch } from "@tanstack/react-router";



import { useBtnAction } from "@/view/components/common/BtnActions/useBtnActions";
import { usePayments } from "@/app/hooks/usePayments";




const usePaymentSectionController = () => {
  const {toggleDebt,togglePayment,toggleEditDebtModal} = useBtnAction()

  const search = useSearch({ from: '/payments' });
  const debtId = search.debtId;
  const installmentId = search.installmentId;

  console.log('debtId', debtId,"installmentId", installmentId);

  const { Payments, isLoading } = usePayments();



  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filteredPayments = useMemo(() => {
    let result = [...Payments];

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter((Payment) =>
        Payment.Amount.toString().includes(term) ||
       new Date(Payment.PaidAt).toLocaleDateString().includes(term)
      );
    }
    switch (activeFilter) {
      case "Maior valor":
        result.sort((a, b) => b.Amount - a.Amount);
        break;
        case "Menor valor":
        result.sort((a, b) => a.Amount - b.Amount);
        break;
       case "Mais recente":
        result.sort(
          (a, b) =>
            new Date(a.PaidAt).getTime() - new Date(b.PaidAt).getTime()
        );
        break;
         case "Mais antigo":
        result.sort(
          (a, b) =>
            new Date(b.PaidAt).getTime() - new Date(a.PaidAt).getTime()
        );
        break;
      default:
        break;
    }

    return result;
  }, [Payments, searchTerm, activeFilter]);

  return {
    toggleCreateDebtModal: toggleDebt.toggle,
    isOpenDebtModal: toggleDebt.isToggled,
    togglePaymentModal: togglePayment.toggle,
    isOpenPaymentModal: togglePayment.isToggled,
    toggleEditPaymentModal: toggleEditDebtModal.toggle,
    isToggleEditPaymentModal: toggleEditDebtModal.isToggled,
    isLoading,
    Payments: filteredPayments,
    setSearchTerm,
    setActiveFilter,
    activeFilter,
  };
};

export default usePaymentSectionController;
 