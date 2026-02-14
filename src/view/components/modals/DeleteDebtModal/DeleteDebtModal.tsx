import DeleteModal from "../DeleteModal/DeleteModal";
import { useDeleteDebtModal } from "./useDeleteDebtModal";



interface DeleteDebtModalProps {
  debtId: string
  isOpenDeleteDebtModal: boolean;
  onCloseDeleteDebtModal: () => void;
}

const DeleteDebtModal = ({
  debtId,
  isOpenDeleteDebtModal,
  onCloseDeleteDebtModal,
}: DeleteDebtModalProps) => {
  const { handleSubmit, isLoading } = useDeleteDebtModal();

  function onConfirm() {
    handleSubmit(debtId)
    onCloseDeleteDebtModal()
  }

  return (
  <DeleteModal open={isOpenDeleteDebtModal} isLoading={isLoading} onConfirm={onConfirm} onClose={onCloseDeleteDebtModal} title="Você tem certeza que deseja excluir essa divida?" description="Ao excluir a divida, tambem serão excluidos todos os
                registros de pagamentos e parcelas relacionadas"/>
  );
};

export default DeleteDebtModal;
