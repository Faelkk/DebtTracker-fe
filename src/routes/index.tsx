import { createFileRoute, redirect } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import Container from '@/view/components/layout/Container'
import DebtsSection from '@/view/components/pages/debt/DebtsSection/DebtSection/DebtsSection'
import { localStorageKeys } from '@/app/config/localStorageKeys'
import MenuDropdown from '@/view/components/common/MenuDropdown/MenuDropdown'

export const Route = createFileRoute('/')({
    beforeLoad: () => {
      const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  
      if (!token) {
        throw redirect({ to: "/signin" });
      }
    },
  component: App,
})

function App() {
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
          <DebtsSection />

     </div>
    </Container>
  )
}


