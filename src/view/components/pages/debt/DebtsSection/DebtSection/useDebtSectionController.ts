import { useMemo, useState } from 'react'
import { useBtnAction } from '../../../../common/BtnActions/useBtnActions'
import { useDebts } from '@/app/hooks/useDebts'
import { useUser } from '@/app/hooks/useUser'

const useDebtSectionController = () => {
  const { toggleDebt, togglePayment, toggleDeleteDebt, toggleEditDebtModal } =
    useBtnAction()
  const { debts, isLoading } = useDebts()
  const { user } = useUser()

  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('')

  const filteredDebts = useMemo(() => {
    let result = [...debts]

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (debt) =>
          debt.description.toLowerCase().includes(term) ||
          debt.totalAmount.toString().includes(term) ||
          new Date(debt.createdAt).toLocaleDateString().includes(term) ||
          new Date(debt.dueDate).toLocaleDateString().includes(term),
      )
    }
    switch (activeFilter) {
      case 'Maior valor':
        result.sort((a, b) => b.totalAmount - a.totalAmount)
        break

      case 'Menor valor':
        result.sort((a, b) => a.totalAmount - b.totalAmount)
        break

      case 'Mais antiga':
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        break

      case 'Mais recente':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break

      case "Pago":
        result = result.filter((debt) => debt.isPaid);
        break;

      case "Pendente":
        result = result.filter((debt) => !debt.isPaid);
        break;
      default:
        break
    }

    return result
  }, [debts, searchTerm, activeFilter])

  return {
    toggleCreateDebtModal: toggleDebt.toggle,
    isOpenDebtModal: toggleDebt.isToggled,
    togglePaymentModal: togglePayment.toggle,
    isOpenPaymentModal: togglePayment.isToggled,
    isOpenDeleteDebtModal: toggleDeleteDebt.isToggled,
    toggleDeleteDebtModal: toggleDeleteDebt.toggle,
    isLoading,
    toggleEditDebtModal: toggleEditDebtModal.toggle,
    isToggledEditDebtModal: toggleEditDebtModal.isToggled,
    debts: filteredDebts,
    setSearchTerm,
    setActiveFilter,
    activeFilter,
    user,
  }
}

export default useDebtSectionController
