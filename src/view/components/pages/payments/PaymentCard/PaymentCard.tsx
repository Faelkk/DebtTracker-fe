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
    <section className="p-4 max-h-[24rem] min-h-[24rem] border-2 bg-teal-900/8 border-teal-900  h-full 2xl:min-h-[22rem] rounded-2xl  sm:max-w-[18.75rem] md:max-w-full md:w-full flex flex-col justify-between drop-shadow-md">
        <header className="flex flex-col pp:flex-row sm:flex-col md:flex-row w-full justify-between items-start">
          <div className='flex gap-3 items-center'>
              <span className='text-woodsmoke-00 font-medium'>Valor:</span>
          <h2 className="text- text-2xl font-medium tracking-[0.5px] block max-w-[90%] sm:max-w-full md:max-w-[90%] font-poppins">
              {formatCurrency(payments.amount)}
            </h2>
          </div>
        </header>

        <div className="flex flex-col mt-4">
           <div className="flex flex-col pp:flex-row gap-1 sm:gap-0 md:gap-1 sm:flex-col md:flex-row text-base sm:text-sm md:text-base 2xl:text-base mt-1 font-roboto capitalize">
            <span className="text-woodsmoke-700">Data do pagamento:</span>
            <span className='text-woodsmoke-900 font-medium'>{formatDate(payments.paidAt)}</span>
          </div>
               <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
             <span className="text-woodsmoke-700">Devedor:  <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  debt.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {debt.debtorName}
              </span>{' '} </span>
            </div>
             <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
             <span className="text-woodsmoke-700">Creditor:  <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  debt.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {debt.creditorName}
              </span>{' '} </span>
            </div>
        </div>
    </section>
  )
}

export default PaymentsCard
