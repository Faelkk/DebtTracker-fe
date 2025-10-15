import { createFileRoute } from '@tanstack/react-router'
import Container from '@/view/components/layout/Container'


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
   <Container>
    <h2>Teste</h2>
   </Container>
  )
}
