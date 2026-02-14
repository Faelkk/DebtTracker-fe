import type { Debt } from '@/app/entities/debt'
import type { Payment } from '@/app/entities/payment'

import { cn } from '@/app/utils/cn'
import { formatCurrency } from '@/app/utils/formatBalancy'
import { formatDate } from '@/app/utils/formatDate'

interface AccountCardProps {
  payments: Payment
  debt: Debt
}

const PaymentsCard = ({ payments,debt }: AccountCardProps) => {


  return (
    <section className="p-4 min-h-[15rem] md:max-h-[300px] bg-gray-200  h-full  rounded-2xl  sm:max-w-[18.75rem] md:max-w-full md:w-full flex flex-col justify-between border-b-4 border-teal-950">
        <header className="flex flex-col pp:flex-row sm:flex-col md:flex-row w-full justify-between items-start">
          <div className='flex gap-3 items-center'>
           <span className='text-gray-800 font-medium'>Valor:</span>
            <h2 className="text-gray-900 text-2xl font-medium tracking-[0.5px] block max-w-[90%] sm:max-w-full md:max-w-[90%] font-poppins">
              {formatCurrency(payments.amount)}
            </h2>
          </div>
        </header>

        <div className="flex flex-col mt-4">
           <div className="flex flex-col pp:flex-row gap-1 sm:gap-0 md:gap-1 sm:flex-col md:flex-row text-base sm:text-sm md:text-base 2xl:text-base mt-1 font-roboto capitalize">
            <span className="text-gray-600">Data do pagamento:</span>
            <span className='text-gray-900 font-medium'>{formatDate(payments.paidAt)}</span>
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
  )
}

export default PaymentsCard
