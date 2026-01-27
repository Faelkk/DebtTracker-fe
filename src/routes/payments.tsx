import { createFileRoute } from "@tanstack/react-router"
import { z } from 'zod';
import { MenuIcon } from "lucide-react";
import Container from "@/view/components/layout/Container"
import PaymentsSection from "@/view/components/pages/payments/PaymentSection/PaymentSection";


export const Route = createFileRoute('/payments')({
  component: Payments,
    validateSearch: z.object({
      debtId: z.string().optional(),
      installmentId: z.string().optional()
    }),
})

export function Payments() {
  return (
     <Container>
      <div className='flex flex-col  h-full w-full px-2 md:px-10 py-5 min-h-screen'>
       <header className="flex items-center justify-between  w-full drop-shadow-md backdrop-blur-md">
        <div>
          <h1 className="font-poppins text-xl font-bold text-teal-900">
            Debt Tracker
          </h1>
        </div>

        <button>
          <MenuIcon className="h-6 w-6 text-teal-900" />
        </button>
      </header>
          <PaymentsSection />

     </div>
   </Container>
  )
}

