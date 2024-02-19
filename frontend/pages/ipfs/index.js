import React, { useState } from "react";
import { reactIcons } from "components/utils/icons";
import web3 from "/public/assets/images/web3logo.png";
import Image from "next/image";
import { Collapse } from "@mui/material";
import Link from "next/link";
import web from "/public/assets/images/web3logo-white.png";
import Account from "components/Account/Account";
import Footer from "components/Layout/Footer";
import { withAuth } from "components/Auth/authMiddleware";
import MetadataHelper from "components/MetadataHelper";
const Ipfs = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: "How can I host my website on IPFS?", isOpen: false },
    { id: 2, question: "Why Use IPFS for Web3 websites?", isOpen: false },
    {
      id: 3,
      question: "Can I Modify My Website After Uploading?",
      isOpen: false,
    },
    {
      id: 4,
      question: "How much does it cost to host a Web3 website?",
      isOpen: false,
    },
  ]);
  const toggleQuestion = (id) => {
    setQuestions(
      questions.map((item) =>
        id === item.id
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
  };
  const [isProfile, setIsProfile] = useState(false);
  const toggleProfile = () => {
    setIsProfile(!isProfile);
  };
  const optionValues = ["Advanced Hosting", "Shared Hosting", "VPS Hosting"];

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <main className="bg-image3 min-h-screen">
      <MetadataHelper noindex title="IPFS Hosting" />
      {/* <nav className=" flex h-[70px] items-stretch justify-between border-b lg:h-[100px]">
        <div className="flex-center px-4 sm:w-[100px] md:w-[140px]">
          <Link href={"/"} className="block sm:w-[100px] md:w-[140px]">
            <Image
              className="md:w-[100px] lg:w-[140px]"
              width={200}
              height={200}
              src={web}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center border-x px-4 justify-between">
          <h4 className="text font-semibold text-white lg:text-24">
            IPFS Hosting
          </h4>
          <div className="">
            <select
              name=""
              id=""
              className="bg-transparent text-[#2ABBF4]"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {optionValues.map((option, index) => (
                <option key={index} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 text-white">
          <Account textClass="text-white" />
        </div>
      </nav> */}
      <div className="flex-center min-h-[calc(100vh-70px)] flex-col lg:min-h-[calc(100vh-100px)] text-white">
        <h4 className="pt-5 text-center text-5xl font-semibold">
          IPFS Hosting
        </h4>
        <div className="container max-w-[600px] py-10">
          <p className="text-center text-20">
            Upload your website below in the form of a .HTML file
          </p>
    
          <div className="flex pt-10">
          <div className="mx-auto mt-10 flex max-w-[400px] rounded-2xl border bg-primary-newBgColor2/30 p-4">
            <input type="file" id="file-input" />
          </div>
            <select
              name=""
              id=""
              className="bg-transparent text-[#2ABBF4]"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {optionValues.map((option, index) => (
                <option key={index} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex py-10">
            <button className="mx-auto h-[50px] w-[120px] rounded-lg bg-white px-2 text-18 font-bold text-black">
              Upload
            </button>
          </div>
          <div className="space-y-4">
            {questions.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleQuestion(item.id)}
                className="mx-auto flex flex-col justify-center gap-1 rounded-lg border border-white bg-primary-newBgColor2/40 p-3 lg:rounded-3xl"
              >
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <div className="lg:flex-center flex-1">
                    <h3 className="text-14 font-semibold sm:text-20">
                      {item.question}
                    </h3>
                  </div>
                  <span className="text-20">
                    {item.isOpen ? reactIcons.minus : reactIcons.plus}
                  </span>
                </div>
                <Collapse in={item.isOpen} className="">
                  <p className="text-12 leading-[24px] sm:text-18 lg:pt-2 lg:pl-4">
                    {" "}
                    A cryptocurrency wallet holds the private keys to your
                    digital assets. The best crypto wallets provide unparalleled
                    security and ease of use and support a range of assets.
                    Experienced users recommend a hardware wallet for the best
                    security and a mobile wallet for regular transactions.
                  </p>
                </Collapse>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default withAuth(Ipfs);
