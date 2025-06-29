import styles from "./Input.module.scss";
type PropsType = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: PropsType) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={styles.container__input}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
