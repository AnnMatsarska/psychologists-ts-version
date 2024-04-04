import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import css from './AppointmentForm.module.css';
import { CustomTimeField } from './CustomTimeField';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppointmentForm = ({ psychologist, onClose }) => {
  const initialValues = {
    name: '',
    number: '',
    time: '',
    email: '',
    comment: '',
  };
  const phoneRegExp = /^\+380\d{9}$/;

  const validationSchema = yup.object({
    name: yup.string().required(),
    number: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required(),
    time: yup.string().required(),
    email: yup.string().email('Invalid email').required(),
    comment: yup.string().required(),
  });

  const handleSubmit = () => {
    toast.success('Appointment with psychologist confirmed!');
    onClose();
  };
  return (
    <div className={css.appFormContainer}>
      <h3 className={css.formTitle}>
        Make an appointment with a psychologists
      </h3>
      <p className={css.formText}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div style={{ display: 'flex', gap: '14px', marginBottom: '40px' }}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          width="44px"
          height="44px"
          style={{ borderRadius: '15px' }}
        />
        <div>
          <p className={css.itemText}>Your psychologists</p>
          <p className={css.formItemName}>{psychologist.name}</p>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={css.formWrapper}>
              <div className={css.wrapper}>
                <div
                  className={`${css.inputWrapper} ${
                    errors.name && touched.name ? css.inputError : ''
                  }`}
                >
                  <Field
                    id="name"
                    type="name"
                    name="name"
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
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className={css.wrapper} style={{ width: '232px' }}>
                  <div
                    className={`${css.inputWrapper} ${
                      errors.number && touched.number ? css.inputError : ''
                    }`}
                  >
                    <Field
                      id="number"
                      type="tel"
                      name="number"
                      placeholder="+380"
                      className={css.input}
                    />
                  </div>
                  <ErrorMessage
                    name="number"
                    component="div"
                    className={css.errormessage}
                  />
                </div>
                <div className={css.wrapper} style={{ width: '232px' }}>
                  <div
                    className={`${css.inputWrapper} ${
                      errors.time && touched.time ? css.inputError : ''
                    }`}
                  >
                    <Field name="time">
                      {({ field, form }) => (
                        <CustomTimeField field={field} form={form} />
                      )}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="time"
                    component="div"
                    className={css.errormessage}
                  />
                </div>
              </div>
              <div className={css.wrapper}>
                <div
                  className={`${css.inputWrapper} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
                >
                  <Field
                    id="email"
                    type="email"
                    name="email"
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
                  style={{ height: '116px' }}
                  className={`${css.inputWrapper} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
                >
                  <Field
                    as="textarea"
                    id="comment"
                    type="textarea"
                    name="comment"
                    placeholder="Comment"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.errormessage}
                />
              </div>
            </div>
            <button type="submit" className={css.buttonForm}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
