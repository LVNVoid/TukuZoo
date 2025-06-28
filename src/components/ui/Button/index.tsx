import styles from "./Button.module.scss";

type PropsType = {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  variant?: string;
  children?: React.ReactNode;
  className?: string;
};
const Button = (props: PropsType) => {
  const { type, onClick, children, variant = "primary", className } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
