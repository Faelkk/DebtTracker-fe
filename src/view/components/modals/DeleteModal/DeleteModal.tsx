
import { Trash } from 'lucide-react'
import Modal from '../modal'
import Button from '../../common/Button'


interface ConfirmDeleteModalProps {
    open: boolean
    onConfirm: () => void;
    onClose: () => void;
    title: string;
    description?: string;
    isLoading: boolean;
}

const DeleteModal = ({open,title,description,isLoading,onClose,onConfirm}: ConfirmDeleteModalProps) => {
  return (
 <Modal open={open} title="Excluir" onClose={onClose}>
            <div className="flex flex-col items-center text-center gap-6">
                <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex justify-center items-center">
                    <Trash className="w-6 h-6 text-red-900" />
                </div>
                <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
                    {title}
                </p>
                <p className="tracking-[-0.5px] text-gray-800">{description}</p>
            </div>

            <div className="mt-10 space-y-4">
                <Button
                    className="w-full"
                    variant="danger"
                    onClick={onConfirm}
                    isLoading={isLoading}
                >
                    Sim, desejo excluir
                </Button>
                <Button
                    className="w-full"
                    variant="ghost"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {" "}
                    Cancelar
                </Button>
            </div>
        </Modal>
  )
}

export default DeleteModal