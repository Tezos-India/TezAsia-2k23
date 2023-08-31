import React from "react";
import ContactForm from "@/components/ContactUs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
const ContactUs: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900  to-gray-800 ">
       <Navbar />
       
       <hr className="border-t border-white h-2 my-2"></hr>
    <div className="container mx-auto mt-8 pb-8">
      <h1 className="font-semibold mb-4 items-center justify-center text-4xl text-purple-500 pt-6">Contact Us</h1>
      <p className="mb-8 flex items-center justify-center text-xl text-gray-400 pt-6">
        Have questions or feedback? Reach out to us using the form below.
      </p>
      <ContactForm /> 
    </div>
    <Footer />
    </div>
  );
};

export default ContactUs;
