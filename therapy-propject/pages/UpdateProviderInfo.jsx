import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";


const UpdateProviderSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  specality: yup.array().of(yup.string().required("Each specialty is required")).min(1, "Add at least one specialty").required("Add your specialties. You can add more than one"),
  languages: yup.array().of(yup.string().required("Each language is required")).min(1, "Add at least one language").required("Add the languages you are able to speak to our members"),
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
    phone: yup.string().matches(/^\d{11}$/, "Phone number must be 11 digits").required("Phone number is required"),
    email: yup.string().email("Email must be a valid email address").required("Email is required"),
  }),
});

function UpdateProviderInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null)
 
  
  useEffect(() => {
    //we want to use this over axios because we want the promise to be first fulfilled before the information is being rendered. Also in the directory page it is waiting for the user to click on a certain provider before it renders any information. Therefore, we want the async await
    const fetchProviderDetails = async () => {
        try {
            const response = await axios.get(`/api/providers/${id}`)
            setProvider(response.data)
            console.log(response.data)
        } catch (e) {
            console.error(e)

        }
    }
    fetchProviderDetails()
}, [id])


  const formik = useFormik({
    initialValues: {
      first_name: provider?.first_name,
      last_name: provider?.last_name,
      specality: provider?.specality,
      languages: provider?.languages,
      insurance: provider?.insurance,
      contact: {
        phone: provider?.contact.phone,
        email: provider?.contact.email,
      },
    },
    enableReinitialize: true,
    validationSchema: UpdateProviderSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true);
      try {
        await axios.patch(`/api/providers/${id}`, values);
        navigate("/directory");
      } catch (error) {
        console.error("Error updating provider info:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  
  return (
    <div className="flex flex-col items-center bg-soft-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-soft-teal mb-6">Update Provider Info</h1>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        
        {/* First Name */}
        <label className="block text-soft-teal font-medium">First Name</label>
        <input
          name="first_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />
        
        {/* Last Name */}
        <label className="block text-soft-teal font-medium mt-4">Last Name</label>
        <input
          name="last_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.last_name}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />

        {/* Specialty */}
        <label className="block text-soft-teal font-medium mt-4">Specialties</label>
        <input
          name="specality"
          type="text"
          onChange={(e) => formik.setFieldValue("specality", e.target.value.split(","))}
          value={formik.values.specality?.join(",")}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />

        {/* Languages */}
        <label className="block text-soft-teal font-medium mt-4">Languages</label>
        <input
          name="languages"
          type="text"
          onChange={(e) => formik.setFieldValue("languages", e.target.value.split(","))}
          value={formik.values.languages?.join(",")}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />

        {/* Phone */}
        <label className="block text-soft-teal font-medium mt-4">Phone Number</label>
        <input
          name="contact.phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contact?.phone || ""}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />

        {/* Email */}
        <label className="block text-soft-teal font-medium mt-4">Email</label>
        <input
          name="contact.email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contact?.email || ""}
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
        />

        {/* Insurance Section */}
        <label className="block text-soft-teal font-medium mt-4">Insurance</label>
        {formik.values.insurance?.map((ins, index) => (
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
        {formik.errors.insurance && typeof formik.errors.insurance === "string" && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.insurance}</p>
        )}

        {/* Add Insurance Button */}
        <button
          type="button"
          onClick={() => {
            formik.setFieldValue("insurance", [
              ...formik.values.insurance,
              { provider: "", plan: "" },
            ]);
          }}
          className="mt-2 bg-blue-500 text-white font-semibold py-1 px-3 rounded-md"
        >
          + Add Insurance
        </button>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-teal-700 text-white font-semibold py-2 px-4 rounded-md mt-6 transition">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProviderInfo;