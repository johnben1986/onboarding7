import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCopy,
  FaDonate,
  FaFacebookF,
  FaInstagram,
  FaItunes,
  FaLinkedin,
  FaPinterest,
  FaSoundcloud,
  FaSpotify,
  FaTelegramPlane,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { TbArrowAutofitHeight, TbTrash } from "react-icons/tb";
import { AiFillCreditCard } from "react-icons/ai";

import { HiOutlineCog } from "react-icons/hi";

import { Listbox, RadioGroup, Transition } from "@headlessui/react";
import { ethers } from "ethers";
import { useAPI } from "hooks/useAPI";
import useWallet from "hooks/useWallet";
import moment from "moment";
import {
  BsChevronDown,
  BsEyeFill,
  BsEyeSlashFill,
  BsPencilSquare,
  BsPlusLg,
} from "react-icons/bs";
import {
  IoIosCheckmarkCircle,
  IoIosWallet,
  IoMdRadioButtonOff,
  IoMdRadioButtonOn,
  IoMdWallet,
  IoWallet,
} from "react-icons/io";

import BackgroundPicker from "./BackgroundPicker";
import { Box } from "./Box";
import Modal from "./Modal";
import CheckoutModal from "../Modal/Modal";

import { DatePicker } from "antd";
import { useQuery } from "@tanstack/react-query";

import { message } from "antd";
import { Helmet } from "react-helmet";
import produce from "immer";

import { Web3Resolver } from "web3-domain-resolver";
import {registration} from "@decentraweb/core";

import {
  getReferralCode,
  getReferralCodeHash,
} from "components/ReferralManager";

import prettyBytes from "pretty-bytes";
import Loading from "components/utils/Loading";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import AuthenticatedPage from "components/Authenticated/AuthenticatedPage";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { UserError } from "hooks/errors";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../MintDomainPage/CheckoutForm";
import TabConversion from "../TapAffiliate";
import Navbar from "components/Layout/Navbar";

// const provider = new providers.JsonRpcProvider(JSONRPC_URL, ETH_NETWORK);
// const signer = new Wallet(PRIVATE_KEY, provider);
// const registrar = new registration.PolygonTLDRegistrar({network: ETH_NETWORK, provider, signer});

const web3resolver = new Web3Resolver();

const contentRowGrid = "grid grid-cols-6 gap-4";
const contentLayouts = {
  1: {
    classes: ["col-span-12 sm:col-span-6"],
    multiplier: [1],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-6 6 28 12"
        fill="currentColor"
        height="1em"
        width="1.44em"
      >
        <g>
          <path d="M 7 5 H -3 V 19 h 22 V 5 z M 4 3 h 16 a 1 1 0 0 1 1 1 v 16 a 1 1 0 0 1 -1 1 h -24 a 1 1 0 0 1 -1 -1 V 4 a 1 1 0 0 1 1 -1 z"></path>
        </g>
      </svg>
    ),
  },
  "1:1": {
    classes: ["col-span-12 sm:col-span-3", "col-span-12 sm:col-span-3"],
    multiplier: [1 / 2, 1 / 2],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-6 6 28 12"
        fill="currentColor"
        height="1em"
        width="1.44em"
      >
        <g>
          <path d="M 7 5 H -3 V 19 h 10 z M 9 5 v 14 h 10 V 5 z M 4 3 h 16 a 1 1 0 0 1 1 1 v 16 a 1 1 0 0 1 -1 1 h -24 a 1 1 0 0 1 -1 -1 V 4 a 1 1 0 0 1 1 -1 z"></path>
        </g>
      </svg>
    ),
  },
  "1:1:1": {
    classes: [
      "col-span-12 sm:col-span-2",
      "col-span-12 sm:col-span-2",
      "col-span-12 sm:col-span-2",
    ],
    multiplier: [1 / 3, 1 / 3, 1 / 3],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-6 6 28 12"
        fill="currentColor"
        height="1em"
        width="1.44em"
      >
        <g>
          <path d="M 11 5 H 5 v 14 h 6 V 5 z m 2 0 v 14 h 6 v -14 h -6 z M 4 3 h 16 a 1 1 0 0 1 1 1 v 16 a 1 1 0 0 1 -1 1 h -24 a 1 1 0 0 1 -1 -1 V 4 a 1 1 0 0 1 1 -1 z M -3 5 v 14 h 6 v -14 h -6 z"></path>
        </g>
      </svg>
    ),
  },
  "2:1": {
    classes: ["col-span-12 sm:col-span-4", "col-span-12 sm:col-span-2"],
    multiplier: [2 / 3, 1 / 3],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-6 6 28 12"
        fill="currentColor"
        height="1em"
        width="1.44em"
      >
        <g>
          <path d="M 11 5 h -14 v 14 h 14 V 5 z m 2 0 v 14 h 6 v -14 h -6 z M 4 3 h 16 a 1 1 0 0 1 1 1 v 16 a 1 1 0 0 1 -1 1 h -24 a 1 1 0 0 1 -1 -1 V 4 a 1 1 0 0 1 1 -1 z"></path>
        </g>
      </svg>
    ),
  },
  "1:2": {
    classes: ["col-span-12 sm:col-span-2", "col-span-12 sm:col-span-4"],
    multiplier: [1 / 3, 2 / 3],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-6 6 28 12"
        fill="currentColor"
        height="1em"
        width="1.44em"
      >
        <g>
          <path d="M 3 5 H -3 v 14 h 6 v -14 z m 2 0 v 14 h 14 v -14 H 19 z M 4 3 h 16 a 1 1 0 0 1 1 1 v 16 a 1 1 0 0 1 -1 1 h -24 a 1 1 0 0 1 -1 -1 V 4 a 1 1 0 0 1 1 -1 z"></path>
        </g>
      </svg>
    ),
  },
};

const contentHeights = {
  1: {
    classes: "h-[250px]",
    height: "250",
    icon: (
      <div className="relative">
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ fontSize: "0.5em" }}
        >
          1
        </div>
        <TbArrowAutofitHeight />
      </div>
    ),
  },
  2: {
    classes: "h-[450px]",
    height: "450",
    icon: (
      <div className="relative">
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ fontSize: "0.5em" }}
        >
          2
        </div>
        <TbArrowAutofitHeight />
      </div>
    ),
  },
  3: {
    classes: "h-[700px]",
    height: "700",
    icon: (
      <div className="relative">
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ fontSize: "0.5em" }}
        >
          3
        </div>
        <TbArrowAutofitHeight />
      </div>
    ),
  },
};

const rowMaxWidth = 900;
function ContentRow({
  layout,
  height,
  sections,
  setSections,
  onDelete,
  previewing,
}) {
  return (
    <div className="group/row w-full pb-24 sm:px-12 sm:pb-0">
      <div className="relative mx-auto max-w-5xl">
        {previewing || (
          <div
            className="peer absolute -bottom-2 left-0 right-0 z-40 mx-auto h-fit w-fit translate-y-full cursor-pointer rounded bg-gray-600/90 bg-red-600 p-3 text-5xl text-gray-100 shadow-md backdrop-blur hover:bg-red-500 active:bg-red-700 group-hover/row:block sm:-right-24 sm:bottom-0 sm:left-auto sm:top-0 sm:mx-0 sm:my-auto"
            onClick={onDelete}
          >
            <TbTrash />
          </div>
        )}
        <div className="absolute -inset-4 hidden bg-red-600/30 blur peer-hover:block"></div>
        <div className={contentRowGrid}>
          {sections.map((section, index) => (
            <div
              key={index}
              className={`relative ${contentLayouts[layout].classes[index]} ${contentHeights[height].classes}`}
            >
              {previewing || (
                <div className="absolute left-2 top-1">
                  {Math.floor(
                    contentLayouts[layout].multiplier[index] * rowMaxWidth
                  )}
                  x{Math.floor(contentHeights[height].height)} px
                </div>
              )}
              <Box
                content={section.content}
                setContent={(content) =>
                  setSections((sections) =>
                    produce(sections, (draft) => {
                      draft[index].content = content;
                    })
                  )
                }
                previewing={previewing}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const defaultStyle = `
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16pt;
`;

const defaultContent = {
  image: "",
  imageFit: "contain",
  text: "",
  custom_style: defaultStyle,
};

function getDefaultRow({ layout, height }) {
  return {
    layout,
    height,
    sections: contentLayouts[layout].classes.map(() => ({
      content: {
        ...defaultContent,
      },
    })),
  };
}

const socialMedias = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <FaLinkedin />,
    placeholder: "https://www.linkedin.com/in/username",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: <FaTwitter />,
    placeholder: "https://twitter.com/username",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <FaFacebookF />,
    placeholder: "https://www.facebook.com/username",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: <FaTiktok />,
    placeholder: "https://www.tiktok.com/@username",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: <FaPinterest />,
    placeholder: "https://www.pinterest.com/username",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: <FaTelegramPlane />,
    placeholder: "https://t.me/username",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <FaInstagram />,
    placeholder: "https://www.instagram.com/username",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <FaYoutube />,
    placeholder: "https://www.youtube.com/channel/username",
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: <FaSpotify />,
    placeholder: "https://open.spotify.com/user/username",
  },
  {
    id: "itunes",
    name: "Apple Music",
    icon: <FaItunes />,
    placeholder: "https://music.apple.com/us/artist/username",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    icon: <FaSoundcloud />,
    placeholder: "https://soundcloud.com/username",
  },
];

const basicFields = [
  {
    id: "name",
    name: "Name",
  },
  {
    id: "email",
    name: "Email",
  },
  {
    id: "phone",
    name: "Phone",
  },
  {
    id: "fax",
    name: "Fax",
  },
  {
    id: "address1",
    name: "Address Line 1",
  },
  {
    id: "address2",
    name: "Address Line 2",
  },
  {
    id: "wallet",
    name: "Wallet address",
  },
];

function footerTextEditor(state, setState) {
  if (!state) {
    setTimeout(
      () =>
        setState({
          socialMedias: Object.fromEntries(
            socialMedias.map((socialMedia) => [socialMedia.id, ""])
          ),
          ...Object.fromEntries(
            basicFields.map((basicField) => [basicField.id, ""])
          ),
        }),
      0
    );
    return [<></>, <></>];
  }

  const text = (
    <div className="absolute bottom-0 flex h-full w-full flex-wrap content-center items-center justify-center gap-x-16 gap-y-2 px-2 text-lg sm:px-8 lg:px-24 lg:text-xl">
      <div>
        {state.name} <br />
        {state.email}
      </div>
      <div>
        {state.address1} <br />
        {state.address2}
      </div>
      <div>
        {state.phone && (
          <>
            Phone: {state.phone} <br />
          </>
        )}
        {state.fax && (
          <>
            Fax: {state.fax} <br />
          </>
        )}
      </div>

      <div className="flex flex-wrap justify-center text-3xl lg:ml-auto">
        {socialMedias.map(
          (socialMedia) =>
            state.socialMedias[socialMedia.id] && (
              <div
                className="group/btn z-40 mx-1 flex cursor-pointer flex-col items-center px-1"
                key={socialMedia.id}
              >
                <a
                  href={state.socialMedias[socialMedia.id]}
                  target="_blank"
                  rel="noreferrer"
                  className="block transform text-gray-900 transition-all duration-200 ease-in-out group-hover/btn:-translate-y-1 group-hover/btn:text-blue-600"
                >
                  {socialMedia.icon}
                </a>
                <div className="mt-1 h-0.5 w-0 rounded bg-gray-900 transition-all duration-200 ease-in-out group-hover/btn:w-full group-hover/btn:bg-blue-600"></div>
              </div>
            )
        )}
      </div>
      {state.wallet && (
        <div className="flex w-full flex-col justify-center text-center lg:flex-row lg:gap-2">
          <span>Wallet address:</span>
          <span className="inline-flex items-center justify-center gap-0.5">
            <span className="font-mono text-sm lg:text-xl">{state.wallet}</span>
          </span>
        </div>
      )}
    </div>
  );
  const editor = (
    <div className="flex w-screen max-w-xl flex-col items-center gap-3 bg-gray-200 pb-6 pt-4 text-base sm:text-lg text-black">
      <div className="mb-2 text-2xl font-semibold">Customize footer</div>

      {basicFields.map((basicField) => (
        <div
          className="flex items-start justify-start gap-2"
          key={basicField.id}
        >
          <div className="w-28 text-end font-semibold sm:w-32">
            {basicField.name}
          </div>
          <input
            type="text"
            className="round-md w-48 rounded p-1 sm:w-64"
            value={state[basicField.id]}
            onChange={(e) =>
              setState({
                ...state,
                [basicField.id]: e.target.value,
              })
            }
          />
        </div>
      ))}

      {socialMedias.map((socialMedia) => (
        <div
          className="flex items-start justify-start  gap-2"
          key={socialMedia.id}
        >
          <div className="flex w-28 items-center justify-end gap-1 font-semibold sm:w-32">
            {socialMedia.icon}
            <div>{socialMedia.name}</div>
          </div>
          <input
            className="w-48 rounded p-1 sm:w-64"
            type="text"
            value={state.socialMedias[socialMedia.id]}
            placeholder={socialMedia.placeholder}
            onChange={(e) =>
              setState({
                ...state,
                socialMedias: {
                  ...state.socialMedias,

                  [socialMedia.id]: e.target.value,
                },
              })
            }
          />
        </div>
      ))}
    </div>
  );

  return [text, editor];
}

function BuilderScreen({ startCheckout, initialWbState }) {
  const [addRowState, setAddRowState] = useState({
    layout: "2:1",
    height: 1,
  });

  const [wbState, setWbState] = useState({
    leftHeaderContent: { ...defaultContent },
    headerContent: {
      ...defaultContent,
      text: `<br/> Website Title`,
      custom_style: `
        line-height: 1;
        font-size: 48pt;
        text-align: center;
      `,
    },
    rightHeaderContent: { ...defaultContent },
    footerContent: { ...defaultContent },
    websiteBackground: {
      backgroundColor: "rgb(243 244 246)",
      backgroundColorObject: { r: 243, g: 244, b: 246 },
    },
    contentRows: [],
    websiteMeta: {
      title: "",
      description: "",
      favicon: "",
    },
    ...initialWbState,
  });

  const wSize = JSON.stringify(wbState).length;

  const [websiteSettingsOpen, setWebsiteSettingsOpen] = useState(false);

  const [_previewing, setPreviewing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const previewing = _previewing || generating;
  const rootRef = useRef();

  useEffect(() => {
    if (generating) {
      console.log("generating", generating);
      console.log(rootRef.current.outerHTML);
      startCheckout({
        html: rootRef.current.outerHTML,
        wbState: wbState,
      });
      setGenerating(false);
    }
  }, [generating]);

  const borderClasses = previewing
    ? ""
    : "border border-dashed border-gray-400";

  console.log(wbState);

  return (
    <div
      className={`${
        previewing ? "website-builder-previewing" : ""
      } relative mx-2 flex flex-col sm:mx-10`}
    >
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          <div className="flex flex-wrap gap-4">
            <button
              className="flex items-center justify-center gap-2 rounded-3xl bg-slate-300 px-3 py-2 text-xl text-black shadow-md hover:bg-slate-400 active:bg-slate-500"
              onClick={() => setWebsiteSettingsOpen(true)}
            >
              Website Settings
              <HiOutlineCog className="text-2xl" />
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-3xl bg-slate-300 px-3 py-2 text-xl text-black shadow-md hover:bg-slate-400 active:bg-slate-500"
              onClick={() => setPreviewing(!previewing)}
            >
              {previewing ? (
                <>
                  Edit
                  <BsPencilSquare className="text-2xl" />
                </>
              ) : (
                <>
                  Preview
                  <BsEyeFill className="text-2xl" />
                </>
              )}
            </button>
          </div>
        <Modal
          isOpen={websiteSettingsOpen}
          onRequestClose={() => setWebsiteSettingsOpen(false)}
        >
          <div className="space-y-8 bg-gray-100 p-4 text-black">
            <div className="-mb-6 mt-6 space-y-1">
              <div className="text-xl ">Recipient wallet address</div>
              <input
                type="text"
                className="round-md w-full rounded p-1"
                value={wbState.websiteMeta.recipientAddress}
                placeholder="0x..."
                onChange={(e) =>
                  setWbState({
                    ...wbState,
                    websiteMeta: {
                      ...wbState.websiteMeta,
                      recipientAddress: e.target.value,
                    },
                  })
                }
              />
              <div className="h-4 text-sm text-red-600 ">
                {wbState.websiteMeta.recipientAddress &&
                  !wbState.websiteMeta.recipientAddress.match(
                    /^0x[a-fA-F0-9]{40}$/,
                  ) &&
                  "Invalid address"}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xl ">Website metadata</div>
              <div className="space-y-1">
                <div className="">
                  <div className="text-lg">Title</div>
                  <input
                    type="text"
                    className="round-md w-full rounded p-1"
                    value={wbState.websiteMeta.title}
                    onChange={(e) =>
                      setWbState({
                        ...wbState,
                        websiteMeta: {
                          ...wbState.websiteMeta,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="">
                  <div className="text-lg ">Description</div>
                  <input
                    type="text"
                    className="round-md w-full rounded p-1"
                    value={wbState.websiteMeta.description}
                    onChange={(e) =>
                      setWbState({
                        ...wbState,
                        websiteMeta: {
                          ...wbState.websiteMeta,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="">
                  <div className="text-lg">Favicon</div>
                  <BackgroundPicker
                    content={{
                      ...defaultContent,
                      image: wbState.websiteMeta.favicon,
                    }}
                    setContent={(content) =>
                      setWbState({
                        ...wbState,
                        websiteMeta: {
                          ...wbState.websiteMeta,
                          favicon: content.image,
                        },
                      })
                    }
                    enableFit={false}
                    enableColor={false}
                    enableImageAlpha={false}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xl">Website background</div>
              <BackgroundPicker
                content={wbState.websiteBackground}
                setContent={(content) =>
                  setWbState({
                    ...wbState,
                    websiteBackground: content,
                  })
                }
                enableFit={false}
                enableColorAlpha={false}
              ></BackgroundPicker>
            </div>
          </div>
        </Modal>
      </div>
      <div
        ref={rootRef}
        className="relative min-h-screen pb-96 pt-96 text-gray-900 sm:pt-72 lg:pb-80"
        id="quickbuild-website-root"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: wbState.websiteBackground.backgroundColor,
            }}
          ></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: wbState.websiteBackground.image
                ? `url(${wbState.websiteBackground.image})`
                : undefined,
              opacity: wbState.websiteBackground.imageAlpha,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          ></div>
        </div>
        <div className="absolute top-0 flex h-96 w-full justify-between sm:h-60">
          <div className="absolute z-20 h-36 w-1/2 p-4 sm:h-full sm:w-1/4">
            <Box
              content={wbState.leftHeaderContent}
              setContent={(content) =>
                setWbState({
                  ...wbState,
                  leftHeaderContent: content,
                })
              }
              enableText={false}
              previewing={previewing}
            />
          </div>
          <div className="absolute right-0 z-20 h-36 w-1/2 p-4 sm:h-full sm:w-1/4">
            <Box
              content={wbState.rightHeaderContent}
              setContent={(content) =>
                setWbState({
                  ...wbState,
                  rightHeaderContent: content,
                })
              }
              enableText={false}
              previewing={previewing}
            />
          </div>
          <div className="relative z-10 mt-36 h-60 w-full text-center sm:mt-0 sm:h-full">
            <Box
              content={wbState.headerContent}
              setContent={(content) =>
                setWbState({
                  ...wbState,
                  headerContent: content,
                })
              }
              previewing={previewing}
            />
          </div>
          {generating ? (
            <div className="absolute right-8 top-8 z-35 select-none">
              <div id="connect-wallet-target"></div>
            </div>
          ) : (
            previewing && (
              <div
                onClick={(e) => {
                  if (previewing) {
                    alert(
                      "The connect wallet button within the website will be active once the website is built. You can edit the target wallet address in the website settings.",
                    );
                  }
                }}
                className="absolute right-8 top-8 z-25 select-none"
              >
                <iframe
                  src="https://quickbuild-wallet.vercel.app/"
                  height={50}
                  width={130}
                  className="pointer-events-none"
                />
              </div>
            )
          )}
        </div>

        <div className="relative mx-auto flex flex-col gap-4">
          {wbState.contentRows.map((row, index) => (
            <ContentRow
              key={index}
              layout={row.layout}
              height={row.height}
              sections={row.sections}
              setSections={(setFunc) =>
                setWbState((state) =>
                  produce(state, (draft) => {
                    draft.contentRows[index].sections = setFunc(
                      draft.contentRows[index].sections,
                    );
                  }),
                )
              }
              onDelete={() => {
                const newRows = [...wbState.contentRows];
                newRows.splice(index, 1);
                setWbState({
                  ...wbState,
                  contentRows: newRows,
                });
              }}
              previewing={previewing}
            />
          ))}
        </div>

        {previewing ? null : (
          <div
            className={`relative mx-auto mt-4 flex w-full max-w-5xl rounded bg-gray-100 ${borderClasses}`}
          >
            <div className="mx-auto flex flex-col gap-4 p-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex flex-col items-center sm:h-full">
                  <div className="mb-2 w-full text-center text-xl">
                    Column layout
                  </div>
                  <div className="mb-1 flex w-60 flex-wrap-reverse items-center justify-center gap-3 text-5xl text-gray-400 sm:mt-auto">
                    {Object.keys(contentLayouts).map((key) => {
                      const isActive = key === addRowState.layout;
                      return (
                        <button
                          key={key}
                          className={`group relative h-fit hover:shadow-md ${
                            isActive ? "text-blue-600" : "hover:text-gray-600"
                          }`}
                          onClick={() =>
                            setAddRowState({ ...addRowState, layout: key })
                          }
                        >
                          <div className="relative">
                            {contentLayouts[key].icon}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col items-center sm:h-full">
                  <div className="mb-2 w-full text-center text-xl">
                    Column height
                  </div>
                  <div className="flex w-36 flex-wrap-reverse items-center justify-center gap-1 text-6xl text-gray-400 sm:mt-auto">
                    {[2, 3, 1].map((key) => {
                      const isActive = key === addRowState.height;
                      return (
                        <button
                          key={key}
                          className={`group relative h-fit hover:shadow-md ${
                            isActive ? "text-blue-600" : "hover:text-gray-600"
                          }`}
                          onClick={() =>
                            setAddRowState({ ...addRowState, height: key })
                          }
                        >
                          <div className="relative">
                            {contentHeights[key].icon}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button
                className="flex items-center justify-center gap-4 rounded-md bg-blue-600 p-3 text-xl text-gray-100 shadow-md hover:bg-blue-500 active:bg-blue-700"
                onClick={() => {
                  setWbState((state) =>
                    produce(state, (draft) => {
                      draft.contentRows.push(getDefaultRow(addRowState));
                    }),
                  );
                }}
              >
                <BsPlusLg className="inline" /> Add section
              </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 h-96 w-full lg:h-72">
          <Box
            content={wbState.footerContent}
            setContent={(content) =>
              setWbState({
                ...wbState,
                footerContent: content,
              })
            }
            customTextEditor={footerTextEditor}
            editTextLabel="Edit footer information"
            label="Footer"
            previewing={previewing}
          />
        </div>
      </div>
      <div className="flex w-full justify-center pt-3">
        <button
          className="relative flex h-14 w-96 items-center justify-center rounded-md bg-blue-600 p-4 text-2xl text-gray-100 shadow-md hover:bg-blue-500 active:bg-blue-700"
          onClick={() => {
            setGenerating(true);
          }}
        >
          <div>Complete</div>
          <FaArrowRight className="absolute right-4" />
        </button>
      </div>
    </div>
  );
}

const stripePromise = loadStripe(
  "pk_live_51LSVhfAswBVxtdxYiaRBmCgiI8jo57urJaTL0YW57TrUqwRDFv09QRcQEOrxFKEgvCgsXMkAW1pJRfyikKtpxqUg00Jfdw3osx"
);
function CheckoutScreen({ back, renderData, finishCheckout, onlyHosting }) {
  const { api } = useAPI();
  const PAYMENT_PER_SECOND_MULTIPLIER = ethers.BigNumber.from("10").pow(18);
  const USDC_DIGITS = 6;
  const SECONDS_IN_MONTH = 60 * 60 * 24 * 30;

  const websiteBuilderInitialPrice = onlyHosting
    ? ethers.BigNumber.from(0)
    : ethers.BigNumber.from("49").mul(ethers.BigNumber.from("10").pow(6));

  const [wantsHosting, setWantsHosting] = useState(true);
  const [hostUntil, setHostUntil] = useState(moment().add(1, "year"));
  const [selectedHostingPlanName, setSelectedHostingPlanName] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [coupon, setCoupon] = useState({});
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const {
    currentAddress,
    wrapWalletFlow,
    sendContractTransaction,
    handleGenericLoadingOp,
    getContract,
    getEthersSigner,
  } = useWallet();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["hostingPlans", "userHostingInfo"],
    queryFn: () =>
      Promise.all([
        api.getHostingPlans(),
        api.getUserHostingInfo({ id: currentAddress }),
      ]),

    enabled: !!currentAddress,
  });

  if (!currentAddress) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-md border-2 border-brand-blue p-6 font-brand-tomorrow text-gray-900">
        <div className="relative flex w-full flex-row justify-center">
          <button
            className="absolute left-0 top-0 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-400 active:text-gray-600"
            onClick={back}
          >
            <FaArrowLeft />
            {back && (
              <div onClick={back}>
                {onlyHosting ? "Back" : "Back to builder"}
              </div>
            )}
          </button>
          <h1 className="font-brand-heading text-3xl">Checkout</h1>
        </div>
        <AuthenticatedPage></AuthenticatedPage>
      </div>
    );
  }

  if (!renderData) {
    return null;
  }

  if (isError) {
    return "Error occured";
  }

  if (isLoading) {
    return <Loading />;
  }

  const [allHostingPlans, userHostingInfo] = data;
  console.log("hostinginfo", userHostingInfo);

  const approximateSize =
    JSON.stringify(renderData.wbState).length * 1.05 + 10000;

  console.log(
    "approximateSize",
    approximateSize,
    userHostingInfo.storage_usage,
    userHostingInfo.storage_quota
  );

  const hasEnoughStorage =
    userHostingInfo.storage_usage + approximateSize <
    userHostingInfo.storage_quota;

  const hostingPlans = allHostingPlans.filter(
    (h) => userHostingInfo.storage_usage + approximateSize < h.storage_limit
  );

  const selectedHostingPlan =
    hostingPlans.find((h) => h.name === selectedHostingPlanName) ||
    hostingPlans[0];

  const originalPriceToPay = websiteBuilderInitialPrice.add(
    wantsHosting && !hasEnoughStorage
      ? ethers.BigNumber.from(selectedHostingPlan.payment_per_second_multiplied)
          .mul(hostUntil.diff(moment(), "seconds"))
          .div(PAYMENT_PER_SECOND_MULTIPLIER)
      : 0
  );

  const flatDiscount = coupon?.discount
    ? coupon.discount_type == "percentage"
      ? websiteBuilderInitialPrice
          .mul(Math.floor(coupon?.discount * 1000))
          .div(100000)
      : Math.floor(coupon?.discount * Math.pow(10, USDC_DIGITS))
    : 0;
  const priceToPay = originalPriceToPay.sub(flatDiscount);

  if (coupon?.discount) {
    console.log("debug flat discount", {
      coupon_discount: coupon?.discount,
      coupon_discount_100: Math.floor(coupon?.discount * 1000),
      mul: ethers.utils.formatUnits(
        websiteBuilderInitialPrice.mul(Math.floor(coupon?.discount * 100000)),
        USDC_DIGITS
      ),
      div: ethers.utils.formatUnits(
        websiteBuilderInitialPrice
          .mul(Math.floor(coupon?.discount * 100000))
          .div(100),
        USDC_DIGITS
      ),
      flatDiscount: ethers.utils.formatUnits(flatDiscount, USDC_DIGITS),
      priceToPay: ethers.utils.formatUnits(priceToPay.toString(), USDC_DIGITS),
      coupon: coupon,

      websiteBuilderInitialPrice: ethers.utils.formatUnits(
        websiteBuilderInitialPrice.toString(),
        USDC_DIGITS
      ),
    });
  }
  async function registerCouponUsed() {
    if (coupon?.id) {
      await api.registerCouponUsed({ id: coupon.id });
    }
  }

  function payWithWallet(doPayment) {
    wrapWalletFlow("Processing transaction", async () => {
      let tx;
      let paymentInfo;

      if (
        doPayment &&
        !(
          (process.env.NODE_ENV === "development" &&
            window.location.search.includes("free")) ||
          window.location.host.includes("free-website-builder")
        )
      ) {
        const oneTimeApproveAmount = ethers.BigNumber.from(
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        );

        const usdc = await getContract({ name: "USDC", network: "polygon" });
        const websiteBuilder = await getContract({
          name: "WebsiteBuilder",
          network: "polygon",
        });
        console.log("currentAddress", currentAddress, usdc);
        const balance = await usdc.balanceOf(currentAddress);
        console.log("balance", balance);
        if (balance.lt(priceToPay)) {

          throw new UserError(

            message.warning(
              `You don't have enough USDC. You currently have ${ethers.utils.formatUnits(
                balance,
                USDC_DIGITS
              )} USDC. You need ${ethers.utils.formatUnits(
                priceToPay,
                USDC_DIGITS
              )}.`)

            );
        }

        const currentlyAllowed = await usdc.allowance(
          currentAddress,
          websiteBuilder.address
        );

        const wantedApproval = priceToPay.mul(105).div(100);

        console.log({ currentlyAllowed, priceToPay, wantedApproval });

        if (currentlyAllowed.lt(wantedApproval)) {
          const response = await sendContractTransaction(
            usdc,
            "approve",
            [websiteBuilder.address, oneTimeApproveAmount],
            "Approve the payment currency. This only needs to be done once for the website builder and hosting."
          );

          await response.wait(5);

          const newAllowance = await usdc.allowance(
            currentAddress,
            websiteBuilder.address
          );

          console.log("new_allowance", newAllowance);

          if (newAllowance.lt(wantedApproval)) {
            throw new UserError(
              message.warning("Approval check failed. You probably approved less than the needed amount. Please try again.")
            );
          }
        }

        console.log(
          "needed",
          await websiteBuilder.getHostingPrice(
            currentAddress,
            hostUntil.unix(),
            selectedHostingPlan.name
          )
        );

        if (!wantsHosting || hasEnoughStorage) {
          console.log("build website", [
            getReferralCodeHash(),
            websiteBuilderInitialPrice.sub(flatDiscount),
          ]);
          tx = await sendContractTransaction(
            websiteBuilder,
            "buildWebsite",
            [
              getReferralCodeHash(),
              websiteBuilderInitialPrice.sub(flatDiscount),
            ],
            "Send payment transaction"
          );
        } else {
          tx = await sendContractTransaction(
            websiteBuilder,
            "buildWebsiteAndExtendHosting",
            [
              hostUntil.unix(),
              selectedHostingPlan.name,
              getReferralCodeHash(),
              websiteBuilderInitialPrice.sub(flatDiscount),
            ],
            "Send payment transaction"
          );
        }

        console.log("tx", tx);
        paymentInfo = {
          total: ethers.utils.formatUnits(
            priceToPay,
            (await usdc.decimals()) - 2
          ),
          id: tx?.hash,
        };
      }

      await registerCouponUsed();

      console.log("rd", renderData);
      if (wantsHosting) {
        const { pinId, ipfsHash, fullHtml } = await handleGenericLoadingOp(
          "Payment successful! Uploading website to IPFS...",
          () =>
            api.generateHtmlAndUploadToIpfs({
              renderData,
              uploadToIpfs: true,
            })
        );

        finishCheckout({ ipfsHash, fullHtml, paymentInfo });
      } else {
        const { fullHtml } = await handleGenericLoadingOp(
          "Payment successful! Generating website...",
          () =>
            api.generateHtmlAndUploadToIpfs({
              renderData,
              uploadToIpfs: false,
            })
        );

        finishCheckout({ ipfsHash: null, fullHtml, paymentInfo });
      }
    });
  }

  async function payWithCard() {
    const { clientSecret } = await api.stripePayment({
      amount: parseInt(ethers.utils.formatUnits(priceToPay, USDC_DIGITS - 2)),
    });

    setClientSecret(clientSecret);
  }

  async function onCardFinish(paymentId) {
    const paymentInfo = {
      total: ethers.utils.formatUnits(priceToPay, USDC_DIGITS),
      id: paymentId,
    };

    setClientSecret(null);

    await registerCouponUsed();

    if (wantsHosting) {
      const { pinId, ipfsHash, fullHtml } = await handleGenericLoadingOp(
        "Payment successful! Uploading website to IPFS...",
        () =>
          api.generateHtmlAndUploadToIpfs({
            renderData,
            uploadToIpfs: true,
          })
      );

      finishCheckout({ ipfsHash, fullHtml, paymentInfo });
    } else {
      const { fullHtml } = await handleGenericLoadingOp(
        "Payment successful! Generating website...",
        () =>
          api.generateHtmlAndUploadToIpfs({
            renderData,
            uploadToIpfs: false,
          })
      );

      finishCheckout({ ipfsHash: null, fullHtml, paymentInfo });
    }
  }

  return (
    <>
      <CheckoutModal
        isOpen={clientSecret}
        contentLabel="Stripe checkout"
        customContentStyles={{ backgroundColor: "white" }}
        onRequestClose={() => {}}
      >
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              price={ethers.utils.formatUnits(priceToPay, USDC_DIGITS - 2)}
              redirectUrl="https://web3onboarding.com/1site/1site"
              onSuccess={onCardFinish}
            />
          </Elements>
        )}
      </CheckoutModal>
      <div className="py-5">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-md border-2 border-brand-blue p-6 font-brand-tomorrow text-gray-900 ">
          <div className="relative flex w-full flex-row justify-center">
            <button
              className="absolute left-0 top-0 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-400 active:text-gray-600"
              onClick={back}
            >
              <FaArrowLeft />
              {back && (
                <div onClick={back}>
                  {onlyHosting ? "Back" : "Back to builder"}
                </div>
              )}
            </button>
            <h1 className="font-brand-heading text-3xl">Checkout</h1>
          </div>
          {onlyHosting || (
            <div className="flex w-full flex-col gap-2">
              <div>
                Do you want to instantly host your website and connect it to a
                domain?{" "}
                {hasEnoughStorage
                  ? "You already have a hosting subscription so you don't have to pay extra."
                  : "If so you need to buy a hosting plan."}
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-full flex-row items-center justify-start">
                  <RadioGroup
                    value={wantsHosting}
                    onChange={(value) => setWantsHosting(value)}
                    className="flex w-full flex-row items-center justify-start"
                  >
                    <RadioGroup.Option value={true} className="mr-2">
                      {({ checked }) => (
                        <span className="flex cursor-pointer items-center gap-1">
                          <IoMdRadioButtonOn
                            className={`text-xl ${
                              checked ? "text-blue-500" : "hidden"
                            }`}
                          />
                          <IoMdRadioButtonOff
                            className={`text-xl ${
                              checked ? "hidden" : "text-gray-400"
                            }`}
                          />
                          <span>
                            {hasEnoughStorage
                              ? "Yes, host it"
                              : "Yes, buy hosting"}
                          </span>
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value={false} className="mr-2">
                      {({ checked }) => (
                        <span className="flex cursor-pointer items-center gap-1">
                          <IoMdRadioButtonOn
                            className={`text-xl ${
                              checked ? "text-blue-500" : "hidden"
                            }`}
                          />
                          <IoMdRadioButtonOff
                            className={`text-xl ${
                              checked ? "hidden" : "text-gray-400"
                            }`}
                          />
                          <span>No, I will host it myself</span>
                        </span>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}
          {wantsHosting && !hasEnoughStorage && (
            <>
              <div className="flex w-full flex-col gap-2">
                <div>Choose hosting plan</div>
                <Listbox
                  value={selectedHostingPlanName}
                  onChange={setSelectedHostingPlanName}
                >
                  <div className="relative rounded border shadow-sm">
                    <Listbox.Button className="relative w-full cursor-default rounded px-4 py-2 text-left text-gray-900">
                      <span className="block truncate">
                        {selectedHostingPlan.description}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                        <BsChevronDown />
                      </span>
                    </Listbox.Button>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {hostingPlans.map(({ name, description }) => (
                          <Listbox.Option key={name} value={name}>
                            {({ active, selected }) => (
                              <div
                                className={`
                              cursor-pointer px-4 py-2
                            ${
                              active
                                ? "bg-blue-600 text-white"
                                : "text-gray-900"
                            }`}
                              >
                                <span
                                  className={`${
                                    active ? "font-medium" : "font-normal"
                                  } block truncate`}
                                >
                                  {description}
                                </span>
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="flex w-full flex-col gap-2">
                <div>Host until</div>
                <DatePicker
                  allowClear={false}
                  value={hostUntil}
                  onChange={(date) => setHostUntil(date)}
                  disabledDate={(date) => {
                    return date.unix() < moment().unix();
                  }}
                  className="w-full rounded px-4 py-2 text-sm font-medium text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                />
              </div>
            </>
          )}
          <div className="flex w-full flex-col gap-2">
            <div>Coupon code</div>
            <div className="flex items-center gap-2">
              <input
                placeholder="Coupon code"
                className="w-full flex-1 rounded border px-4 py-2 text-sm font-medium text-gray-900 shadow-sm"
                value={coupon?.code || ""}
                onChange={async (e) => {
                  const code = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .toUpperCase();
                  setCoupon({ code });
                  const coupon = await api.getCoupon({ code });
                  if (coupon) {
                    setCoupon({ ...coupon, code: coupon.id });
                  }
                }}
              />
              {coupon.used_up ? (
                <div className="flex-1 font-semibold text-red-500">
                  Coupon already used
                </div>
              ) : (
                <div className="flex-1 font-semibold text-green-500">
                  {coupon?.discount &&
                    `Coupon discount: ${
                      coupon.discount_type == "percentage"
                        ? `${coupon.discount}%`
                        : `$${coupon.discount}`
                    }`}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="font-semibold">Total price:</div>
            <div className="flex flex-col justify-end">
              <div
                className={`${coupon.discount ? "line-through" : "invisible"}`}
              >
                $
                {(+ethers.utils.formatUnits(
                  originalPriceToPay,
                  USDC_DIGITS
                )).toFixed(2)}
              </div>
              <div className="font-bold">
                $
                {(+ethers.utils.formatUnits(priceToPay, USDC_DIGITS)).toFixed(
                  2
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-row items-center justify-end gap-2">
            <AuthenticatedFragment permission="bypass_payments">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                onClick={() => payWithWallet(false)}
              >
                Skip payment (Admin)
              </button>
            </AuthenticatedFragment>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => payWithWallet(true)}
            >
              Pay with wallet <IoIosWallet className="text-xl" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => payWithCard(true)}
            >
              Pay with Card <AiFillCreditCard className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function LinkingScreen({ ipfsHash, fullHtml, paymentInfo }) {
  const [domainName, setDomainName] = useState("");

  const { api, silentApi } = useAPI();

  const {
    currentAddress,
    wrapWalletFlow,
    handleGenericLoadingOp,
    getContract,
    getEthersSigner,
  } = useWallet();

  const linkDomain = async () => {
    await wrapWalletFlow("Linking domain", async () => {
      if (!domainName) {
        message.error("Please enter a domain name");
        return;
      }

      let tokenId;

      const resolution = await web3resolver.resolve(domainName);
      if (!resolution) {
        message.error("Domain not found");
        return;
      }

      if (resolution.ownerAddress.toLowerCase() != currentAddress) {
        message.error(
          "You do not own this domain. Current owner is " +
            resolution.ownerAddress
        );
        return;
      }

      tokenId = resolution.tokenId;

      const signer = await getEthersSigner();

      await resolution.setRecord("dweb.ipfs.hash", ipfsHash, signer);

      message.success(
        `Website linked successfully! It should be accessible through ${domainName} in a few minutes.`,
        10
      );
    });
  };

  function downloadWebsite() {
    const element = document.createElement("a");
    const file = new Blob([fullHtml], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "website.html";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-md border-2 border-brand-blue p-6 font-brand-tomorrow text-gray-900">
      {ipfsHash && (
        <div className="space-y-4">
          <div className="relative flex w-full flex-row justify-center">
            <h1 className="font-brand-heading text-3xl">Link website</h1>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div>
              Your website was successfully uploaded to the ipfs. Ipfs hash:{" "}
              <br />
              {ipfsHash} <br />
              You can now link it to a domain you own or rent.
            </div>
            <div className="space-y-2">
              <div>Domain</div>
              <input
                placeholder="example.crypto"
                value={domainName}
                className="w-full rounded border px-4 py-2 text-sm font-medium text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                onChange={(e) => setDomainName(e.target.value)}
              />
            </div>
            <div className="mt-2 flex w-full justify-center">
              <button
                type="button"
                className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={linkDomain}
              >
                Link website
              </button>
            </div>
          </div>
        </div>
      )}
      {fullHtml && (
        <div className="space-y-4">
          <div className="relative flex w-full flex-row justify-center">
            <h1 className="font-brand-heading text-3xl">Download website</h1>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div>
              {ipfsHash
                ? "You can also download your website to have it hosted somewhere else."
                : "You can download your website below and host it yourself."}
            </div>
            <div className="mt-2 flex w-full justify-center">
              <button
                type="button"
                className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={downloadWebsite}
              >
                Download website
              </button>
            </div>
          </div>
        </div>
      )}
      {paymentInfo && (
        <>
          <img
            src={`https://www.shareasale.com/sale.cfm?tracking=${paymentInfo.id}&amount=${paymentInfo.total}&merchantID=140328&transtype=sale`}
            width="1"
            height="1"
          ></img>
          <TabConversion
            convId={paymentInfo.id}
            amount={paymentInfo.total}
            userId={currentAddress}
          ></TabConversion>
        </>
      )}
    </div>
  );
}

const faq = [
  {
    question: "How Does the 1Site Work?",
    answer: [
      <>
        Our Web3 website builder converts your text and image elements into a
        simple one-page website ready to be hosted on the decentralized web.
      </>,
      <>
        You can use our hosting integration or download the website's HTML file
        to upload it to InterPlanetary File System (IPFS) through another
        method. However, 1Site provides a comprehensive solution to get
        your Web3 website live within minutes.
      </>,
    ],
  },
  {
    question: "How Do I Get Started?",
    answer: [
      <>
        Write your website's title and include a logo from the options provided
        in the 1Site header section. The{" "}
        <span className="font-bold">Website Settings</span> tab supports the
        integration of a fixed background image or color.
      </>,
      <>
        Next, use the <span className="font-bold">Layout</span> and{" "}
        <span className="font-bold">Height</span> features on the builder to add
        new sections to your website. Click{" "}
        <span className="font-bold">Add Section</span> to add a selected layout
        or height to your website. You can use images, texts, and links and
        customize each section to your preference.
      </>,
      <>
        The <span className="font-bold">Preview</span> button allows you to view
        progress and includes an option to continue editing site features. Once
        satisfied with your website design, you can use the{" "}
        <span className="font-bold">Checkout</span> button to exit the
        development phase.
      </>,
    ],
  },
  {
    question: "What is the service charge for the Web3 domain builder?",
    answer: [
      <>
        It costs only $49 USDC to create your Web3 website using our
        plug-and-play builder tool. The fee is required at checkout and only
        after you're satisfied with your website's design. Hold the USDC amount
        in your Polygon wallet to ensure a seamless checkout experience.
      </>,
    ],
  },
  {
    question: "How can I Link my website to my Web3 domain?",
    answer: [
      <>
        Upon clicking <span className="font-bold">Checkout</span> choose the
        option to host your website instantly. Connect your wallet (if not
        previously connected), and select your preferred hosting plan/period.
        Click <span className="font-bold">Pay with Wallet</span> and enter the
        Web3 domain name to attach to the website. Complete the checkout
        process, and your new website will instantly go live on your specified
        domain!
      </>,
      <>
        Immediately access the website using Brave Browser, Opera, or any other
        Web3-compatible browser. Freename Extension is required to browse
        Freename domains.
      </>,
    ],
  },
  {
    question: "I don't have a Web3 domain. What do I do?",
    answer: [
      <>
        You can{" "}
        <a
          href="https://web3onboarding.com/freename"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          mint a new Web3 domain
        </a>{" "}
        (via our partners at Freename) or browse through the Web3 Onboarding{" "}
        <Link href="/marketplace" className="text-blue-500 hover:text-blue-600">
          Web3 domain marketplace
        </Link>{" "}
        to find your perfect domain.
      </>,
    ],
  },
];

const ipfsFaq = [
  {
    question: "How can I host my website on IPFS?",
    answer: [
      <>
        Upload your Web3 website as an HTML file using the option provided
        above. No website? No problem. Use the{" "}
        <Link
          className="cursor-pointer font-bold hover:text-brand-primary"
          href="/1Site"
        >
          EDA 1Site tool
        </Link>{" "}
        to build a Web3 website in less than five minutes.
      </>,
    ],
  },
  {
    question: "Why Use IPFS for Web3 websites?",
    answer: [
      <>
        IPFS is an ideal companion for Web3 domains since both systems utilize a
        decentralized structure. This means that Web3 websites are more private
        and secure. It is almost impossible for anyone (besides the owner) to
        shut down or modify a website uploaded to IPFS.
      </>,
    ],
  },
  {
    question: "Can I Modify My Website After Uploading?",
    answer: [
      <>
        Yes. If you use our 1Site Web3 builder tool, you can easily modify
        your website on the EDA platform. Go to{" "}
        <b>Seller Dashboard &gt; My Websites.</b> Alternatively, you can upload
        a new website to your Web3 domain using this IPFS hosting page.
      </>,
    ],
  },
  {
    question: "How much does it cost to host a Web3 website?",
    answer: [
      <>
        We offer the most competitive prices for hosting a Web3 website. You can
        purchase our <b>Recommend Hosting Plan</b> for{" "}
        <b>1 USDC monthly (12 months)</b>. This plan is usually convenient for
        most Web3 sites as they see less traffic and can thrive with just 1GB
        storage and 2GB bandwidth. However, you can explore our other hosting
        plans if you anticipate slightly higher traffic and bandwidth usage.
      </>,
    ],
  },
];

const states = {
  building: "building",
  checkout: "checkout",
  linking: "linking",
};
export default function WebsiteBuilder({ initialWbState }) {
  const { api } = useAPI();

  const [state, setState] = useState(states.building);
  const [renderData, setRenderData] = useState(null);
  const [fullHtml, setFullHtml] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [initialWbStateOrLoaded, setInitialWbStateOrLoaded] =
    useState(initialWbState);

  const router = useRouter();
  const { lfid } = router.query;
  const loadFromId = lfid;

  const { currentAddress } = useWallet();

  useEffect(() => {
    async function fetchWbStateFromId() {
      try {
        const wbState = (await api.getWebsite({ id: loadFromId })).wb_state;
        console.log("loaded wb state", wbState);
        setInitialWbStateOrLoaded(wbState);
      } catch (e) {
        console.error(e);
        router.push("/1Site/1site");
      }
    }
    if (loadFromId && currentAddress) {
      fetchWbStateFromId();
    }
  }, [loadFromId, api, currentAddress]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

  const startCheckout = async (renderData) => {
    setRenderData(renderData);
    setState(states.checkout);
  };

  const finishCheckout = async ({ ipfsHash, fullHtml, paymentInfo }) => {
    setIpfsHash(ipfsHash);
    setFullHtml(fullHtml);
    setPaymentInfo(paymentInfo);
    setState(states.linking);
  };

  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  if (loadFromId && !initialWbStateOrLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>The Best Web3 Website Builder</title>
        <meta
          name="description"
          content="Use the best Web3 website builder. Launch your site in minutes without coding. Connect your website to your Web3 domain to start promoting your digital products."
        />
      </Helmet>
      <div className={state === states.building ? "" : "hidden"}>
        <BuilderScreen
          startCheckout={startCheckout}
          initialWbState={initialWbStateOrLoaded}
        />
      </div>
      <div className={state === states.checkout ? "" : "hidden"}>
        <CheckoutScreen
          back={() => setState(states.building)}
          finishCheckout={finishCheckout}
          renderData={renderData}
        />
      </div>
      <div className={state === states.linking ? "" : "hidden"}>
        <LinkingScreen
          ipfsHash={ipfsHash}
          fullHtml={fullHtml}
          paymentInfo={paymentInfo}
        />
      </div>

      <div className="mx-auto mt-12 max-w-2xl p-2 pb-24 text-black">
        <div className="mb-6 text-center font-brand-heading text-3xl">FAQ</div>
        <div className="space-y-6">
          {faq.map((item, index) => (
            <details key={index} className="space-y-2">
              <summary className="cursor-pointer text-2xl">
                {item.question}
              </summary>
              <div className="space-y-1 text-base">
                {item.answer.map((answer, index) => (
                  <div key={index}>{answer}</div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}

function UploadScreen({ startCheckout }) {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);

  const inputRef = useRef(null);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="mb-4 text-2xl font-bold mt-5"></div>
      <div className="mb-2 text-center text-lg mt-5">
      Upload your website below in the form of a  <span className="font-bold">.html</span> file
      </div>
      {/* <div>
        <br />
        Upload your website below in the form of a{" "}
        <span className="font-bold">.html</span> file
      </div> */}
      <input
        type="file"
        accept="text/html"
        className="cursor-pointer rounded-lg bg-blue-900 text-white file:m-2 file:cursor-pointer file:rounded-md file:border-none border-white border-2 file:p-2 file:text-gray-100 file:shadow-sm file:hover:bg-blue-500 focus:outline-none file:active:bg-blue-700 file:hover:text-white"
        ref={inputRef}
        onChange={(ev) => {
          if (ev.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (ev) => {
              console.log("result", ev.target.result);
              setFile(ev.target.result);
              setFilename(inputRef.current.files[0].name);
            };

            reader.readAsDataURL(ev.target.files[0]);
          }
        }}
      />
      <button
        className="rounded-lg bg-white font-bold text-black hover:bg-blue-600 mt-8 px-8 py-3 hover:text-white"
        onClick={() => {
          if (!file) {
            alert("Please upload a file first");
            return;
          }
          startCheckout({
            wbState: {
              websiteMeta: {
                onlyHosting: true,
                filename: filename,
              },
            },
            rawWebsite: file,
          });
        }}
      >
        Upload
      </button>

      <div className="mx-auto mb-24 mt-12 max-w-2xl p-2">
        <div className="mb-6 text-center font-brand-heading text-3xl">FAQ</div>
        <div className="space-y-6">
          {ipfsFaq.map((item, index) => (
            <details key={index} className="space-y-2">
              <summary className="cursor-pointer text-2xl">
                {item.question}
              </summary>
              <div className="space-y-1 text-base">
                {item.answer.map((answer, index) => (
                  <div key={index}>{answer}</div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IPFSHosting() {
  const [state, setState] = useState(states.building);
  const [renderData, setRenderData] = useState("");
  const [fullHtml, setFullHtml] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const startCheckout = async (renderData) => {
    setRenderData(renderData);
    setState(states.checkout);
  };

  const finishCheckout = async ({ ipfsHash, fullHtml }) => {
    setIpfsHash(ipfsHash);
    setFullHtml(fullHtml);
    setState(states.linking);
  };
  return (
    <div>
      <div className={state === states.building ? "" : "hidden"}>
        <UploadScreen startCheckout={startCheckout} />
      </div>
      <div className={state === states.checkout ? "" : "hidden"}>
        <CheckoutScreen
          onlyHosting={true}
          back={() => setState(states.building)}
          finishCheckout={finishCheckout}
          renderData={renderData}
        />
      </div>
      <div className={state === states.linking ? "" : "hidden"}>
        <LinkingScreen ipfsHash={ipfsHash} fullHtml={fullHtml} />
      </div>
    </div>
  );
}

export function LinkWebsite({ ipfsHash }) {
  return (
    <div>
      <LinkingScreen ipfsHash={ipfsHash} />
    </div>
  );
}
