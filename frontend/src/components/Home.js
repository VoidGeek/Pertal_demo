import React from "react";

const Homepage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Website</h1>
          <p className="text-lg">We provide top-notch services and deliver amazing projects.</p>
          <a
            href="#services"
            className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-full"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p className="text-gray-600">We create stunning websites and web applications.</p>
            </div>
            {/* Repeat this card structure for other services */}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Project Title</h3>
              <p className="text-gray-600">Brief description of the project.</p>
              <button className="text-blue-900 font-bold bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-full">
                Button Text
              </button>
            </div>
            {/* Repeat this card structure for other projects */}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">"Working with this company was a great experience. They exceeded our expectations."</p>
              <p className="font-semibold mt-4">John Doe</p>
            </div>
            {/* Repeat this card structure for other testimonials */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
