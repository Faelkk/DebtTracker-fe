import Input from '@/view/components/common/Input';

interface InputSearchPaymentProps {
  onSearch: (value: string) => void;
}

const InputSearchPayment = ({ onSearch }: InputSearchPaymentProps) => {
  return (
    <Input
      label="Buscar pagamento"
      name="Payment"
      id="Payment"
      className="md:min-w-full max-w-full 2xl:max-w-[500px]"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default InputSearchPayment;
