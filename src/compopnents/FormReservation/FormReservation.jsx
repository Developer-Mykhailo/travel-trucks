import { format } from "date-fns"; //date formatting library
import { ErrorMessage, Field, Formik, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as Yup from "yup";
import s from "./FormReservation.module.scss";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short")
    .max(50, "Too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  date: Yup.string().required("Required"),
  comment: Yup.string().max(500, "Too long"),
});

const FormReservation = () => {
  // hendler
  const handleSubmit = (values, actions) => {
    //eslint-disable-next-line
    const formattedValues = {
      ...values,
      date: values.date ? format(values.date, "yyyy-MM-dd") : "",
    };

    toast.success("successfully sent");

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", date: "", comment: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={s.form}>
        <div className={s.field_wrap}>
          <Field
            className={s.input}
            type="text"
            name="name"
            placeholder="Name*"
          />
          <ErrorMessage name="name" component="span" />
        </div>

        <div className={s.field_wrap}>
          <Field
            className={s.input}
            type="email"
            name="email"
            placeholder="Email*"
          />
          <ErrorMessage name="email" component="span" />
        </div>

        <div className={s.field_wrap}>
          <Field name="date" placeholder="Booking date*">
            {({ field, form }) => (
              <DatePicker
                className={s.input}
                selected={field.value}
                onChange={(date) => form.setFieldValue("date", date)}
                placeholderText="Booking date*"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            )}
          </Field>

          <ErrorMessage name="date" component="span" />
        </div>

        <div className={s.field_wrap}>
          <Field
            className={s.input}
            as="textarea"
            name="comment"
            placeholder="Comment"
          />
          <ErrorMessage name="comment" component="span" />
        </div>

        <button type="submit">Send</button>
      </Form>
    </Formik>
  );
};

export default FormReservation;
