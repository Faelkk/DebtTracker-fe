import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { format } from "date-fns";


import { debtService } from "@/app/services/debt";
import { useAllUser } from "@/app/hooks/useAllUsers";
import { formatCurrencyForm } from "@/app/utils/formatCurrencyForm";

const schema = z.object({
  creditorName: z.string().nonempty("Nome do credetor é obrigatório"),
  debtorName: z.string().nonempty("Nome do devedor é obrigatório"),
  description: z.string().nonempty("Descrição é obrigatória"),
  totalAmount: z
  .string()
  .nonempty("Informe o valor total")
  .refine(
    (v) => formatCurrencyForm(v) > 0,
    "Valor deve ser maior que 0"
  ),
  installments: z
    .string()
    .nonempty("Informe o número de parcelas")
    .refine((v) => parseInt(v) >= 1, "Installments deve ser pelo menos 1"),
  dueDate: z
    .string()
    .nonempty("Data de vencimento é obrigatória")
    .refine((v) => {
      const parts = v.split("/");
      if (parts.length !== 3) return false;
      const [day, month, year] = parts.map(Number);
      const date = new Date(year, month - 1, day);
      return !isNaN(date.getTime());
    }, "Data inválida"),
    isMyDebt: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

export function useOpenCreateNewDebtModal({
  toggleCreateDebtModal,
}: {
  toggleCreateDebtModal: () => void;
}) {
  const { users } = useAllUser();
  
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormData) => {

  const [day, month, year] = data.dueDate.split("/").map(Number);

  const formattedData = {
    creditorName: data.creditorName,
    debtorName: data.debtorName,
    description: data.description,
    totalAmount: formatCurrencyForm(data.totalAmount),
    installments: Number(data.installments),
    isMyDebt: data.isMyDebt,
    dueDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
  };



  return debtService.create(formattedData);
},
  });

  const form = useForm({
    defaultValues: {
      creditorName: "",
      debtorName: "",
      description: "",
      totalAmount: "",
      installments: "1",
      dueDate: format(new Date(), "dd/MM/yyyy"),
      isMyDebt: true,
    } as FormData,

    onSubmit: async ({ value }) => {
      try { 
        await mutateAsync(value);
        queryClient.invalidateQueries({ queryKey: ["Debts"] });
        queryClient.invalidateQueries({ queryKey: ["Installments"] });
        toast.success("Dívida cadastrada com sucesso!");
        toggleCreateDebtModal();
        form.reset();
      } catch {
        toast.error("Erro ao cadastrar dívida. Tente novamente mais tarde.");
      }
    },

  });

  return {
    form,
    isLoading: isPending,
    users,
  };
}
