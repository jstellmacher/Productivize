import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-4 py-12 bg-gray-200 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              imperdiet purus ac consequat maximus. Sed elementum luctus tellus,
              nec efficitur erat rutrum sed.
            </p>
            <p className="text-gray-600 mt-4">
              Mauris rhoncus tempor purus, a lacinia nisl auctor sed. Mauris
              cursus ornare libero non tincidunt. Vivamus vel tincidunt nunc, et
              pharetra nunc. Donec pharetra, dolor in fringilla faucibus, sem
              purus porta ex, nec sagittis arcu purus nec ex.
            </p>
            <div className="flex items-center mt-4">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src="https://picsum.photos/200/330"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="text-gray-800 font-bold">Jai S</p>
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  My Github!
                </a>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <img
                src="https://picsum.photos/200/300"
                alt="About"
                className="rounded-xl shadow-lg"
            />
            </div>

        </div>
      </div>
    </section>
  );
};

export default About;
