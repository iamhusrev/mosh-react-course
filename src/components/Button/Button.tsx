import styles from "./Button.module.css";

interface buttonProps {
  children: string;
  onClick: () => void;
  color?: 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Warning' | 'Info' | 'Light' | 'Dark';
}

const Button = ({ children, onClick, color = 'Primary' }: buttonProps) => {
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[`btn${color}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
