import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import type { CreatePaymentParams } from "@/app/services/payment/create";
import { paymentService } from "@/app/services/payment";
import { useDebts } from "@/app/hooks/useDebts";
import { useInstallments } from "@/app/hooks/useInstallments";





const schema = z.object({
  DebtId: z.string().nonempty("Id da divida é obrigatória"),
  InstallmentId: z.string().nonempty("id da parcela é obrigatória"),
  Amount: z
    .string()
    .nonempty("Informe o valor total")
    .refine((v) => parseFloat(v) > 0, "TotalAmount deve ser maior que 0"),
 
});

type FormData = z.infer<typeof schema>;

export function useOpenCreateNewPaymentModal({
  togglePaymentModal,
}: {
  togglePaymentModal: () => void;
})  {
    const { debts } = useDebts();
    const {installments} = useInstallments();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormData) => {

const payload: CreatePaymentParams = {
  DebtId: data.DebtId,
  InstallmentId: data.InstallmentId,
  Amount: parseFloat(data.Amount),
};

      return paymentService.create(payload);
    },
  });

  const form = useForm({
    defaultValues: {
      Amount: "",
      DebtId: "",
      InstallmentId: "",
    } as FormData,

   onSubmit: async ({ value }) => {
  try {

    await mutateAsync(value);

    queryClient.invalidateQueries({ queryKey: ["debts"] });
    queryClient.invalidateQueries({ queryKey: ["payments"] });
    toast.success("Pagamento efetuado com sucesso!");
    togglePaymentModal();
    form.reset();
  } catch {
    toast.error("Erro ao efetuar pagamento. Tente novamente mais tarde.");
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
    debts,
    installments,
  };
}