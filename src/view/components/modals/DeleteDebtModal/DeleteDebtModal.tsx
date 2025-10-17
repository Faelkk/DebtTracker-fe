import DeleteModal from "../DeleteModal/DeleteModal";
import { useDeleteDebtModal } from "./useDeleteDebtModal";



interface DeleteDebtModalProps {
  isOpenDeleteDebtModal: boolean;
  onCloseDeleteDebtModal: () => void;
}

const DeleteDebtModal = ({
  isOpenDeleteDebtModal,
  onCloseDeleteDebtModal,
}: DeleteDebtModalProps) => {
  const { handleSubmit, isLoading } = useDeleteDebtModal();

  return (
  <DeleteModal open={isOpenDeleteDebtModal} isLoading={isLoading} onConfirm={handleSubmit} onClose={onCloseDeleteDebtModal} title="Você tem certeza que deseja excluir essa divida?" description="Ao excluir a divida, tambem serão excluidos todos os
                registros de pagamentos e parcelas relacionadas"/>
  );
};

export default DeleteDebtModal;
