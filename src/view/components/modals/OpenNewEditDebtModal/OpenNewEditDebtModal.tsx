import { Check } from 'lucide-react'
import Modal from '../modal'
import Button from '../../common/Button'
import { useOpenEditNewDebtModal } from './useOpenNewEditDebtModal'

interface ConfirmDebtModalProps {
  debtId: string
  isOpenEditDebtModal: boolean
  onCloseEditDebtModal: () => void
}

const OpenNewEditDebtModal = ({
  debtId,
  isOpenEditDebtModal,
  onCloseEditDebtModal,
}: ConfirmDebtModalProps) => {
  const { onConfirm, isLoading } = useOpenEditNewDebtModal()

  function handleConfirm() {
    onConfirm(debtId)
    onCloseEditDebtModal()
  }

  return (
    <Modal
      open={isOpenEditDebtModal}
      title="Confirmar"
      onClose={onCloseEditDebtModal}
    >
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-teal-50 flex justify-center items-center">
          <Check className="w-6 h-6 text-teal-900" />
        </div>
        <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
          Você deseja confirmar o pagamento da divida?
        </p>
        <p className="tracking-[-0.5px] text-gray-800">
          Verifique antes de pagar a divida se o pagamento de todas as parcelas
          foram efetuadas, caso necesssario é possivel editar o status da divida
          após essa ação.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          onClick={handleConfirm}
          isLoading={isLoading}
        >
          Sim, desejo confirmar
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={onCloseEditDebtModal}
          disabled={isLoading}
        >
          {' '}
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}

export default OpenNewEditDebtModal
