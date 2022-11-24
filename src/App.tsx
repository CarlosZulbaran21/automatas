import { ChangeEvent, EventHandler, MouseEventHandler, useState } from "react";
import "./App.css";

interface InputForm {
  do: string;
  sujeto: string;
  predicado: string;
  simbolo: string;
}

function App() {
  const doDoes = ["do", "does", "do not", "does not", "don't", "doesn't"];
  const personalPronouns = ["i", "you", "she", "he", "it", "we", "they"];
  const commonNouns = "the";
  const demostrativePronouns = ["this", "that", "these", "those"];
  const doPerson = ["i", "you", "we", "they", "those", "these"];
  const doesPerson = ["she", "he", "it", "this", "that", "the"];
  const symbol = "?";
  const [values, setValues] = useState<InputForm>({
    do: "",
    predicado: "",
    simbolo: "",
    sujeto: "",
  });
  const [isValidate, setIsValidate] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cleanData = () => {
    setValues({
      do: "",
      predicado: "",
      simbolo: "",
      sujeto: "",
    });

    setIsValidate(false);
  };

  const isDemostrativeSubject = () => {
    const firstPosition = values.sujeto.split(" ")[0];
    return (
      firstPosition === demostrativePronouns[0] ||
      firstPosition === demostrativePronouns[1] ||
      firstPosition === demostrativePronouns[2] ||
      firstPosition === demostrativePronouns[3]
    );
  };

  function validate() {
    const isDemostrative = isDemostrativeSubject();
    if (!doDoes.includes(values.do.toLowerCase()))
      alert("validar campo Do/Does");
    else if (values.sujeto[0] === undefined) alert("validar campo Sujeto");
    else if (
      !personalPronouns.includes(values.sujeto.toLowerCase()) &&
      values.sujeto.split(" ")[0] !== commonNouns &&
      values.sujeto[0] !== values.sujeto[0].toUpperCase() &&
      !isDemostrative
    )
      alert("validar campo Sujeto");
    else if (values.simbolo !== symbol)
      alert("validar campo simbolo de interrogacion");
    else if (values.predicado === "") alert("predicado no puede estar vacio");
    else if (
      values.do.toLowerCase() === "do" &&
      doesPerson.includes(values.sujeto.toLowerCase())
    )
      alert("Do no puede ir con ese sujeto");
    else if (
      values.do.toLowerCase() === "does" &&
      doPerson.includes(values.sujeto.toLowerCase())
    )
      alert("Does no puede ir con ese sujeto");
    else {
      setIsValidate(true);
    }
  }
  return (
    <div className="form">
      <label htmlFor="frase" className="form__label">
        Escribe una oracion en <span>simple present interrogative</span>{" "}
        <span>(Do /Does /Don't /Doesn't) + sujeto + verbo?</span>
      </label>
      <div className="do-does-container">
        <label>Do/Does</label>
        <input
          name="do"
          className="form__input"
          onChange={handleChange}
          value={values.do}
        />
      </div>
      <div className="do-does-container">
        <label>Sujeto</label>
        <input
          name="sujeto"
          className="form__input"
          onChange={handleChange}
          value={values.sujeto}
        />
      </div>
      <div className="do-does-container">
        <label>Predicado</label>
        <input
          name="predicado"
          className="form__input"
          onChange={handleChange}
          value={values.predicado}
        />
      </div>
      <div className="do-does-container">
        <label>Simbolo de interrogacion</label>
        <input
          name="simbolo"
          className="form__input"
          onChange={handleChange}
          value={values.simbolo}
        />
      </div>
      <button className="form__button" onClick={validate}>
        validar
      </button>
      <button className="form__button" onClick={cleanData}>
        limpiar campos
      </button>
      {isValidate && <label>Felicitaciones</label>}
    </div>
  );
}

export default App;
