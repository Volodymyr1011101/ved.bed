"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

interface IformAuthorization {
  email: string;
  password: string;
}

export default function Authorization() {
  const { register, handleSubmit, formState } = useForm<IformAuthorization>({
    mode: "onChange",
  });

  const emailError = formState.errors["email"];
  const passwordError = formState.errors["password"];

  const onSubmit: SubmitHandler<IformAuthorization> = (data) => {
    console.log("data", data);
  };

  return (
    <>
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
        <button type="submit" disabled={!!emailError || !!passwordError}>
          Send
        </button>
      </form>
      <p>
        If you don't have an account yet, please{" "}
        <Link href="/registration">register</Link>.
      </p>
    </>
  );
}
