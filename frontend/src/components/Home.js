import React, { useEffect, useState } from 'react';
import TestimonialCard from '../pages/testimonials/TestimonialCard';
import TestimonialService from '../services/testimonial.service';
import ImageService from '../services/image.service';
import ProjectService from '../services/project.service';
import ProjectCard from '../pages/projects/ProjectCard';
import { Carousel } from 'react-responsive-carousel';


import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-100 to-blue-100 text-black">
      <div className="container bg-gradient-to-b from-red-100 to-blue-200 shadow-md mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left md:pr-8">
          <h2 className="text-3xl font-bold mb-4">Explore Our Website</h2>
          <Link to="/contactUs">
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4  text-lg hover:from-green-600 hover:to-green-400">
              Feel Free to Ask
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 text-center">
        <img
          src="https://i.ibb.co/gJCWy1w/image-2023-10-28-130116231-removebg-preview.png"
          alt="Company Logo"
        />
        </div>
      </div>
    </section>
  );
};





const SkeletonCard = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <div className="flex items-start">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mr-4"></div>
        <div>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
            </div>
          </div>
          <div className="bg-gray-300 h-6 w-1/2 mx-auto animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      TestimonialService.getAllTestimonials(),
      ProjectService.getAllProjects(),
      ImageService.getAllImages(),
    ])
      .then(([testimonials, projects, imageData]) => {
        setAllTestimonials(testimonials);
        setAllProjects(projects);
        setImages(imageData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const getRandomTestimonials = (testimonials, startIndex, count) => {
    return testimonials.slice(startIndex, startIndex + count);
  };

  const testimonialsPerPage = 2; // Number of testimonials to display per page
  const totalPages = Math.ceil(allTestimonials.length / testimonialsPerPage);

  const handleNextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const randomTestimonials = getRandomTestimonials(
    allTestimonials,
    currentIndex * testimonialsPerPage,
    testimonialsPerPage
  );
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      {/* ... (existing code) */}
      <WelcomeSection />
      {/* Testimonials Section */}
       {/* Projects Section */}
       <section className="py-16 bg-gradient-to-b from-blue-100 to-blue-300">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">Our Projects</h2>
    {loading ? (
      Array(3).fill().map((_, index) => <SkeletonCard key={index} />)
    ) : (
      <Carousel
        showArrows={true} // Show navigation arrows
        autoPlay={true} // Enable auto-play
        interval={5000} // Set auto-play interval (in milliseconds)
        infiniteLoop={true} // Enable infinite loop
        stopOnHover={false} // Disable auto-play on hover
      >
        {allProjects.map((project) => {
          const matchingImage = images.find((image) => image.s3Key === project.project_image);
          return (
            <ProjectCard key={project._id} project={project} image={matchingImage} />
          );
        })}
      </Carousel>
    )}
  </div>
</section>
       {/* Testimonials Section */}
       <section className="py-16 bg-gradient-to-b from-blue-300 to-grey-300">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8  text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {loading ? (
              Array(3).fill().map((_, index) => <SkeletonCard key={index} />)
            ) : (
              randomTestimonials.map((testimonial) => {
                const matchingImage = images.find((image) => image.s3Key === testimonial.test_image);
                return (
                  <TestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                    image={matchingImage}
                  />
                );
              })
            )}
          </div>
          <div className='text-right'> {totalPages > 1 && (
            <button onClick={handleNextPage}>Next</button>
          )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
     
   