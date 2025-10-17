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
  const { form, isLoading, users } = useOpenCreateNewDebtModal({
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
              placeholder="Valor da dívida"
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
              placeholder="Descrição da divida"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]}
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
              placeholder="Número de parcelas"
              value={field.state.value}
              onChange={(e) => {
                // Remove tudo que não seja número inteiro
                const onlyNumbers = e.target.value.replace(/\D/g, '')
                field.handleChange(onlyNumbers)
              }}
              error={field.state.meta.errors[0]}
            />
          )}
        />

        <Field
          form={form}
          name="creditorId"
          children={(field) => (
            <Select
              placeholder="Emprestador"
              value={field.state.value}
              onChange={field.handleChange}
              error={field.state.meta.errors[0]}
              options={users.map((u) => ({
                value: u.userId,
                label: u.name,
              }))}
            />
          )}
        />

        <Field
          form={form}
          name="debtorId"
          children={(field) => (
            <Select
              placeholder="Devedor"
              value={field.state.value}
              onChange={field.handleChange}
              error={field.state.meta.errors[0]}
              options={users.map((u) => ({
                value: u.userId,
                label: u.name,
              }))}
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
                placeholder="dd/MM/yyyy"
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
