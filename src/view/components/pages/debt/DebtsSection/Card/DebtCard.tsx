
import type { Debt } from "@/app/entities/debt";
import { cn } from "@/app/utils/cn";
import { formatCurrency } from "@/app/utils/formatBalancy";
import { formatDate } from "@/app/utils/formatDate";
import Button from "@/view/components/common/Button";

interface AccountCardProps {
  debt: Debt;
  openEditAccountModal: (debt: Debt) => void;
}

const DebtCard = ({ debt, openEditAccountModal }: AccountCardProps) => {
  return (
    <div
      onClick={() => openEditAccountModal(debt)}
      role="button"
      className="p-4  bg-gray-100  h-full 2xl:min-h-[18rem] rounded-2xl  sm:max-w-[18.75rem] md:max-w-full md:w-full flex flex-col justify-between border-b-4 border-teal-950"
    >
      <section>
        <header className="flex flex-col pp:flex-row sm:flex-col md:flex-row w-full justify-between items-start">
        <div>
              <h2 className="text-gray-900 text-2xl font-medium tracking-[0.5px] block max-w-[90%] sm:max-w-full md:max-w-[90%] font-poppins">
         {formatCurrency(debt.totalAmount)}
            </h2>
        </div>

       <span
              className={cn(
                " font-medium tracking-[0.5px] mt-1 font-roboto",
                debt.isPaid ? "text-teal-800" : "text-red-600"  
              )}
            >
              {debt.isPaid ? "Pago" : "Pendente"} 
            </span>
       
        </header>


               <div className="flex flex-col mt-4">

               <span className="text-gray-600 text-sm  2xl:text-base mt-1 font-roboto">
                {debt.description}
            </span>

          
            <span className="text-gray-600 text-sm 2xl:text-base mt-1 font-roboto">
             Venceu no dia {formatDate(debt.dueDate)}
            </span>
                <span
              className={cn(
                " font-medium tracking-[0.5px] mt-1",
                debt.isPaid ? "text-teal-800" : "text-red-600"
              )}
            >
            
            </span>
            <span className="text-gray-500 text-sm mt-1">
            </span>
          </div>
      </section>

      <div className="flex w-full gap-3 mt-4">

        <Button className="bg-transparent border-teal-800 border text-teal-800 hover:text-gray-50 hover:bg-teal-800 cursor-pointer p-2 w-full">
          Ver mais informações
        </Button>
      </div>
    </div>
  );
};

export default DebtCard;
