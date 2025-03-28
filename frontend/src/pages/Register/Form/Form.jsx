import { useState } from "react";
import { useSignup } from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";

export default function Form({ styles }) {
  const { mutate, isLoading } = useSignup();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [t] = useTranslation('main');

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!username || !password || !passwordConfirm) return;
        mutate({ username, password, passwordConfirm });
      }}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="username">{t("main_page_register.username_label_text")}</label>
        <input
          type="text"
          id="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">{t("main_page_register.password_label_text")}</label>
        <input
          type="password"
          id="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="passwordConfirm">{t("main_page_register.confirm_pass_label_text")}</label>
        <input
          type="password"
          id="passwordConfirm"
          placeholder="******"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>

      <button>{t("main_page_register.register_button_text")}</button>
    </form>
  );
}
