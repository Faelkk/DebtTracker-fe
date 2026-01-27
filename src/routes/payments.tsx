import { createFileRoute } from "@tanstack/react-router"
import Container from "@/view/components/layout/Container"


export const Route = createFileRoute('/payments')({
  component: Payments,
})

export function Payments() {
  return (
     <Container>
    <h2>Teste</h2>
   </Container>
  )
}

