import { useMemo, useState } from 'react'
import { useSearch } from '@tanstack/react-router'

import { useInstallments } from '@/app/hooks/useInstallments'
import { useBtnAction } from '@/view/components/common/BtnActions/useBtnActions'
import { useUser } from '@/app/hooks/useUser'
import { useDebtId } from '@/app/hooks/useDebtById'

const useInstallmentSectionController = () => {
  const { toggleDebt, togglePayment, toggleEditDebtModal } = useBtnAction()

  const search = useSearch({ from: '/installments' })
  const debtId = search.debtId

  const { Installments, isLoading } = useInstallments()

  const { user, isLoading: userIsLoading } = useUser()
  const { debt, isLoading: debtIsLoading } = useDebtId(debtId as string)

  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('')

  const filteredInstallments = useMemo(() => {
    let result = [...Installments]

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (Installment) =>
          Installment.amount.toString().includes(term) ||
          Installment.paidAmount.toString().includes(term) ||
          new Date(Installment.dueDate).toLocaleDateString().includes(term),
      )
    }
    switch (activeFilter) {
      case 'Total quantia':
        result.sort((a, b) => b.amount - a.amount)
        break
      case 'Valor pago':
        result.sort((a, b) => a.paidAmount - b.paidAmount)
        break
      case 'Vencimento':
        result.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        )
        break
      default:
        break
    }

    return result
  }, [Installments, searchTerm, activeFilter])

  return {
    toggleCreateDebtModal: toggleDebt.toggle,
    isOpenDebtModal: toggleDebt.isToggled,
    togglePaymentModal: togglePayment.toggle,
    isOpenPaymentModal: togglePayment.isToggled,
    toggleEditInstallmentModal: toggleEditDebtModal.toggle,
    isToggleEditInstallmentModal: toggleEditDebtModal.isToggled,
    isLoading,
    Installments: filteredInstallments,
    setSearchTerm,
    setActiveFilter,
    activeFilter,
    user,
    debt,
    userIsLoading,
    debtIsLoading,
  }
}

export default useInstallmentSectionController
