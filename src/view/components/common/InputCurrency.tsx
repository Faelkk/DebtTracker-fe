// import { X } from "lucide-react";
// import { NumericFormat } from "react-number-format";

// interface InputCurrencyProps {
//     error?: string;
//     onChange?: (value: string) => void;
//     value?: string | number;
// }

// const InputCurrency = ({ error, value, onChange }: InputCurrencyProps) => {
//     return (
//         <div>
//             <NumericFormat
//                 className="w-full border text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
//                 thousandSeparator="."
//                 decimalSeparator=","
//                 defaultValue="0"
//                 value={value}
//                 onValueChange={(values) => onChange?.(values.formattedValue)}
//             />
//             {error && (
//                 <div className="flex gap-2 items-center mt-2 text-red-900">
//                     <X />
//                     <span className="text-xs">{error}</span>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default InputCurrency;
