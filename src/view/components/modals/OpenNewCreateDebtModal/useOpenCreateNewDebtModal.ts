import useToggle from "@/app/hooks/useToggle";

export function useOpenCreateNewDebtModal() {
    const { isToggled,toggle } = useToggle();

    return {
        isOpen: isToggled,
        toggleCreateDebtModal: toggle,
    };  
}