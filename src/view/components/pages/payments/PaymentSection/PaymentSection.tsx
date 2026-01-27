import { LoaderCircle, PlusIcon } from 'lucide-react'






// import OpenNewCreatePaymentsModal from '@/view/components/modals/OpenNewCreatePaymentsModal/OpenNewCreatePaymentsModal'
// import OpenNewPaymentModal from '@/view/components/modals/OpenNewPaymentModal/OpenNewPaymentModal'
// import DeleteTransactionModal from '@/view/components/modals/DeleteTransactionModal/DeleteTransactionModal'
// import DeletePaymentsModal from '@/view/components/modals/DeletePaymentsModal/DeletePaymentsModal'
// import OpenNewEditPaymentsModal from '@/view/components/modals/OpenNewEditPaymentsModal/OpenNewEditPaymentsModal'

import DropdownFilterPayment from '../Dropdown/DropdownFilterPayment'
import InputSearchPayment from '../Input/InputSearchPayment'
import PaymentsCard from '../PaymentCard/PaymentCard'
import usePaymentSectionController from './usePaymentSectionController'
import OpenNewCreateDebtModal from '@/view/components/modals/OpenNewCreateDebtModal/OpenNewCreateDebtModal'
import BtnActions from '@/view/components/common/BtnActions/BtnActions'
import OpenNewPaymentModal from '@/view/components/modals/OpenNewPaymentModal/OpenNewPaymentModal'






const PaymentsSection = () => {
  const {
    Payments: Payment,
    isLoading,
    activeFilter,
    isOpenDebtModal,
    isOpenPaymentModal,isToggleEditPaymentModal,
    toggleCreateDebtModal,
    toggleEditPaymentModal,togglePaymentModal,
    setSearchTerm,
    setActiveFilter
    
  } = usePaymentSectionController();

  return (
<main className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 md:p-10 mt-10 flex flex-col flex-1 relative max-h-[89vh] overflow-hidden">
  {isLoading ? (
    <div className="flex items-center justify-center h-full w-full">
      <LoaderCircle className="text-gray-50 w-10 h-10 animate-spin" />
    </div>
  ) : (
    <section className="flex flex-col flex-1 overflow-hidden">
      <header className="flex flex-col 2xl:flex-row 2xl:items-center gap-2 justify-between w-full shrink-0">
        <div className="flex flex-col">
          <h2 className="font-poppins text-gray-50 font-medium text-xl">
            Meus pagamentos
          </h2>
          <span className="font-roboto text-gray-300">
            Clique em uma pagamento para ver mais informações
          </span>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 w-full justify-end mt-5">
          <DropdownFilterPayment activeFilter={activeFilter} onSelect={setActiveFilter} />
          <div className="w-full sm:w-auto flex-1 2xl:max-w-[400px] xl:max-w-[600px]">
            <InputSearchPayment onSearch={setSearchTerm} />
          </div>
        </div>
      </header>

      <div className="flex flex-col mt-10 flex-1 overflow-hidden">
        {Payment.length === 0 ? (
          <div className="flex w-full h-full flex-1 items-end justify-center">
            <button
              className="mt-4 h-52 border-2 border-teal-600 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 text-white w-full"
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
        ) : (
          <div
            className="
              grid sm:grid-cols-2 2xl:grid-cols-3 5xl:grid-cols-4
              gap-10
              flex-1
              overflow-y-auto
              overflow-x-hidden
              pr-2
              custom-scroll
              rounded-2xl
            "
          >
            {Payment.map((Payment) => (
              <PaymentsCard
                key={Payment.PaymentId}
                Payments={Payment}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )}

     <BtnActions toggleCreateDebtModal={toggleCreateDebtModal} togglePaymentModal={togglePaymentModal}/> 


      
      <OpenNewCreateDebtModal
        isOpen={isOpenDebtModal}
        toggleCreateDebtModal={toggleCreateDebtModal}
      />

         <OpenNewPaymentModal
        isOpen={isOpenPaymentModal}
        togglePaymentModal={togglePaymentModal}
      /> 


      {/* <DeleteTransactionModal isOpenDeleteTransactionModal={true} onCloseDeleteTransactionModal={() => (console.log("teste"))} /> */}

      {/* <DeleteDebtModal isOpenDeleteDebtModal={true} onCloseDeleteDebtModal={() => (console.log("teste"))} /> */}

      {/* <OpenNewEditDebtModal onCloseEditDebtModal={() => (console.log("teste"))} isOpenEditDebtModal={true}/> */}
</main>




  )
}

export default PaymentsSection
 