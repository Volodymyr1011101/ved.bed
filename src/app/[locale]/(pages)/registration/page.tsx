"use client";

import { useForm, SubmitHandler } from "react-hook-form";

interface IformRegistration {
  email: string;
  password: string;
  accepted_terms: boolean;
}

export default function Registration() {
  const { register, handleSubmit, formState } = useForm<IformRegistration>({
    mode: "onChange",
  });

  const emailError = formState.errors["email"];
  const passwordError = formState.errors["password"];
  const acceptedTermsError = formState.errors["accepted_terms"];

  const onSubmit: SubmitHandler<IformRegistration> = (data) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter e-mail"
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email",
          },
        })}
      />
      {emailError && <p>{emailError.message}</p>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter password"
        {...register("password", {
          required: "This field is required",
          minLength: {
            value: 8,
            message: "Password needs at least 8 characters",
          },
        })}
      />
      {passwordError && <p>{passwordError.message}</p>}
      <input
        type="checkbox"
        {...register("accepted_terms", {
          required: "This field is required",
        })}
      />
      <button
        type="submit"
        disabled={!!emailError || !!passwordError || !!acceptedTermsError}
      >
        Send
      </button>
    </form>
  );
}
