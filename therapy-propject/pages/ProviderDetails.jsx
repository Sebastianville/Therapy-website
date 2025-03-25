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
        <div>
          <h1>{provider.first_name} {provider.last_name}</h1>
          <p><strong>Specialty:</strong> {provider.specality.join(", ")}</p>
          <p><strong>Languages:</strong> {provider.languages.join(", ")}</p>
          <p><strong>Phone:</strong> {provider.contact.phone}</p>
          <p><strong>Email:</strong> {provider.contact.email}</p>
          <button onClick={() => deleteProviders(id)}> delete button </button>
        </div>
      );
}

export default ProviderDetails;