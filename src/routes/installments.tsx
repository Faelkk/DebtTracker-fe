import { createFileRoute, redirect } from "@tanstack/react-router"
import { z } from 'zod';
import Container from "@/view/components/layout/Container"
import InstallmentsSection from "@/view/components/pages/installment/InstallmentSection/InstallmentSection";
import { localStorageKeys } from "@/app/config/localStorageKeys";
import MenuDropdown from "@/view/components/common/MenuDropdown/MenuDropdown";




export const Route = createFileRoute('/installments')({
     beforeLoad: () => {
        const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    
        if (!token) {
          throw redirect({ to: "/signin" });
        }
      },
  component: Installments,
  validateSearch: z.object({
    debtId: z.string().optional()
  }),
})


function Installments() {

  return (
       <Container>
     <div className='flex flex-col  h-full w-full px-2 md:px-10 py-5 min-h-screen'>
       <header className="flex items-center justify-between  w-full drop-shadow-md backdrop-blur-md">
        <div>
          <h1 className="font-poppins text-xl font-bold text-teal-900">
            Debt Tracker
          </h1>
        </div>

        <MenuDropdown />
      </header>
          <InstallmentsSection />

     </div>
    </Container>
  )
}





