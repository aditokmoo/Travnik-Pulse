import { useState } from "react";
import { useLogin } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";

export default function Form({ styles }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [t] = useTranslation("main");

  const { mutate, isLoading } = useLogin();

  if (isLoading) return <Spinner />;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!username || !password) return;
        mutate({ username, password });
      }}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="username">{t("main_page_login.username_label_text")}</label>
        <input
          type="text"
          id="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">{t("main_page_login.password_label_text")}</label>
        <input
          type="password"
          id="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button>{t("main_page_login.login_button_text")}</button>
      <Link to="/app/register">{t("main_page_login.create_account_text")}</Link>
    </form>
  );
}
