import { useMemo, useState } from 'react'
import { useSearch } from '@tanstack/react-router'

import { useBtnAction } from '@/view/components/common/BtnActions/useBtnActions'
import { usePayments } from '@/app/hooks/usePayments'
import { useDebtId } from '@/app/hooks/useDebtById'

const usePaymentSectionController = () => {
  const { toggleDebt, togglePayment, toggleEditDebt } = useBtnAction()

  const search = useSearch({ from: '/payments' })
  const debtId = search.debtId
  const installmentId = search.installmentId

  if(!debtId || !installmentId) {
    throw new Error('debtId and installmentId are required in the search parameters')
  }

  const { Payments, isLoading } = usePayments(debtId, installmentId)


  const { debt, isLoading: debtIsLoading } = useDebtId(debtId)

  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('')

  const filteredPayments = useMemo(() => {
    let result = [...Payments]

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (Payment) =>
          Payment.amount.toString().includes(term) ||
          new Date(Payment.paidAt).toLocaleDateString().includes(term),
      )
    }
    switch (activeFilter) {
      case 'Maior valor':
        result.sort((a, b) => b.amount - a.amount)
        break
      case 'Menor valor':
        result.sort((a, b) => a.amount - b.amount)
        break
      case 'Mais recente':
        result.sort(
          (a, b) => new Date(a.paidAt).getTime() - new Date(b.paidAt).getTime(),
        )
        break
      case 'Mais antigo':
        result.sort(
          (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime(),
        )
        break
      default:
        break
    }

    return result
  }, [Payments, searchTerm, activeFilter])

  return {
    toggleCreateDebtModal: toggleDebt.toggle,
    isOpenDebtModal: toggleDebt.isToggled,
    togglePaymentModal: togglePayment.toggle,
    isOpenPaymentModal: togglePayment.isToggled,
    toggleEditPaymentModal: toggleEditDebt.toggle,
    isToggleEditPaymentModal: toggleEditDebt.isToggled,
    isLoading,
    Payments: filteredPayments,
    setSearchTerm,
    setActiveFilter,
    activeFilter,
    debt,debtIsLoading
  }
}

export default usePaymentSectionController
