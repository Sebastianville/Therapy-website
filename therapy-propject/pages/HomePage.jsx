import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    axios.get('/api/providers')
      .then(response => {
        //increase the number now that I have more data
        setProviders(response.data.slice(0, 6));  
      })
      .catch(error => {
        console.error('Error fetching providers:', error);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">

      <h1>Welcome to Company Name</h1>
      <p>We hope to be of support when finding the right provider. Please don't hesistate to browse around. </p>
        
      {/* Hero Section */}
      <section className="text-center py-12 bg-soft-teal text-white">
        <h1 className="text-4xl font-semibold">Welcome to Wellness Providers</h1>
        <p className="mt-2 text-lg">Connecting you with the best wellness professionals.</p>
      </section>

      {/* Featured Providers */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Featured Providers</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2 justify-items-center">
          {providers.map((provider) => (
            <div key={provider._id} className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-md transition-transform duration-300 ease-in-out flex flex-col hover:translate-y-[-10px] hover:shadow-lg">
              <div className="p-5 flex flex-col justify-between">
                <h3 className="text-xl font-semibold">{provider.first_name} {provider.last_name}</h3>
                <p className="text-gray-600"><strong>Specialization:</strong> {provider.specality.join(', ')}</p>
                <p className="text-gray-600"><strong>Languages:</strong> {provider.languages.join(', ')}</p>
                <p className="text-gray-600"><strong>Contact:</strong> {provider.contact.phone}</p>
                <p className="text-gray-600"><strong>Email:</strong> {provider.contact.email}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;