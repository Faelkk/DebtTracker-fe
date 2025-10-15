import { createFileRoute } from '@tanstack/react-router'
import Container from '@/view/components/layout/Container'
import SigninForm from '@/view/components/pages/signin/SigninForm'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Container>
    <section>
    <header className=" flex flex-col items-center gap-4 text-center">
                <h1 className="text-4xl font-poppins font-bold text-gray-900 tracking-[-0.1px]">
                    Entre em sua conta
                </h1>

                <p className="space-x-2 tracking-[-0.5px] mt-2 font-poppins">
                    <span className="text-gray-700">Faça login para poder gerenciar suas dividas</span>  
                </p>
            </header>
           <SigninForm />
           </section>
  </Container>
}
