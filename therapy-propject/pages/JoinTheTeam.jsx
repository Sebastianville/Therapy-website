import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

//! This schema should properly match my backend model and give validation so the data is not incorrect when it reaches to the backend
const JoinUsSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  specality: yup
    .array()
    .of(yup.string().required("Each specialty is required"))
    .min(1, "Add at least one specialty")
    .required("Add your specialties. You can add more than one"),
  languages: yup
    .array()
    .of(yup.string().required("Each language is required"))
    .min(1, "Add at least one language")
    .required("Add the languages you are able to speak to our members"),
  insurance: yup
    .array()
    .of(
      yup.object().shape({
        provider: yup.string().required("Insurance provider is required"),
        plan: yup.string().required("Insurance plan is required"),
      })
    )
    .min(1, "Add at least one insurance plan")
    .required("INsurance information is required"),
  contact: yup.object().shape({
    phone: yup
      .string()
      .matches(/^\d{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
    email: yup
      .string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  }),
});

function JoinTheTeam() {
  const navigate = useNavigate();
  //   console.log('hello')

  // step 1: Pass the useFormik() hook initial form values and a submit function that will handle it
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      specality: [],
      languages: [],
      insurance: [],
      contact: {
        phone: "",
        email: "",
      },
    },
    validationSchema: JoinUsSchema,
    onSubmit: async (values, {setSubmitting}) => {
      console.log("Submitting form...", values)
      setSubmitting(true)
      try {
        await axios.post(`/api/providers`, values);
        navigate("/directory");
      } catch (error) {
        console.error("Error submitting the form:", error);
      } finally {
        setSubmitting(false)
      }
    },
  });
  // step 2:  be called when the form is submitted
  return (
    <div className="flex flex-col items-center bg-soft-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-soft-teal mb-6">Join The Team</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
      >
        {/* First Name */}
        <label
          htmlFor="first_name"
          className="block text-soft-teal font-medium"
        >
          First Name
        </label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.first_name}
          </p>
        )}

        {/* Last Name */}
        <label
          htmlFor="last_name"
          className="block text-soft-teal font-medium mt-4"
        >
          Last Name
        </label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.last_name}</p>
        )}

        {/* Specialty */}
        <label
          htmlFor="specality"
          className="block text-soft-teal font-medium mt-4"
        >
          Specialties
        </label>
        <input
          id="specality"
          name="specality"
          type="text"
          onChange={(e) => {
            const value = e.target.value.split(",");
            formik.setFieldValue("specality", value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.specality.join(",")}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />
        {formik.touched.specality && formik.errors.specality && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.specality}</p>
        )}

        {/* Languages */}
        <label
          htmlFor="languages"
          className="block text-soft-teal font-medium mt-4"
        >
          Languages
        </label>
        <input
          id="languages"
          name="languages"
          type="text"
          onChange={(e) => {
            const value = e.target.value.split(",");
            formik.setFieldValue("languages", value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.languages.join(",")}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />
        {formik.touched.languages && formik.errors.languages && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.languages}</p>
        )}

        {/* Phone */}
        <label
          htmlFor="phone"
          className="block text-soft-teal font-medium mt-4"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="contact.phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contact?.phone || ""}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />
        {formik.errors.contact?.phone && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.contact.phone}
          </p>
        )}

        {/* Email */}
        <label
          htmlFor="email"
          className="block text-soft-teal font-medium mt-4"
        >
          Email
        </label>
        <input
          id="email"
          name="contact.email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contact?.email || ""} // <- Add fallback to empty string
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />
        {formik.errors.contact?.email && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.contact.email}
          </p>
        )}

        {/* Insurance Section */}
        <label className="block text-soft-teal font-medium mt-4">
          Insurance
        </label>
        {formik.values.insurance.map((ins, index) => (
          <div key={index} className="flex gap-2 mt-2">
            {/* Provider Input */}
            <input
              type="text"
              name={`insurance[${index}].provider`}
              placeholder="Insurance Provider"
              value={formik.values.insurance[index].provider}
              onChange={formik.handleChange}
              className="w-1/2 border border-gray-300 rounded-md p-2"
            />
            {/* Plan Input */}
            <input
              type="text"
              name={`insurance[${index}].plan`}
              placeholder="Insurance Plan"
              value={formik.values.insurance[index].plan}
              onChange={formik.handleChange}
              className="w-1/2 border border-gray-300 rounded-md p-2"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => {
                const updatedInsurance = [...formik.values.insurance];
                updatedInsurance.splice(index, 1);
                formik.setFieldValue("insurance", updatedInsurance);
              }}
              className="text-red-500 font-bold"
            >
              X
            </button>
          </div>
        ))}

        {/* Error Messages */}
        {formik.errors.insurance &&
          typeof formik.errors.insurance === "string" && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.insurance}
            </p>
          )}

        {/* Add Insurance Button */}
        <button
          type="button"
          onClick={() => {
            formik.setFieldValue("insurance", [
              ...formik.values.insurance,
              {plan: "",  provider: "" },
            ]);
          }}
          className="mt-2 bg-blue-500 text-white font-semibold py-1 px-3 rounded-md"
        >
          + Add Insurance
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-700 text-white font-semibold py-2 px-4 rounded-md mt-6 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default JoinTheTeam;
