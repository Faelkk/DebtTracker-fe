import useToggle from "@/app/hooks/useToggle";

export function useBtnAction() {
  const toggleDebt = useToggle();
  const togglePayment = useToggle();

  return {
    toggleDebt,
    togglePayment,
  };
}
