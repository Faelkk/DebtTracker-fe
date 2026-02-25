import { ArrowLeft, LoaderCircle, PlusIcon } from "lucide-react";

import DropdownFilterPayment from "../Dropdown/DropdownFilterPayment";
import InputSearchPayment from "../Input/InputSearchPayment";
import PaymentsCard from "../PaymentCard/PaymentCard";
import usePaymentSectionController from "./usePaymentSectionController";
import OpenNewCreateDebtModal from "@/view/components/modals/OpenNewCreateDebtModal/OpenNewCreateDebtModal";
import BtnActions from "@/view/components/common/BtnActions/BtnActions";
import OpenNewPaymentModal from "@/view/components/modals/OpenNewPaymentModal/OpenNewPaymentModal";

const PaymentsSection = () => {
  const {
    Payments,
    isLoading,
    activeFilter,
    isOpenDebtModal,
    debt,
    debtIsLoading,
    isOpenPaymentModal,
    toggleCreateDebtModal,
    togglePaymentModal,
    setSearchTerm,
    setActiveFilter,
  } = usePaymentSectionController();

  if (isLoading || debtIsLoading) {
    return (
      <main className="bg-teal-900 rounded-2xl h-full w-full mt-10 flex items-center justify-center">
       <LoaderCircle className="text-woodsmoke-200  w-10 h-10 animate-spin" />
      </main>
    );
  }


  if (!debt) {
    return (
<main className="rounded-2xl h-full w-full flex flex-col flex-1  px-2 md:px-10  bg-woodsmoke-200 pb-10 ">
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
    );
  }

  return (
   <main className="rounded-2xl h-full w-full flex flex-col flex-1  px-2 md:px-10  bg-woodsmoke-200 pb-10 ">
      <section className="flex flex-col flex-1 overflow-hidden px-4 py-8 md:p-10 relative">
        <header className="flex flex-col 2xl:flex-row 2xl:items-center gap-2 justify-between w-full shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <ArrowLeft
                     className="text-woodsmoke-700 w-6 h-6 cursor-pointer"
                onClick={() => window.history.back()}
              />
              <h2 className="font-roboto text-woodsmoke-700 "> Voltar</h2>
            </div>

            <div className="mt-10">
                <h1 className="font-poppins text-teal-900 font-bold text-2xl">
                Meus pagamentos
              </h1>
                  <span className="font-roboto text-woodsmoke-700">
                Clique em um pagamento para ver mais informações
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 w-full justify-end mt-5 lg:mt-0">
            <DropdownFilterPayment
              activeFilter={activeFilter}
              onSelect={setActiveFilter}
            />
            <div className="w-full sm:w-auto flex-1 2xl:max-w-[400px] xl:max-w-[600px]">
              <InputSearchPayment onSearch={setSearchTerm} />
            </div>
          </div>
        </header>

        {Payments.length === 0 ? (
           <div className="flex w-full h-full flex-1 items-end justify-center">
            <button
              className="mt-4 h-52 border-2 border-teal-600 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 text-white w-full"
              onClick={togglePaymentModal}
            >
              <div className="w-12 h-12 rounded-full border-dashed border-2 border-white flex justify-center items-center">
                <PlusIcon className="w-6 h-6" />
              </div>
              <span className="tracking-[-0.5px] font-medium block w-32 text-center font-roboto">
                Fazer um pagamento
              </span>
            </button>
          </div>
        ) : (
          <div
            className="
              grid sm:grid-cols-2 2xl:grid-cols-3 5xl:grid-cols-4
              gap-10 mt-10 flex-1 overflow-y-auto pr-2 custom-scroll
            "
          >
            {Payments.map((payment) => (
              <PaymentsCard
                key={payment.paymentId}
                payments={payment}
                debt={debt}
              />
            ))}
          </div>
        )}

        <BtnActions
          toggleCreateDebtModal={toggleCreateDebtModal}
          togglePaymentModal={togglePaymentModal}
        />
      </section>

      <OpenNewCreateDebtModal
        isOpen={isOpenDebtModal}
        toggleCreateDebtModal={toggleCreateDebtModal}
      />

      <OpenNewPaymentModal
        isOpen={isOpenPaymentModal}
        togglePaymentModal={togglePaymentModal}
      />
    </main>
  );
};

export default PaymentsSection;
