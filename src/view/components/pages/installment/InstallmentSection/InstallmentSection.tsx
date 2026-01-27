import { ArrowLeft, LoaderCircle, PlusIcon } from 'lucide-react'

import DropdownFilterInstallment from '../Dropdown/DropdownFilterInstallment'
import InstallmentsCard from '../InstallmentCard/InstallmentCard'
import InputSearchInstallment from '../Input/InputSearchInstallment'
import useInstallmentSectionController from './useInstallmentSectionController'

import OpenNewCreateDebtModal from '@/view/components/modals/OpenNewCreateDebtModal/OpenNewCreateDebtModal'
import BtnActions from '@/view/components/common/BtnActions/BtnActions'
import OpenNewPaymentModal from '@/view/components/modals/OpenNewPaymentModal/OpenNewPaymentModal'

const InstallmentsSection = () => {
  const {
    Installments,
    isLoading,
    activeFilter,
    isOpenDebtModal,
    isOpenPaymentModal,
    toggleCreateDebtModal,
    togglePaymentModal,
    setSearchTerm,
    setActiveFilter,
    debt,
    user,
    userIsLoading,
    debtIsLoading,
  } = useInstallmentSectionController()

  if (isLoading || userIsLoading || debtIsLoading) {
    return (
      <main className="bg-teal-900 rounded-2xl h-full w-full flex items-center justify-center flex-1">
        <LoaderCircle className="text-gray-50 w-10 h-10 animate-spin" />
      </main>
    )
  }

  if (!debt) {
    return (
      <main className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 md:p-10 mt-10 flex flex-col">
        <div className="flex w-full h-full items-center justify-center">
          <button
            className="h-52 border-2 border-teal-600 border-dashed rounded-2xl
            flex flex-col items-center justify-center gap-4 text-white w-full"
            onClick={toggleCreateDebtModal}
          >
            <div className="w-12 h-12 rounded-full border-dashed border-2 border-white flex justify-center items-center">
              <PlusIcon className="w-6 h-6" />
            </div>
            <span className="tracking-[-0.5px] font-medium block w-32 text-center font-roboto">
              Cadastre uma nova dívida
            </span>
          </button>
        </div>

        <OpenNewCreateDebtModal
          isOpen={isOpenDebtModal}
          toggleCreateDebtModal={toggleCreateDebtModal}
        />
      </main>
    )
  }

  return (
    <main className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 md:p-10 mt-10 flex flex-col flex-1 relative max-h-[89vh] overflow-hidden">
      <section className="flex flex-col flex-1 overflow-hidden">
        <header className="flex flex-col 2xl:flex-row 2xl:items-center gap-2 justify-between w-full shrink-0">
          <div> 
          <div className='flex items-center gap-2'>
            <ArrowLeft className="text-gray-300 w-6 h-6 cursor-pointer" onClick={() => window.history.back()} />   <h2 className='font-roboto text-gray-300'> Voltar</h2>
          </div>
          <div className='mt-10'>
            <h2 className="font-poppins text-gray-50 font-medium text-xl">
              Minhas parcelas
            </h2>
            <span className="font-roboto text-gray-300">
              Clique em uma parcela para ver mais informações
            </span>
          </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 w-full justify-end mt-5">
            <DropdownFilterInstallment
              activeFilter={activeFilter}
              onSelect={setActiveFilter}
            />
            <div className="w-full sm:w-auto flex-1 2xl:max-w-[400px] xl:max-w-[600px]">
              <InputSearchInstallment onSearch={setSearchTerm} />
            </div>
          </div>
        </header>

        <div
          className="
            grid sm:grid-cols-2 2xl:grid-cols-3 5xl:grid-cols-4
            gap-10 mt-10 flex-1 overflow-y-auto pr-2 custom-scroll
          "
        >
          {Installments.map((installment) => (
            <InstallmentsCard
              key={installment.installmentId}
              debt={debt}    
              user={user}   
              Installments={installment}
              togglePaymentModal={togglePaymentModal}
            />
          ))}
        </div>
      </section>

      <BtnActions
        toggleCreateDebtModal={toggleCreateDebtModal}
        togglePaymentModal={togglePaymentModal}
      />

      <OpenNewCreateDebtModal
        isOpen={isOpenDebtModal}
        toggleCreateDebtModal={toggleCreateDebtModal}
      />

      <OpenNewPaymentModal
        isOpen={isOpenPaymentModal}
        togglePaymentModal={togglePaymentModal}
      />
    </main>
  )
}

export default InstallmentsSection
