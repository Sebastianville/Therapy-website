import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProviderDetails () {
    const {id} = useParams()
    const navigate = useNavigate()

    const [provider, setProvider] = useState(null)

    useEffect(() => {
        //we want to use this over axios because we want the promise to be first fulfilled before the information is being rendered. Also in the directory page it is waiting for the user to click on a certain provider before it renders any information. Therefore, we want the async await
        const fetchProviderDetails = async () => {
            try {
                const response = await axios.get(`/api/providers/${id}`)
                setProvider(response.data)
            } catch (e) {
                console.error(e)

            }
        }
        fetchProviderDetails()
        // axios
        // .get(`/api/providers/${id}`)
        // .then((res) => setProvider(res.data))
        // console.log(res.data)
        // .catch((error) => console.error(`Error fetching provider details:`, error))
    }, [id])

    const deleteProviders = async(id) => {
        try {
          //this line will handle the backend
          await axios.delete(`/api/providers/${id}`)
          //this will handle the state in the fronend
        //   setProviders(providers.filter((p) => p._id !== id))
        navigate("/directory")
        } catch (error) {
          console.error(`Couldn't delete a provider: `, error)          
        }
      }
    

    if(!provider) return (
        <div>
            <h2>loading....</h2>
        </div>
    )

    return (
      <div className="max-w-4xl mx-auto p-6 pt-6 bg-white shadow-2xl rounded-lg mt-10 mb-10">
        
        <h1 className="text-3xl font semibold text-teal-600 mb-4" >{provider.first_name} {provider.last_name}</h1>

        {/* soace-y-number addes spacing between the vertical children of the element */}
        <div className="space-y-3" >
          <p className="text-lg text-gray-700">
            <strong className="font-medium">Specialty:</strong> {provider.specality.join(", ")}
          </p>

          <p className="text-lg text-gray-700">
            <strong className="font-medium">Languages:</strong> {provider.languages.join(", ")}
          </p>

          <p className="text-lg text-gray-700">
            <strong className="font-medium">Phone:</strong> {provider.contact.phone}
          </p>

          <p className="text-lg text-gray-700">
            <strong className="font-medium">Email:</strong> {provider.contact.email}
          </p>

        </div>
    
        <div className="mt-5">
          <button onClick={() => deleteProviders(id)} className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-200 ">
            Delete
          </button>

          <button onClick={() => navigate(`/updateproviderinfo/${id}`)}  className="text-blue-500 underline">
          Edit
          </button>
        </div>
      </div>
    );
}

export default ProviderDetails;