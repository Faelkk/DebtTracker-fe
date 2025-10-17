import Input from '@/view/components/common/Input';

interface InputSearchDebtProps {
  onSearch: (value: string) => void;
}

const InputSearchDebt = ({ onSearch }: InputSearchDebtProps) => {
  return (
    <Input
      label="Buscar dívida"
      name="debt"
      id="debt"
      className="md:min-w-full max-w-full 2xl:max-w-[500px]"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default InputSearchDebt;
