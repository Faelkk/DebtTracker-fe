import { createFileRoute } from '@tanstack/react-router'
import SigninForm from '../components/pages/signin/SigninForm'


export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <SigninForm />
}
