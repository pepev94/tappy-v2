"use client";
import { Formik, Field, Form } from "formik";
import { useSearchParams } from "next/navigation";
import logo from "../../assets/logo.jpeg";
import Image from "next/image";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Favor de poner el nombre"),
  lastName: Yup.string().required("Favor de poner el apellido"),
  email: Yup.string().email("Correo invalido"),
  phone: Yup.string().required("Favor de poner su teléfono"),
});

const handleSaveContact = ({
  firstName,
  lastName,
  phone,
  email,
}: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}) => {
  // Create a vCard file using the contact values
  const vcard = `BEGIN:VCARD\nVERSION:4.0\nFN:${firstName} ${lastName}\nTEL;TYPE=work,voice:${phone}\nEMAIL:${email}\nEND:VCARD`;
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = `${firstName}_${lastName}.vcf`;
  link.href = url;
  link.click();
};

const ClientForm = () => {
  const searchParams = useSearchParams();
  const agentName = searchParams.get("name") || "";
  const agentLastName = searchParams.get("lastName") || "";
  const agentEmail = searchParams.get("email") || "";
  const agentPhone = searchParams.get("phone") || "";

  return (
    <div className="p-8">
      <div className="flex flex-col	">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            handleSaveContact({
              firstName: agentName,
              lastName: agentLastName,
              phone: agentPhone,
              email: agentEmail,
            });
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-2">
              <Image
                alt="logo"
                src={logo}
                width={400}
                height={50}
                className="mx-auto mb-10"
              />
              <label htmlFor="firstName">Nombre *</label>
              <Field
                className={`p-2 border-solid border-2 border${
                  errors.firstName ? "-red-500" : "-sky-100"
                } rounded`}
                id="firstName"
                name="firstName"
                placeholder="Jane"
              />
              {errors.firstName && touched.firstName ? (
                <div className="text-red-500">{errors.firstName}</div>
              ) : null}
              <label htmlFor="lastName">Apellido *</label>
              <Field
                className={`p-2 border-solid border-2 border${
                  errors.lastName ? "-red-500" : "-sky-100"
                } rounded`}
                id="lastName"
                name="lastName"
                placeholder="Doe"
              />
              {errors.lastName && touched.lastName ? (
                <div className="text-red-500">{errors.lastName}</div>
              ) : null}
              <label htmlFor="email">Email</label>
              <Field
                className={`p-2 border-solid border-2 border${
                  errors.email ? "-red-500" : "-sky-100"
                } rounded`}
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
              ) : null}

              <label className="px-2" htmlFor="phone">
                Teléfono *
              </label>
              <Field
                className={`p-2 border-solid border-2 border${
                  errors.phone ? "-red-500" : "-sky-100"
                } rounded`}
                id="phone"
                name="phone"
                placeholder="33333333333"
                type="tel"
              />
              {errors.phone && touched.phone ? (
                <div className="text-red-500">{errors.phone}</div>
              ) : null}
              <button
                type="submit"
                className="rounded bg-slate-800 text-white py-2 mt-10"
              >
                Guardar Contacto
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ClientForm;
