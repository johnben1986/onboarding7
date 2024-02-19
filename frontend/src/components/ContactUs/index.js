import React, { useRef, useState } from "react";
import { message } from "antd";
import { useAPI } from "hooks/useAPI";
const ContactUs = () => {
  const [email, setEmail] = useState('')
  const { api } = useAPI();
  let submitting = useRef(false);
  const formRef = useRef(null)
  const submitForm = async (e) => {
    e.preventDefault();

    if (!submitting.current) {
      submitting.current = true;
      message.loading("Submitting your request...");
      let formObj = Object.fromEntries(new FormData(e.target).entries());
      let tempData = {
        name: formObj.firstName + ' ' + formObj.lastName,
        email: formObj.email,
        subject: formObj.subject,
        message: formObj.message
      }
      // console.log(tempData, 'tempdata')
      try{
        await api.contactUs(tempData);
      message.success(
        "Request submitted! Our team will respond to you at the earliest opportunity."
      );
      setEmail(formObj.email)
      submitting.current = false;
      formRef.current.reset();
      }
      catch(error) {
        console.log('Error Message', error)
      }
    }
  };
  return (
    <>
      <form ref={formRef} onSubmit={submitForm} className="grid grid-cols-2 gap-10 pt-10 text-white" >
        <div className="col-span-1 flex flex-col gap-3">
          <label htmlFor="first">First Name*</label>
          <input
            type="text"
            id="first"
            name="firstName"
            placeholder="Write your first name here"
            className="bg-transparent w-full h-[40px] border-b border-b-slate-400 focus:outline-0"
            required
          />
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <label htmlFor="last">Last Name*</label>
          <input
            type="text"
            id="last"
            name="lastName"
            placeholder="Write your last name here"
            className="bg-transparent w-full h-[40px] border-b border-b-slate-400 focus:outline-0"
            required
          />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Write your email here"
            className="bg-transparent w-full h-[40px] border-b border-b-slate-400 focus:outline-0"
            required
          />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <label htmlFor="subject">Subject</label>
          <textarea
            id="subject"
            name="subject"
            placeholder="Write your message here"
            className="resize-none bg-transparent pt-2 w-full border-b border-b-slate-400 focus:outline-0"
            required
          />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <label htmlFor="message">Message*</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
            className="resize-none bg-transparent pt-2 w-full border-b border-b-slate-400 focus:outline-0"
            required
          />
        </div>
        <div className="col-span-2">
          <button className="rounded-full px-3 py-2 flex-center min-w-[140px] bg-white text-black h-[34px]" type="submit">
            Send It
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactUs;
