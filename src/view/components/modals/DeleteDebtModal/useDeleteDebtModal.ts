

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteDebt } from "@/app/services/debt/delete";


export function useDeleteDebtModal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (debtId: string) => deleteDebt(debtId),

    onSuccess: (debtId: string) => {

      queryClient.invalidateQueries({ queryKey: ["Debts"] });
      queryClient.invalidateQueries({ queryKey: ["Installments"] });
   

  queryClient.invalidateQueries({
    queryKey: ["Payments", debtId],
  });


    toast.success("Dívida excluída com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir a dívida");
    }
  });

  async function handleSubmit(debtId: string) {
    await mutateAsync(debtId);
  }

  return {
    handleSubmit,
    isLoading: isPending,
  };
}
