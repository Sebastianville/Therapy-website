import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProviderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);

  useEffect(() => {
    //we want to use this over axios because we want the promise to be first fulfilled before the information is being rendered. Also in the directory page it is waiting for the user to click on a certain provider before it renders any information. Therefore, we want the async await
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(`/api/providers/${id}`);
        setProvider(response.data);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProviderDetails();
    // axios
    // .get(`/api/providers/${id}`)
    // .then((res) => setProvider(res.data))
    // console.log(res.data)
    // .catch((error) => console.error(`Error fetching provider details:`, error))
  }, [id]);

  const deleteProviders = async (id) => {
    try {
      //this line will handle the backend
      await axios.delete(`/api/providers/${id}`);
      //this will handle the state in the fronend
      //   setProviders(providers.filter((p) => p._id !== id))
      navigate("/directory");
    } catch (error) {
      console.error(`Couldn't delete a provider: `, error);
    }
  };

  if (!provider)
    return (
      <div>
        <h2>loading....</h2>
      </div>
    );

    return (
      <div className="max-w-4xl mx-auto p-6 pt-6 bg-white shadow-2xl rounded-lg mt-10 mb-50">
        {/* space-y-number addes spacing between the vertical children of the element */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-teal-600">
            {provider.first_name} {provider.last_name}
          </h1>
         
          <button
            onClick={() => navigate(`/updateproviderinfo/${id}`)}
            className="w-8 h-8 bg-teal-500 text-white font-semibold rounded-lg hover:bg-[#d9e4dd] transition duration-200 flex items-center justify-center"
          >
            ✏️
          </button>
        </div>
  
       
        <div className="space-y-3">
          <p className="text-lg text-gray-700">
            <strong className="font-medium">Specialty:</strong>{" "}
            {provider.specality.join(", ")}
          </p>
  
          <p className="text-lg text-gray-700">
            <strong className="font-medium">Languages:</strong>{" "}
            {provider.languages.join(", ")}
          </p>
  
          <p className="text-lg text-gray-700">
            <strong className="font-medium">Phone:</strong>{" "}
            {provider.contact.phone}
          </p>
  
          <p className="text-lg text-gray-700">
            <strong className="font-medium">Email:</strong>{" "}
            {provider.contact.email}
          </p>
  
          <p className="text-lg text-gray-700">
            <strong className="font-medium">Accepting Insurance(s):</strong>
          </p>
          {/* the map method will allow me to go through the insuranceand index is because there is no id */}
          <ul className="list-none pl-0">
            {provider.insurance.map((ins, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {ins.provider} - {ins.plan}
              </li>
            ))}
          </ul>
        </div>
  
        <div className="mt-5">
          {/* Delete button */}
          <button
            onClick={() => deleteProviders(id)}
            className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-200"
          >
            Delete- 🗑️
          </button>
        </div>
      </div>
    );
  }
  

export default ProviderDetails;
