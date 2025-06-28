import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { BiLogoGoogle } from "react-icons/bi";
import { redirect } from "next/dist/server/api-utils";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Invalid email or password");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.login__form__item__input}
            />
          </div>
          <button type="submit" className={styles.login__form__button}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <hr className={styles.login__form__divider} />
        <div className={styles.login__form__other}>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={styles.login__form__other__button}
          >
            <BiLogoGoogle size={20} />
            Login With Google
          </button>
        </div>
      </div>
      <p className={styles.login__link}>
        Don&apos;t have an account? <Link href="/auth/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginView;
