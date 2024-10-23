import React, { useState } from 'react';
import axios from 'axios';

interface ContactFormData {
  name: string;
  email: string;
  contactNumber: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://67187dfdb910c6a6e02c55b2.mockapi.io/ContactInfo', formData);
      
      if (response.status === 201) {
        // Success message
        
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      // Error message
      alert('Submission Failed. Please try again.');
    } 
    console.log('Form submitted Successfully' );
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            {/* Logo */}
            <div className="flex space-x-4">
              <a href="#" className="flex items-center py-5 px-2 text-green-600">
                <span className="font-bold text-xl">GUVI</span>
              </a>

              {/* Primary Nav Links */}
              <div className="hidden md:flex items-center space-x-1">
                {['Courses', 'Live Classes', 'Practice', 'Resources', 'Solutions'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="py-5 px-3 text-gray-700 hover:text-green-600"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Secondary Nav Links */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-500">
                Login
              </a>
              <a href="#" className="py-2 px-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-500 hover:text-white">
                Sign Up
              </a>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu md:hidden ${isMobileMenuOpen ? '' : 'hidden'}`}>
          {['Courses', 'Live Classes', 'Practice', 'Resources', 'Solutions', 'Login', 'Sign Up'].map(
            (item) => (
              <a key={item} href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
                {item}
              </a>
            )
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="container mx-auto flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0">
          {/* Contact Information */}
          <div className="flex flex-col justify-evenly w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
            <p className="mb-6">
              Let us know your queries, feedbacks and enquiries. We are here to support you 24/7.
            </p>
            
            {[
              { title: 'Give us a call', content: '+91 9736097320' },
              { title: 'Write to us', content: 'cs@guvi.in' },
              {
                title: 'Visit us in Chennai',
                content:
                  'IITM Research park - phase 2, module #9, 3rd floor, D block, Kanagam Rd, Taramani, Chennai, Tamil Nadu 600113'
              },
              {
                title: 'Visit us in Noida',
                content:
                  'A11, HCL Corporation Pvt. Ltd, Block A, Sector 3, Noida, Uttar Pradesh 201307'
              }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <hr className="my-6" />
                <div className="mb-6">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-green-600">Say Hello!</h2>
            <p className="text-gray-600 mb-8">Feel free to stop by and say hi!</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'name', label: 'Name', type: 'text' },
                { id: 'email', label: 'E-mail id', type: 'email' },
                { id: 'contactNumber', label: 'Contact Number', type: 'text' },
                { id: 'subject', label: 'Subject', type: 'text' }
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-gray-700 font-semibold">
                    {field.label} *
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    value={formData[field.id as keyof ContactFormData]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;