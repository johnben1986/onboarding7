import React from "react";
import Modal from "react-modal";
import { AiFillCreditCard } from "react-icons/ai";
const PricingModal = ({
  isOpen,
  closeModal,
  handleSelectChange,
  payWithCard,
  modalContent,
  selectedOption,
  showErrorMessage,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "linear-gradient( 90deg, #2e42ae 0%, #616fbe 100%)",
      border: "none",
      borderRadius: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  let title, monthlyValue, yearlyValue, totalPrice;
  if (modalContent === "personal") {
    title = "Personal Package";
    monthlyValue = 100;
    yearlyValue = 1000;
  } else if (modalContent === "business") {
    title = "Business Package";
    monthlyValue = 300;
    yearlyValue = 3000;
  } else if (modalContent === "ultimate") {
    title = "Ultimate Package";
    monthlyValue = 12000;
    yearlyValue = 12000;
  }

  if (selectedOption === 100 || selectedOption === 300) {
    totalPrice = monthlyValue;
  } else if (selectedOption === 1000 || selectedOption === 3000) {
    totalPrice = yearlyValue;
  } else if (selectedOption === 12000 || selectedOption === 12000) {
    totalPrice = yearlyValue;
  }


  const modifiedHandleSelectChange = (e) => {
    
    const value = e.target.value;
    if (value === monthlyValue.toString() || value === yearlyValue.toString()) {
      const plan = value === monthlyValue.toString() ? 'monthly' : 'yearly';
      handleSelectChange(e, plan);
    }
    
  };
  return (

    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="min-w-[300px]">
        <h2 className="border-b border-white pb-2 text-white">{title}</h2>
        <div className="my-6">
        <>
            {modalContent == "ultimate" ? <>
              
            <div className="text-white"                 defaultValue={selectedOption}
                onChange={modifiedHandleSelectChange} >Total Price: ${totalPrice=12000}</div>

<div className="text-right mt-5">
  <button
    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
    onClick={closeModal}
  >
    Close
  </button>
  <button
    className="ml-1 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    onClick={() => payWithCard(true)}
  >
    Pay with Card
    <AiFillCreditCard className="text-xl" />
  </button>
</div>
              
            </> : <>
              
              <select
                id="countries"
                defaultValue={selectedOption}
                onChange={modifiedHandleSelectChange}
                className="mb-3 block w-full rounded-lg border border-gray-300 p-2.5 text-black"
              >
                <option selected>Select One</option>
                <option value={monthlyValue}>Monthly</option>
                <option value={yearlyValue}>Yearly</option>
              </select>
      
          <div>
          {showErrorMessage && (
            <div className="text-red-500 mb-1">Please select a plan.</div>
          )}
          </div>
              <div className="text-white">Total Price: ${totalPrice}</div>

       
        <div className="text-right">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="ml-1 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => payWithCard(true)}
          >
            Pay with Card
            <AiFillCreditCard className="text-xl" />
          </button>
            </div>
                          </>}
          </>
          
          </div>
      </div>
    </Modal>

  );
};

export default PricingModal;
