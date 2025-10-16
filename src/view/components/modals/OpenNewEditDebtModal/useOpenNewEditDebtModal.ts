import useToggle from "@/app/hooks/useToggle";

export function useOpenEditNewDebtModal() {
    const { isToggled,toggle } = useToggle();

    return {
        isOpen: isToggled,
        toggleEditDebtModal: toggle,
    };  
}