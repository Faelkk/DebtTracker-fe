import { Field } from '@tanstack/react-form'
import Modal from '../modal'
import Input from '../../common/Input'
import Button from '../../common/Button'

import Select from '../../common/Select'
import { useOpenCreateNewDebtModal } from './useOpenCreateNewDebtModal'
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber'
import { formatCurrency } from '@/app/utils/formatBalancy'


const OpenNewCreateDebtModal = ({
  isOpen,
  toggleCreateDebtModal,
}: {
  isOpen: boolean
  toggleCreateDebtModal: () => void
}) => {
  const { form, isLoading } = useOpenCreateNewDebtModal({
    toggleCreateDebtModal,
  })

  return (
    <Modal
      title="Nova dívida"
      description="Preencha os dados abaixo para criar uma nova dívida"
      open={isOpen}
      onClose={toggleCreateDebtModal}
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
          name="totalAmount"
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
          name="description"
          children={(field) => (
            <Input
              name="description"
              type="text"
              label="Descrição da divida"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]}
            />
          )}
        />

              <Field
  form={form}
  name="isMyDebt"
  children={(field) => (
    <Select
      placeholder="Tipo da dívida"
      value={String(field.state.value)}
      onChange={(value) => field.handleChange(value === "true")}
      error={field.state.meta.errors[0]}
      options={[
        { value: "true", label: "Dívida a pagar" },
        { value: "false", label: "Dívida a receber" },
      ]}
    />
  )}
/>


        <Field
          form={form}
          name="installments"
          children={(field) => (
            <Input
              name="installments"
              type="text"
              label="Número de parcelas"
              value={field.state.value}
              onChange={(e) => {
  
                const onlyNumbers = e.target.value.replace(/\D/g, '')
                field.handleChange(onlyNumbers)
              }}
              error={field.state.meta.errors[0]}
            />
          )}
        />

       <Field
          form={form}
          name="involvedPartyName"
          children={(field) => (
            <Input
              name="involvedPartyName"
              type="text"
              label="Nome do envolvido"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]}
            />
          )}
        />



        <Field
          form={form}
          name="dueDate"
          children={(field) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              let value = e.target.value.replace(/\D/g, '')

              if (value.length > 8) value = value.slice(0, 8)

              if (value.length > 4) {
                value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3')
              } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2')
              }

              field.handleChange(value)
            }

            return (
              <Input
                name="dueDate"
                type="text"
                label="dd/MM/yyyy"
                value={field.state.value}
                onChange={handleChange}
                error={field.state.meta.errors[0]}
              />
            )
          }}
        />

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  )
}

export default OpenNewCreateDebtModal
