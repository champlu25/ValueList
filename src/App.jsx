import { useState } from "react";
import styles from "./app.module.css";

export default function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [countId, setCountId] = useState(0);
  const [isValueVaild, setIsValueValid] = useState(false);

  const onAddButtonClick = () => {
    if (isValueVaild) {
      setCountId(countId + 1);
      setList((list) => [...list, { id: countId, value: value }]);
      setValue("");
      setError("");
      setIsValueValid(false);
    }
  };

  const onInputButtonClick = () => {
    let promptValue = prompt("Введите новое значение");
    if (promptValue.length < 3) {
      setIsValueValid(false);
      setError("Введенное значение должно быть больше 3 символов");
    } else if (promptValue.length >= 3) {
      setIsValueValid(true);
      setValue(promptValue);
      setError("");
    }
  };

  return (
    <>
      <div className={styles.app}>
        <h1 className={styles["page-heading"]}>Ввод значения</h1>
        <p className={styles["no-margin-text"]}>
          Текущее значение <code>value</code>: &quot;
          <output className={styles["current-value"]}>{value}</output> &quot;
        </p>
        {error !== "" && <div className={styles.error}>{error}</div>}
        <div className={styles["buttons-container"]}>
          <button className={styles.button} onClick={onInputButtonClick}>
            Ввести новое
          </button>
          <button
            className={styles.button}
            disabled={!isValueVaild}
            onClick={onAddButtonClick}
          >
            Добавить в список
          </button>
        </div>
        <div className={styles["list-container"]}>
          <h2 className={styles["list-heading"]}>Список:</h2>
          {list.length === 0 ? (
            <p className={styles["no-margin-text"]}>
              Нет добавленных элементов
            </p>
          ) : (
            <ul className={styles.list}>
              {list.map(({ id, value }) => (
                <li className={styles["list-item"]} key={id}>
                  {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
