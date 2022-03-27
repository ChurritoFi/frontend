import React from "react";
import Footer from "../components/home/footer";
import Nav from "../components/home/nav";
import { FaTwitter, FaGlobe } from "react-icons/fa";

function About() {
  const team = [
    {
      name: "Saumay Agrawal",
      title: "Project Lead",
      image: "/public/assets/about/saumay.jpg",
      twitter: "https://twitter.com/ChurritoFi",
      website: "https://saumay.com/",
    },
    {
      name: "Jonh Doe",
      title: "Product manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      twitter: "https://twitter.com/ChurritoFi",
    },
    {
      name: "Jonh Doe",
      title: "Product manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      twitter: "https://twitter.com/ChurritoFi",
    },
    {
      name: "Jonh Doe",
      title: "Product manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      twitter: "https://twitter.com/ChurritoFi",
    },
  ];
  return (
    <div>
      <Nav />
      <div className="mb-36 pt-16 px-5 lg:px-0">
        <div className="text-center mt-16">
          <p className="text-sm text-gray">
            ChurritoFi was forked from ChurroFi. Here's
          </p>
          <h2 className="text-gray-dark text-3xl font-medium font-serif mt-2">
            Our Team
          </h2>
          <div className="grid grid-cols-1 mt-16 mx-auto max-w-4xl gap-14">
            <div className="flex justify-self-center">
              <div className="mr-5">
                <img
                  src={`/assets/about/jeanregisser.jpg`}
                  className="lg:w-24 lg:h-24 w-20 h-20 rounded-full overflow-hidden object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-gray-dark text-lg font-medium">
                  Jean Regisser
                </p>
                <p className="text-sm text-gray mt-1">Project Lead</p>
                <div className="mt-2 text-secondary-light-light">
                  <a href="https://twitter.com/jeanregisser" target="_blank">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray mt-16">
            We are forever grateful to the original
          </p>
          <h2 className="text-gray-dark text-3xl font-medium font-serif mt-2">
            ChurroFi Team
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 mx-auto max-w-4xl gap-14">
            <div className="flex justify-self-center">
              <div className="mr-5">
                <img
                  src={`/assets/about/saumay.jpg`}
                  className="lg:w-24 lg:h-24 w-20 h-20 rounded-full overflow-hidden object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-gray-dark text-lg font-medium">
                  Saumay Agarwal
                </p>
                <p className="text-sm text-gray mt-1">Project Lead</p>
                <div className="mt-2 text-secondary-light-light">
                  <a href="https://saumay.com/" target="_blank">
                    <FaGlobe />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-self-center">
              <div className="mr-5">
                <img
                  src={`/assets/about/prasang.jpg`}
                  className="lg:w-24 lg:h-24 w-20 h-20 rounded-full overflow-hidden object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-gray-dark text-lg font-medium">
                  Prasang Sharma
                </p>
                <p className="text-sm text-gray mt-1">Product Manager</p>
                <div className="mt-2 text-secondary-light-light">
                  <a href="https://twitter.com/prasang7_" target="_blank">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-self-center">
              <div className="mr-5">
                <img
                  src={`/assets/about/manan.jpeg`}
                  className="lg:w-24 lg:h-24 w-20 h-20 rounded-full overflow-hidden object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-gray-dark text-lg font-medium">
                  Manan Gouhari
                </p>
                <p className="text-sm text-gray mt-1">Product Developer</p>
                <div className="mt-2 text-secondary-light-light">
                  <a href="https://twitter.com/manangouhari" target="_blank">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
