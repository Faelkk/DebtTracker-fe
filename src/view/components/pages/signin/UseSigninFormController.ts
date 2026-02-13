import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import toast from "react-hot-toast";

import type { SignInParams } from "@/app/services/auth/signin";
import { authService } from "@/app/services/auth";
import { useAuth } from "@/app/hooks/useAuth";

const schema = z.object({
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "A senha deve conter pelo menos 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

const useSigninFormController = () => {
  const { signin } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignInParams) => authService.signin(data),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as FormData,

    onSubmit: async ({ value }) => {
  console.log("enviou", value);

  const result = schema.safeParse(value);
  if (!result.success) {
    toast.error("Formulário inválido");
    return;
  }

  const { token } = await mutateAsync(value);
  signin(token);
},

  });

  return {
    form,
    isPending,
  };
};

export default useSigninFormController;
