import { Field } from "@tanstack/react-form";

import Input from "../../common/Input";
import Button from "../../common/Button";
import useSigninFormController from "./UseSigninFormController";



const SigninForm = () => {
  const { form, isPending } = useSigninFormController();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-3 mt-10 max-w-full w-full md:min-w-[25rem]"
    >
      <Field
        form={form}
        name="email"
        children={(field) => (
          <Input
            name="email"
            type="email"
            label="Email"
            id="email"

            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]}
          />
        )}
      />


      <Field
        form={form}
        name="password"
        children={(field) => (
          <Input
          name="password"
            type="password"
            label="Senha"
            id="password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]}
          />
        )}
      />

      <Button type="submit" className="mt-2" isLoading={isPending}>
        Entrar
      </Button>
    </form>
  );
};

export default SigninForm;
