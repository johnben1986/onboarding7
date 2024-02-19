import styles from "./MintDomainPage.module.scss";
import useWallet from "hooks/useWallet";
import Image from "next/image";
import { Form, Input, message, Spin } from "antd";
import { useAPI } from "../../hooks/useAPI";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Modal from "../Modal/Modal";
import Button from "components/utils/Button";
import Link from "next/link";

import unstoppable from "/public/assets/images/unstoppable.png";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
  labelCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

const stripePromise = loadStripe("pk_live_HAPE6Nv5bfhCJYKe6Nfaaj4P"); 

const MintDomainPage = () => {
  const { currentAddress } = useWallet();
  const { api } = useAPI();
  const [orderInfo, setOrderInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    if (!currentAddress) {
      return message.error("Please connect wallet first!");
    }

    setIsSubmitting(true);
    try {
      const res = await api.unstoppableMint({
        domainNames: values.domainNames,
        ownerAddress: currentAddress,
      });
      setOrderInfo(res);
      setIsSubmitting(false);

      message.success("Request sent!");
    } catch (e) {
      setIsSubmitting(false);
      throw e;
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const getUser = async () => {
      const user = await api.getUser({ id: currentAddress });
      const formData = user.result[0];
      
      form.setFieldsValue(formData);
    };
    getUser();
  }, [currentAddress]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: orderInfo.clientSecret,
    
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const focusInput = () => {
    const inputEl = document.getElementsByClassName("domainInput")[0];
    inputEl.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    inputEl.focus({ preventScroll: true });
  };

  return (
    <>
      <Modal
        isOpen={orderInfo.clientSecret}
        contentLabel="Stripe checkout"
        customContentStyles={{ backgroundColor: "white" }}
        onRequestClose={() => setOrderInfo({})}
      >
        {orderInfo.clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              price={orderInfo.total}
              redirectUrl="http://web3onboarding.com/marketplace/mint"
            />
          </Elements>
        )}
      </Modal>
      <main className="bg-image4 py-5">
      <div className="mx-5 mb-20 text-white md:mx-10 lg:mx-20">
        <h1 className="mb-8 text-center font-brand-heading text-3xl text-white">
          Mint Unstoppable Domains
        </h1>
        <div className="mb-10 flex flex-col-reverse md:flex-row">
          <div className="m-3 rounded-2xl bg-primary-newBgColor/40 border-2 border-white px-6 py-3 text-left md:w-1/2 md:py-12 lg:px-24">
            <Form
              name="basic"
              initialValues={{
                remember: true,
                domainNames: [""],
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={styles.editForm}
              layout="vertical"
              form={form}
            >
              <Form.List
                name="domainNames"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 domain required"),
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...formItemLayoutWithOutLabel}
                        label={<label className="!text-white">{index === 0 ? "Enter Domain Names" : ""}</label>}
                        required={false}
                        key={field.key}
                      >
                        <div className="flex">
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Please input domain name or delete this field.",
                              },
                              {
                                pattern:
                                  /^[.a-z0-9-]+\.(crypto|nft|wallet|blockchain|x|bitcoin|dao|888|zil|polygon)$/,
                                message: "Invalid domain name",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              onInput={(e) =>
                                (e.target.value = e.target.value.toLowerCase())
                              }
                              placeholder="Domain name"
                              className="domainInput h-14 rounded border-0 font-brand-tomorrow text-lg"
                            />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <p
                              className="m-auto ml-2 h-8 w-8 cursor-pointer rounded-full border-2 border-white text-center text-lg font-bold text-white"
                              onClick={() => remove(field.name)}
                            >
                              -
                            </p>
                          ) : null}
                        </div>
                      </Form.Item>
                    ))}
                    <p className="font-brand-tomorrow text-white">
                      Supporting: .crypto / .nft / .x / .wallet / .polygon /
                      .dao / .888 / .zil / .blockchain / .bitcoin
                    </p>
                    <Form.Item>
                      <button
                        onClick={() => add()}
                        className="w-full rounded bg-brand-primary/50 text-center font-brand-tomorrow text-white md:text-lg"
                      >
                        <b>+</b> Add domain
                      </button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <div className="text-center">
                <Button disabled={isSubmitting}>Submit</Button>
                <Spin hidden={!isSubmitting} />
              </div>
            </Form>
          </div>
          <div className="m-3 mb-10 flex flex-col justify-center space-y-4 text-center font-brand-tomorrow text-xl md:mb-0 md:w-1/2 md:space-y-10">
            <p>
              A Web3 domain is your ticket to explore the exciting world of
              decentralized applications.
            </p>
            <Link href="/unstoppable" target="_blank" rel="noreferrer">
            <Image
                        src={unstoppable}
                        width={200}
                        height={50}
                        className="object-center mx-auto"
                        />
            </Link>
            <p>
              Mint your first domain via our partners at Unstoppable Domains and
              get a <br />
              <b>10% cashback in USDC</b>!
            </p>
          </div>
        </div>
        <h2 className="font-brand-heading text-2xl font-bold">
          Why get a Web3 domain?
        </h2>
        <p className="font-brand-tomorrow text-xl">
          A Web3 domain is your passport to the decentralized web.
        </p>
        <div className="my-6 flex flex-col space-y-8 text-left font-brand-tomorrow text-lg md:flex-row md:space-x-8 md:space-y-0">
          <div className="md:w-1/3">
            <h3 className="font-brand-heading text-xl font-bold">
              Digital identity
            </h3>
            <p>
              Created a uniform identity across different social media
              platforms. Access decentralized applications (dApps) with a simple
              login ID.
            </p>
          </div>
          <div className="md:w-1/3">
            <h3 className="font-brand-heading text-xl font-bold">
              Seamless payments
            </h3>
            <p>
              Ditch long cryptocurrency addresses and receive payments with a
              simple username. Unstoppable Domains is supported by the most
              popular crypto wallets and exchange platforms.
            </p>
          </div>
          <div className="md:w-1/3">
            <h3 className="font-brand-heading text-xl font-bold">
              Web3 website address
            </h3>
            <p>
              Build a Web3 website that is accessible on popular browsers such
              as Brave and Opera. Bind your Web3 domain to your address and host
              it within minutes using our QuickBuild solution.
            </p>
          </div>
        </div>

        <hr className="bg-brand-500 mb-5 h-2 rounded border-0" />

        <h2 className="mt-4 text-center font-brand-heading text-2xl">
          How does the 10% cashback on Unstoppable Domains work?
        </h2>

        <div className="my-5 flex">
          <p className="font-brand-tomorrow text-lg">
            First-time users receive a 10% cashback in USDC for Web3 domains
            minted using this portal. The cashback applies to your first domain
            purchase and is paid out up to 10 minutes after your purchase to the
            address used to register the domain.
          </p>
        </div>

        <div className="text-center">
          <Button className="px-4 py-2 text-xl" onClick={focusInput}>
            Get your first Web3 domain now!
          </Button>
        </div>
      </div>
      </main>
    </>
  );
};

export default MintDomainPage;
