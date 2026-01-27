import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

import { currencyStringToNumber } from "@/app/utils/currencyStringToNumber";
import { debtService } from "@/app/services/debt";
import { useAllUser } from "@/app/hooks/useAllUsers";

const schema = z.object({
  debtorId: z.string().nonempty("Devedor é obrigatório"),
  creditorId: z.string().nonempty("Credor é obrigatório"),
  description: z.string().nonempty("Descrição é obrigatória"),
  totalAmount: z
    .string()
    .nonempty("Informe o valor total")
    .refine((v) => parseFloat(v) > 0, "TotalAmount deve ser maior que 0"),
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
        debtorId: data.debtorId,
        creditorId: data.creditorId,
        description: data.description,
        totalAmount: currencyStringToNumber(data.totalAmount),
        installments: parseInt(data.installments, 10),
        dueDate: new Date(year, month - 1, day).toISOString(),
      };

      return debtService.create(formattedData);
    },
  });

  const form = useForm({
    defaultValues: {
      debtorId: "",
      creditorId: "",
      description: "",
      totalAmount: "",
      installments: "1",
      dueDate: format(new Date(), "dd/MM/yyyy"),
    } as FormData,

    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        queryClient.invalidateQueries({ queryKey: ["debts"] });
        toast.success("Dívida cadastrada com sucesso!");
        toggleCreateDebtModal();
        form.reset();
      } catch {
        toast.error("Erro ao cadastrar dívida. Tente novamente mais tarde.");
      }
    },

    validators: {
      onSubmit: ({ value }) => {
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.flatten().fieldErrors;
        }
        return {};
      },
    },
  });

  return {
    form,
    isLoading: isPending,
    users,
  };
}
