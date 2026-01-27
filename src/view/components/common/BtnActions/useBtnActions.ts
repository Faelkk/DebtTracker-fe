import useToggle from "@/app/hooks/useToggle";

export function useBtnAction() {
  const toggleDebt = useToggle();
  const togglePayment = useToggle();
  const toggleDeleteDebt = useToggle();
  const toggleEditDebtModal = useToggle();

  return {
    toggleDebt,
    togglePayment,
    toggleDeleteDebt,
    toggleEditDebtModal,
  };
}
