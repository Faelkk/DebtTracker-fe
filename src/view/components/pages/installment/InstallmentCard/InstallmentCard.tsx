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

const InstallmentsCard = ({ Installments,togglePaymentModal ,debt}: AccountCardProps) => {

  const navigate = useNavigate()



  return (
  <div className="p-4 max-h-[24rem] min-h-[24rem] border-2 bg-teal-900/8 border-teal-900  h-full 2xl:min-h-[22rem] rounded-2xl  sm:max-w-[18.75rem] md:max-w-full md:w-full flex flex-col justify-between drop-shadow-md">
      <section>
        <header className="flex flex-col pp:flex-row sm:flex-col md:flex-row w-full justify-between items-start">
           <div className='flex gap-3 items-center'>
           <span className='text-woodsmoke-700 font-medium'>Valor:</span>
            <h2 className="text- text-2xl font-medium tracking-[0.5px] block max-w-[90%] sm:max-w-full md:max-w-[90%] font-poppins">
              {formatCurrency(Installments.amount)}
            </h2>
          </div>

        </header>

        <div className="flex flex-col mt-4">
          <span className="text-woodsmoke-600 text-sm  2xl:text-base mt-1 font-roboto">
            Valor pago: <span className="text-woodsmoke-800 font-medium">{formatCurrency(Installments.paidAmount)}</span>
          </span>

          <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
            <span className="text-woodsmoke-600">Prazo do pagamento:</span>
            <span
              className={cn('font-medium', Installments.isPaid ? 'text-teal-800' : 'text-red-800')}
            >
              {formatDate(Installments.dueDate)}
            </span>
          </div>

       
            <div className="mt-1 text-sm 2xl:text-base font-roboto">
              <span className="text-woodsmoke-600">Status: </span>
              <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  Installments.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {Installments.isPaid ? 'Pago' : 'Pendente'}
              </span>
            </div>
                  <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
            {' '}
                 <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
             <span className="text-woodsmoke-600">Devedor:  <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  debt.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {debt.debtorName}
              </span>{' '} </span>
            </div>
             <div className="mt-1 text-sm 2xl:text-base font-roboto capitalize">
             <span className="text-woodsmoke-600">Creditor:  <span
                className={cn(
                  'font-medium tracking-[0.5px]',
                  debt.isPaid ? 'text-teal-800' : 'text-red-800',
                )}
              >
                {debt.creditorName}
              </span>{' '} </span>
            </div>
          </div>
        </div>
      </section>

       <div className="flex flex-col 3xl:flex-row items-center justify-center w-full gap-3 mt-4">
      <Button
  className="bg-transparent border-teal-900 border text-teal-900 hover:text-gray-50 hover:bg-teal-950 cursor-pointer p-4 w-full transition-colors"
  onClick={() =>
    navigate({
      to: `/payments`,
      search: (old) => ({ ...old, debtId: Installments.debtId ,installmentId: Installments.installmentId}),
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
