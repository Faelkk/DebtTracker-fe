import { Field } from '@tanstack/react-form'
import Select from '../../common/Select'
import Modal from '../modal'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { useOpenCreateNewPaymentModal } from './useOpenNewPaymentModal'
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber'
import { formatCurrency } from '@/app/utils/formatBalancy'



const OpenNewPaymentModal = ({
  isOpen,
  togglePaymentModal,
}: {
  isOpen: boolean
  togglePaymentModal: () => void
})  => {

const { form, isLoading, Installments,debts } = useOpenCreateNewPaymentModal({
    togglePaymentModal,
  })

  return (
<Modal
      title="Novo pagamento"
      description="Preencha os dados para efetuar o pagamento"
      open={isOpen}
      onClose={togglePaymentModal}
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <Field
          form={form}
          name="Amount"
          children={(field) => (
            <Input
              name="totalAmount"
              type="text"
              label="Valor da dívida"
              value={field.state.value}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^\d.,]/g, '')
                field.handleChange(onlyNumbers)
              }}
              onBlur={() => {
                const numberValue = currencyStringToNumber(field.state.value)
                field.handleChange(formatCurrency(numberValue))
              }}
              error={field.state.meta.errors[0]}
            />
          )}
        />

        <Field
          form={form}
          name="DebtId"
          children={(field) => (
            <Select
              placeholder="Selecionar divida"
              value={field.state.value}
              onChange={field.handleChange}
              error={field.state.meta.errors[0]}
              options={debts.map((d) => ({
                value: d.debtId,
                label: d.description,
              }))}
            />
          )}
        />

        <Field
          form={form}
          name="InstallmentId"
          children={(field) => (
            <Select
              placeholder="Selecionar parcela"
              value={field.state.value}
              onChange={field.handleChange}
              error={field.state.meta.errors[0]}
              options={Installments.map((i) => ({
                value: i.installmentId,
                label: `Numero da parcela ${i.number}`,
              }))}
            />
          )}
        />



        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Realizar pagamento
        </Button>
      </form>
    </Modal>
  )
}

export default OpenNewPaymentModal