import DeleteModal from "../DeleteModal/DeleteModal";
import { useDeleteTransactionModal } from "./useDeleteTransactionModal";


interface DeleteTransactionModalProps {
  isOpenDeleteTransactionModal: boolean;
  onCloseDeleteTransactionModal: () => void;
}

const DeleteTransactionModal = ({
  isOpenDeleteTransactionModal,
  onCloseDeleteTransactionModal,
}: DeleteTransactionModalProps) => {
  const { handleSubmit, isLoading } = useDeleteTransactionModal();

  return (
  <DeleteModal open={isOpenDeleteTransactionModal} isLoading={isLoading} onConfirm={handleSubmit} onClose={onCloseDeleteTransactionModal} title="Você tem certeza que deseja excluir essa transação?" description="Ao excluir a transação, todos os dados serão pedidos e você tera que refaze-la se quiser."/>
  );
};

export default DeleteTransactionModal;
