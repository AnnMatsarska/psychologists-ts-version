import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import css from "./AuthForm.module.css";
import { ReactComponent as OpenEye } from "../../images/eye.svg";
import { ReactComponent as ClosedEye } from "../../images/eye-off.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/auth/authSlice";

import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

interface AuthFormProps {
  formTitle: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ formTitle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object({
    ...(formTitle === `Registration` && {
      name: yup.string().required(),
    }),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(10).required(),
  });

  const initialValues: any = {
    ...(formTitle === `Registration` && {
      name: "",
    }),
    email: "",
    password: "",
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      if (formTitle === "Registration") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        await updateProfile(userCredential.user, {
          displayName: values.name,
        });

        const user = userCredential.user;

        dispatch(
          setUser({
            id: user.uid,
            email: values.email,
            name: values.name,
          })
        );
        navigate("/psychologists");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        toast.success(`${user.displayName}, you have successfully logged in!`);
        navigate("/psychologists");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already in use. Please try with a different email."
        );
      } else {
        toast.error("Invalid data. Sign in is failed. Please try again.");
      }
    }

    resetForm();
  };

  return (
    <div className={css.formDiv}>
      <h2 className={css.formTitle}>{formTitle}</h2>
      {formTitle === "Registration" ? (
        <p className={css.formText}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      ) : (
        <p className={css.formText}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }: any) => (
          <Form>
            <div className={css.formWrapper}>
              {formTitle === "Registration" && (
                <>
                  <div className={css.wrapper}>
                    <div
                      className={`${css.inputWrapper} ${
                        errors.email && touched.email ? css.inputError : ""
                      }`}
                    >
                      <Field
                        id="name"
                        type="name"
                        name="name"
                        value={values.name}
                        placeholder="Name"
                        className={css.input}
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={css.errormessage}
                    />
                  </div>
                </>
              )}
              <div className={css.wrapper}>
                <div
                  className={`${css.inputWrapper} ${
                    errors.email && touched.email ? css.inputError : ""
                  }`}
                >
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="Email"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errormessage}
                />
              </div>
              <div className={css.wrapper}>
                <div
                  className={`${css.inputWrapper} ${
                    errors.email && touched.email ? css.inputError : ""
                  }`}
                >
                  <Field
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    placeholder="Password"
                    className={css.input}
                  />
                  <div
                    className={css.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      cursor: "pointer",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    {showPassword ? <OpenEye /> : <ClosedEye />}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.errormessage}
                />
              </div>
            </div>
            {formTitle === "Registration" ? (
              <button type="submit" className={css.buttonForm}>
                Sign Up
              </button>
            ) : (
              <button type="submit" className={css.buttonForm}>
                Log In
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
