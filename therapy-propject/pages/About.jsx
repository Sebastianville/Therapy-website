


function About() {
    return (
        // mx-auto margins to the center and px creates padding the horiziontal padding and py creates padding to the vertical (up and down)
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-6">Lear More About Us</h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
        We want our members to find their providers without taking unnecessary steps. Our platform strives daily to create a welcoming and safe community for our trusted providers and members. This platform is open to anyone and whatever their needs are, we hope to connect you to the proper support. 
        </p>
  
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
            Our mission is to create a space where a member can connect to one of our qualified providers by a few clicks away. We do this by creating a seamless and user-friendly experience. Through this platform, we hope to empower individuals by informing them and removing the structural barriers that many face on a day-to-day basis. 
            </p>
          </div>
  
          <div>
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Why Choose Us?</h2>

            <ul className="text-gray-700 leading-relaxed list-disc list-inside">
            <li>A carefully curated network of licensed professionals</li>
            <li>A streamlined search and matching process</li>
            <li>Verified provider details to ensure transparency</li>
            <li>Support for diverse needs, including specialties, insurance, and language preferences</li>
            </ul>
          </div>
        </div>
  
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-teal-600 text-center mb-4">Our Commitment</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
          Our top commitment is a space that ensures and values accessibility, quality, and trust. Whether you are seeking services or providing said services, we want these commitments to be present everywhere  
          </p>
        </div>
      </div>
    );
  }
  
  export default About;