import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Getlogin } from "../service/login";
import { createUser } from "../service/login"; // Importar la función de registro
import { useDispatch } from "react-redux";
import { saveUser } from "../store/slices/loginSlice";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Estados para login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Estados para registro
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);

  // Estado para mensajes de alerta
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(""); // "success" o "danger"

  // Mostrar alerta
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Manejo del login
  const handleLogin = async () => {
    if (!email || !password) {
      showAlert("Por favor completa todos los campos.", "danger");
      return;
    }

    setLoadingLogin(true);
    try {
      const login = await Getlogin(password, email);
      dispatch(saveUser(login));
      localStorage.setItem("token", login.token);
      showAlert("Inicio de sesión exitoso.", "success");
      navigate("/home");
      navigate(0)
    } catch (error) {
      showAlert("Error en el inicio de sesión.", "danger");
      console.error(error);
    } finally {
      setLoadingLogin(false);
    }
  };

  // Manejo del registro
  const handleRegister = async () => {
    if (!name || !registerEmail || !registerPassword || !confirmPassword) {
      showAlert("Por favor completa todos los campos.", "danger");
      return;
    }

    if (registerPassword.length < 6) {
      showAlert("La contraseña debe tener al menos 6 caracteres.", "danger");
      return;
    }

    if (registerPassword !== confirmPassword) {
      showAlert("Las contraseñas no coinciden.", "danger");
      return;
    }

    setLoadingRegister(true);
    try {
      await createUser(registerPassword, registerEmail, name);
      showAlert("Usuario registrado exitosamente.", "success");
    } catch (error) {
      showAlert("Error en el registro. Inténtalo de nuevo.", "danger");
      console.error(error);
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="container login-container">
      {alertMessage && (
        <div className={`alert alert-${alertType} text-center`} role="alert">
          {alertMessage}
        </div>
      )}

      <div className="row">
        {/* Formulario de Login */}
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loadingLogin}>
                {loadingLogin ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {" Cargando..."}
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Formulario de Registro */}
        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <button className="btn btn-success w-100" onClick={handleRegister} disabled={loadingRegister}>
                {loadingRegister ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {" Registrando..."}
                  </>
                ) : (
                  "Crear cuenta"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
