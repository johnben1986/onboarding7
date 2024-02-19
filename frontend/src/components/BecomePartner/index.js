import React, { useRef, useState } from "react";
import { message } from "antd";
import { useAPI } from "hooks/useAPI";
const BecomePartner = () => {
  const {api} = useAPI();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    message.loading("Submitting your request...");
    try{
      await api.contactUsPartner(formData);
      message.success(
        "Request submitted Thankyou!"
      );
      console.log('Form data submitted:', formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    }
    catch(error) {
      console.log('Error on sending email', error)
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <form
        className="mt-5 grid grid-cols-2 gap-10 rounded-2xl border bg-primary-newBgColor2/40 p-2 px-4 text-white"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 flex flex-col gap-5">
          <label htmlFor="First">First Name*</label>
          <input
            type="text"
            id="First"
            name="firstName"
            placeholder="Write your first name here..."
            value={formData.firstName}
            onChange={handleInputChange}
            className="border-b border-slate-400 bg-transparent focus:outline-0 py-2.5"
            required
          />
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <label htmlFor="Last">Last Name*</label>
          <input
            type="text"
            id="Last"
            name="lastName"
            placeholder="Write your last name here..."
            value={formData.lastName}
            onChange={handleInputChange}
            className="border-b border-slate-400 bg-transparent focus:outline-0 py-2.5"
            required
          />
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <label htmlFor="Email">Email*</label>
          <input
            type="email"
            id="Email"
            name="email"
            placeholder="Write your email here..."
            value={formData.email}
            onChange={handleInputChange}
            className="border-b border-slate-400 bg-transparent focus:outline-0 py-2.5"
            required
          />
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <label htmlFor="Message">Message*</label>
          <textarea
            placeholder="Write your message here..."
            type="text"
            id="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="resize-none border-b border-slate-400 bg-transparent focus:outline-0"
            required
          />
        </div>
        <div className="col-span-2">
          <button
            className="h-[38px] min-w-[120px] rounded-full bg-white px-4 py-3 text-black"
            type="submit"
          >
            Send It
          </button>
        </div>
      </form>
    </>
  );
};

export default BecomePartner;
