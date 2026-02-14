import { useNavigate } from '@tanstack/react-router'
import { Trash } from 'lucide-react'
import type { User } from '@/app/entities/user'
import type { Debt } from '@/app/entities/debt'
import { cn } from '@/app/utils/cn'
import { formatCurrency } from '@/app/utils/formatBalancy'
import { formatDate } from '@/app/utils/formatDate'
import Button from '@/view/components/common/Button'


interface AccountCardProps {
  debt: Debt
  toggleDeleteDebtModal: (debtId: string) => void
  toggleEditDebtModal: (debtId: string) => void
}

const DebtCard = ({
  debt,
  toggleDeleteDebtModal,
  toggleEditDebtModal,
}: AccountCardProps) => {
  const navigate = useNavigate()


  return (
    <div className="p-4 max-h-[24rem] min-h-[24rem] bg-gray-200  h-full 2xl:min-h-[22rem] rounded-2xl  sm:max-w-[18.75rem] md:max-w-full md:w-full flex flex-col justify-between border-b-4 border-teal-950">
      <section>
        <header className="flex flex-col pp:flex-row sm:flex-row md:flex-row w-full justify-between items-center">
          <div className="flex items-center justify-center">
            <h2 className="text-gray-900 text-2xl  sm:text-2xl font-medium tracking-[0.5px] block  font-poppins">
              {formatCurrency(debt.totalAmount)}
            </h2>
          </div>

          <button
            className="w-[52px] h-[52px] rounded-full  flex justify-center items-center cursor-pointer"
            onClick={() => toggleDeleteDebtModal(debt.debtId)}
          >
            <Trash className="w-6 h-6 text-red-900" />
          </button>
        </header>

        <div className="flex flex-col mt-4">
          <span className="text-gray-600 text-sm 2xl:text-base mt-1 font-roboto max-w-[90%] break-all line-clamp-3">
            {debt.description}
          </span>

          <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
            <span className="text-gray-600 ">Prazo do pagamento:</span>
            <span
              className={cn('font-medium', debt.isPaid ? 'text-teal-800' : 'text-red-800')}
            >
              {formatDate(debt.dueDate)}
            </span>
          </div>

            <div className="mt-1 text-sm 2xl:text-base font-roboto">
              <span className="text-gray-600">Valor: </span>
              <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  debt.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {debt.isPaid ? 'Pago' : 'Pendente'}
              </span>
            </div>
              <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
             <span className="text-gray-600">Devedor:  <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  debt.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {debt.involvedPartyName}
              </span>{' '} </span>
            </div>
        </div>
      </section>

      <div className="flex flex-col 3xl:flex-row items-center justify-center w-full gap-3 mt-4">
        <Button
          className="bg-transparent border-teal-900 border text-teal-900 hover:text-gray-50 hover:bg-teal-950 cursor-pointer p-4 w-full transition-colors"
          onClick={() =>
            navigate({
              to: `/installments`,
              search: (old) => ({ ...old, debtId: debt.debtId }),
            })
          }
        >
          Ver mais
        </Button>
        <Button
          className="hover:bg-transparent hover:border-teal-950 hover:border hover:text-teal-950 text-gray-50 bg-teal-800 cursor-pointer p-4 w-full transition-colors"
          onClick={() => toggleEditDebtModal(debt.debtId)}
        >
          Alterar status
        </Button>
      </div>
    </div>
  )
}

export default DebtCard

