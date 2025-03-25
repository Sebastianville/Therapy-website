import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"


function Directory () {
    const [providers, setProviders] = useState([])

    useEffect(() => {
        axios
          .get("/api/providers")
          .then((response) => setProviders(response.data))
          .catch((error) => console.error("Error fetching providers:", error));
      }, []);

      //You don't want a useEffect. You want to listen to the onClick
     



      return (
        <div className="max-w-6xl mx-auto p-6" >
          <h1> Directory</h1>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2 justify-items-center"> */}
            <div>
            {providers.map((provider) => (
              <Link
                to={`/directory/${provider._id}`}
                key={provider._id}>
                <div className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-md transition-transform duration-300 ease-in-out flex flex-col hover:translate-y-[-10px] hover:shadow-lg">
                <div className="p-5 flex flex-col justify-between">
                <h3 className="text-xl font-semibold">{provider.first_name} {provider.last_name}</h3>
                <p className="text-gray-600"><strong>Specialization:</strong> {provider.specality.join(', ')}</p>
                <p className="text-gray-600"><strong>Languages:</strong> {provider.languages.join(', ')}</p>
                <p className="text-gray-600"><strong>Contact:</strong> {provider.contact.phone}</p>
                <p className="text-gray-600"><strong>Email:</strong> {provider.contact.email}</p>
              </div>
            </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }

export default Directory