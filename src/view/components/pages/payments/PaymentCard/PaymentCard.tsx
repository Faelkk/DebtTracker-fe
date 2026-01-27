

import type { Payment } from '@/app/entities/payment'
import { formatCurrency } from '@/app/utils/formatBalancy'
import { formatDate } from '@/app/utils/formatDate'




interface AccountCardProps {
  Payments: Payment

}

const PaymentsCard = ({ Payments }: AccountCardProps) => {


  

  return (
  <div
      className="p-4 max-h-[300px] bg-gray-200  h-full  rounded-2xl  sm:max-w-[18.75rem] md:max-w-full md:w-full flex flex-col justify-between border-b-4 border-teal-950"
    >
      <section>
        <header className="flex flex-col pp:flex-row sm:flex-col md:flex-row w-full justify-between items-start">
          <div>
            <h2 className="text-gray-900 text-2xl font-medium tracking-[0.5px] block max-w-[90%] sm:max-w-full md:max-w-[90%] font-poppins">
              {formatCurrency(Payments.Amount)}
            </h2>
          </div>

        </header>

        <div className="flex flex-col mt-4">
      

          <div className="flex flex-col pp:flex-row gap-1 text-sm 2xl:text-base mt-1 font-roboto items-center">
            <span className="text-gray-600">Data do pagamento:</span>
            <span
            >
              {formatDate(Payments.PaidAt)}
            </span>
          </div>

           <div className="flex flex-col pp:flex-row gap-1 text-sm 2xl:text-base mt-1 font-roboto items-center">
            <span className="text-gray-600">Pago a:</span>
            <span
            >
              Pessoa
            </span>
          </div>

        </div>
      </section>

    </div>
  )
}

export default PaymentsCard
