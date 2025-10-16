import { LoaderCircle, PlusIcon } from 'lucide-react'
import useDebtSectionController from './useDebtSectionController'
import DebtCard from './DebtCard'

import DropdownFilterDebt from './DropdownFilterDebt'
import InputSearchDebt from './InputSearchDebt'

const DebtsSection = () => {
  const { isLoading, debts, toggleCreateDebtModal, toggleEditDebtModal } =
    useDebtSectionController()

  return (
    <main className="bg-teal-900 rounded-2xl  h-full w-full  px-4 py-8 md:p-10 mt-10 flex flex-col flex-1">
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <LoaderCircle className="text-gray-50  w-10 h-10 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <section className="flex flex-col">
          <header className="flex flex-col 2xl:flex-row 2xl:items-center  gap-2 justify-between w-full">
            <div className="flex flex-col">
              <h2 className="font-poppins text-gray-50 font-medium text-xl">
                {' '}
                Minhas dividas{' '}
              </h2>
              <span className="font-roboto text-gray-300">
                Clique em uma divida para ver mais informações
              </span>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 w-full justify-end">
              <div className="w-full sm:w-auto flex-1 2xl:max-w-[400px] xl:max-w-[600px]">
                <InputSearchDebt />
              </div>
              <DropdownFilterDebt />
            </div>
          </header>
          <div className=" flex  flex-col  mt-10 ">
            {debts.length === 0 ? (
              <>
                <div className="w-full mb-4"></div>

                <button
                  className="mt-4 h-52 border-2 border-teal-600  border-dashed rounded-2xl  flex flex-col items-center justify-center gap-4 text-white"
                  onClick={toggleCreateDebtModal}
                >
                  <div className="w-11 h-11 rounded-full border-dashed border-2 border-white flex justify-center items-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="tracking-[-0.5px] font-medium block w-32 text-center font-roboto">
                    Cadastre uma nova divida
                  </span>
                </button>
              </>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 2xl:grid-cols-3 5xl:grid-cols-4  max-w-full mt gap-10 flex-wrap max-h-[40rem] overflow-auto custom-scroll  rounded-2xl">
                  {debts.map((debt) => (
                    <DebtCard
                      key={debt.debtId}
                      debt={debt}
                      openEditAccountModal={toggleEditDebtModal}
                    />
                  ))}
                </div>
              </>
            )}
          </div>{' '}
        </section>
      )}
    </main>
  )
}

export default DebtsSection
