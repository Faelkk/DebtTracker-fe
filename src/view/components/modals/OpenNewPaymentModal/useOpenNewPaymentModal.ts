import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { CreatePaymentParams } from "@/app/services/payment/create";
import { paymentService } from "@/app/services/payment";
import { useDebts } from "@/app/hooks/useDebts";
import { useInstallments } from "@/app/hooks/useInstallments";
import { formatCurrencyForm } from "@/app/utils/formatCurrencyForm";






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
}) {
  const { debts } = useDebts();
  const queryClient = useQueryClient();
  const [selectedDebtId, setSelectedDebtId] = useState<string>("");


  const { Installments } = useInstallments(selectedDebtId);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: CreatePaymentParams = {
        DebtId: data.DebtId,
        InstallmentId: data.InstallmentId,
        Amount: formatCurrencyForm(data.Amount),
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

        queryClient.invalidateQueries({ queryKey: ["Debts"] });
        queryClient.invalidateQueries({ queryKey: ["Installments"] });
        queryClient.invalidateQueries({
          queryKey: ["Payments", value.DebtId, value.InstallmentId],
        });

        toast.success("Pagamento efetuado com sucesso!");
        togglePaymentModal();
        form.reset();
      } catch {
        toast.error("Erro ao efetuar pagamento.");
      }
    },
  });

  function handleDebtChange(debtId: string) {

    
    setSelectedDebtId(debtId);
    form.setFieldValue("DebtId", debtId);
    form.setFieldValue("InstallmentId", "");
  }

  return {
    selectedDebtId,
    handleDebtChange,
    form,
    isLoading: isPending,
    debts,
    Installments, 
  };
}
