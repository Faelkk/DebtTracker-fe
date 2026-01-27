import Input from '@/view/components/common/Input';

interface InputSearchInstallmentProps {
  onSearch: (value: string) => void;
}

const InputSearchInstallment = ({ onSearch }: InputSearchInstallmentProps) => {
  return (
    <Input
      label="Buscar parcela"
      name="Installment"
      id="Installment"
      className="md:min-w-full max-w-full 2xl:max-w-[500px]"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default InputSearchInstallment;
