import { useNavigate } from '@tanstack/react-router'
import type { Installment } from '@/app/entities/installment'

import type { Debt } from '@/app/entities/debt'
import type { User } from '@/app/entities/user'
import { cn } from '@/app/utils/cn'
import { formatCurrency } from '@/app/utils/formatBalancy'
import { formatDate } from '@/app/utils/formatDate'
import Button from '@/view/components/common/Button'





interface AccountCardProps {
  Installments: Installment
  togglePaymentModal: () => void
  debt: Debt
  user: User

}

const InstallmentsCard = ({ Installments,togglePaymentModal ,debt,user}: AccountCardProps) => {

  const navigate = useNavigate()



  return (
  <div
      className="p-4 max-h-[24rem] min-h-[24rem] bg-gray-200  h-full 2xl:min-h-[22rem] rounded-2xl  sm:max-w-[18.75rem] md:max-w-full md:w-full flex flex-col justify-between border-b-4 border-teal-950"
    >
      <section>
        <header className="flex flex-col pp:flex-row sm:flex-col md:flex-row w-full justify-between items-start">
           <div className='flex gap-3 items-center'>
           <span className='text-gray-800 font-medium'>Valor:</span>
            <h2 className="text-gray-900 text-2xl font-medium tracking-[0.5px] block max-w-[90%] sm:max-w-full md:max-w-[90%] font-poppins">
              {formatCurrency(Installments.amount)}
            </h2>
          </div>

        </header>

        <div className="flex flex-col mt-4">
          <span className="text-gray-600 text-sm  2xl:text-base mt-1 font-roboto">
            Valor pago: <span className="text-gray-800 font-medium">{formatCurrency(Installments.paidAmount)}</span>
          </span>

          <div className="flex flex-col pp:flex-row gap-1 text-sm 2xl:text-base mt-1 font-roboto items-center">
            <span className="text-gray-600">Prazo do pagamento:</span>
            <span
              className={cn('font-medium', Installments.isPaid ? 'text-teal-800' : 'text-red-800')}
            >
              {formatDate(Installments.dueDate)}
            </span>
          </div>

       
            <div className="mt-1 text-sm 2xl:text-base font-roboto">
              <span className="text-gray-600">Status: </span>
              <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  Installments.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {Installments.isPaid ? 'Pago' : 'Pendente'}
              </span>
            </div>
                  <div className="flex flex-col pp:flex-row gap-1 text-sm 2xl:text-base mt-1 font-roboto items-center capitalize">
            {' '}
            {user.userId === debt.creditorId ? (
              <span className="text-gray-600">
                Devedor:{' '}
                <span
                  className={cn(
                    'font-medium tracking-[0.5px]',
                    debt.isPaid ? 'text-teal-800' : 'text-red-800',
                  )}
                >
                  {debt.debtorId}
                </span>{' '}
              </span>
            ) : (
              <span className="text-gray-600">
                Credetor:{' '}
                <span
                  className={cn(
                    'font-medium tracking-[0.5px]',
                    debt.isPaid ? 'text-teal-800' : 'text-red-800',
                  )}
                >
                  {debt.creditorId}
                </span>{' '}
              </span>
            )}
          </div>
        </div>
      </section>

       <div className="flex flex-col 3xl:flex-row items-center justify-center w-full gap-3 mt-4">
      <Button
  className="bg-transparent border-teal-900 border text-teal-900 hover:text-gray-50 hover:bg-teal-950 cursor-pointer p-4 w-full transition-colors"
  onClick={() =>
    navigate({
      to: `/payments`,
      search: (old) => ({ ...old, debtId: Installments.debtId }),
    })
  }
>
  Pagamentos
</Button>
 <Button
  className="hover:bg-transparent hover:border-teal-950 hover:border hover:text-teal-950 text-gray-50 bg-teal-800 cursor-pointer p-4 w-full transition-colors"
  onClick={togglePaymentModal
  }
>
  Pagar
</Button>



      </div>
    </div>
  )
}

export default InstallmentsCard
