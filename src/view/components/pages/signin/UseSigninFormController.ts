import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
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
    const navigate = useNavigate(); 


  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignInParams) => authService.signin(data),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as FormData,

    onSubmit: async ({ value }) => {
      const result = schema.safeParse(value);

      if (!result.success) {
        toast.error("Formulário inválido");
        return;
      }

      try {
        const { token } = await mutateAsync(value);

        signin(token);

        navigate({ to: "/" });

      } catch (error) {
        toast.error("Erro ao fazer login");
      }
},

  });

  return {
    form,
    isPending,
  };
};

export default useSigninFormController;
