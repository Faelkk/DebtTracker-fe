
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";

import { useDebts } from "@/app/hooks/useDebts";
import { useOpenCreateNewDebtModal } from "@/view/components/modals/OpenNewCreateDebtModal/useOpenCreateNewDebtModal";
import { useOpenEditNewDebtModal } from "@/view/components/modals/OpenNewEditDebtModal/useOpenNewEditDebtModal";


const useDebtSectionController = () => {
    const windowWidth = useWindowWidth();

    const { toggleCreateDebtModal } = useOpenCreateNewDebtModal();
    const { toggleEditDebtModal } = useOpenEditNewDebtModal();

    const { debts, isLoading } = useDebts();



    return {
        toggleCreateDebtModal,
        windowWidth,
        isLoading,
        toggleEditDebtModal,
        debts,

    };
};

export default useDebtSectionController;