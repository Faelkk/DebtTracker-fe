import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { update } from "@/app/services/debt/update";

export function useOpenEditNewDebtModal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => update(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Debts"],
      });

      toast.success("Dívida atualizada com sucesso!");
    },

    onError: () => {
      toast.error("Erro ao atualizar dívida!");
    },
  });

  async function onConfirm(id: string) {
    await mutateAsync(id);
  }

  return {
    isLoading: isPending,
    onConfirm,
  };
}
