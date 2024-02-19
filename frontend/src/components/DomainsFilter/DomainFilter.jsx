import { ethers } from "ethers";
import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAPI } from "../../hooks/useAPI";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import useWallet from "../../hooks/useWallet";
import { Modal } from "antd";
import Loading from "components/utils/Loading";
import Link from "next/link";
import {Switch, cn} from "@nextui-org/react";

import DropdownIcon from "../../../public/assets/images/svg/dropdown-icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { reactIcons, arrowright } from "components/utils/icons";
import web3img from "/public/assets/images/web3logo-white.png";
import web from "/public/assets/images/web3logo.png";
import { BiSearch } from "react-icons/bi";
import jacob from "/public/assets/images/jacob.png";
import { FaUserAlt, FaListAlt } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import InfiniteScroll from "react-infinite-scroll-component";
import Account from "components/Account/Account";
import { Drawer } from "@mui/material";

const sidebar = [
  {
    name: "Keyword Placement",
    type: "KP",
  },
  {
    name: "Listing Type",
    type: "LP",
  },
  {
    name: "Price Range",
    type: "PR",
  },
  {
    name: "Domain Length",
    type: "DL",
  },
  {
    name: "Special Characters",
    type: "SC",
  },
  {
    name: "Categories",
    type: "CAT",
  },
  {
    name: "Provider",
    type: "PROV",
  },
];
const domainLinks = [
  {
    name: "Account",
    icon: <FaUserAlt />,
    href: "/users/me",
  },
  {
    name: "Mint UD Domain",
    icon: <MdAddCircleOutline />,
    href: "/marketplace/mint",
  },
  {
    name: "List Domain",
    icon: <FaListAlt />,
    href: "/marketplace/add",
  },
];

const { confirm } = Modal;

const SECONDS_IN_MONTH = 60 * 60 * 24 * 30;

function getEmptySearchParams() {
  return JSON.parse(
    JSON.stringify({
      filters: { categories: [], containsKeyword: "" },
      keywordFilter: "containsKeyword",
      keyword: "",
    })
  );
}

function isEmptyInput(input) {
  return input === undefined || input === null || input === "";
}

function formatEther(value, decimals) {
  if (!decimals) {
    throw new Error("Currency must have decimals");
  }

  return ethers.utils.formatUnits(value, decimals);
}

const ADULT_ID = 1000;

export default function DomainFilter({
  initialState,
  hideFilters,
  userId,
  domainInfoFromServer,
}) {
  const { api } = useAPI();
  const {
    config,
    wrapWalletFlow,
    getContract,
    sendContractTransaction,
    currentAddress,
    signTypedData,
  } = useWallet();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [UDUser, setUDUser] = useState(null);

  const targetUser = userId ? userId : currentAddress;
  const [adultConsenting, setAdultConsenting] = useState(
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("is-consenting-adult")) || false
      : false
  );

  const tableEl = useRef(null);
  const scrollFetchThreshHold = 1000;

  const [searchParams, setSearchParams] = useState(getEmptySearchParams());
  const [noResults, setNoResults] = useState(false);

  const scrollSearchParams = useRef(JSON.parse(JSON.stringify(searchParams)));

  const router = useRouter();
  const { s: searchParamsString } = router.query;

  const nativeAddress = "0x0000000000000000000000000000000000000000";

  const onEnterPress = (e) => {
    e = e || window.event;
    if (e.keyCode == 13) {
      // document.getElementById("searchBtn").click();
      return false;
    }
    return true;
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (targetUser) {
        const res = await api.getUser({ id: targetUser });
        // router.push('/marketplace');
        // console.log('login successful');
        if (res?.result.length > 0) {
          setUserInfo(res.result[0]);
        }
      }
      // else {
      //   // console.log('no data found');
      //   router.push('/login')
      // }
    };
    getUserInfo();
  }, [targetUser, UDUser, api]);
  function shortAddress(address, charsToShow = 6, breakChars = "...") {
    if (!address) return "";
    if (address.length <= charsToShow) return address;
    const halfToShow = charsToShow / 2;
    return `${address.slice(0, halfToShow)}${breakChars}${address.slice(
      -halfToShow
    )}`;
  }

  useEffect(() => {
    let s = undefined;
    if (initialState) {
      if (searchParamsString) {
        const searchParams = JSON.parse(searchParamsString);

        s = JSON.stringify({
          ...searchParams,
          filters: { ...searchParams.filters, ...initialState },
        });
      } else {
        const emptySearchParams = getEmptySearchParams();

        s = JSON.stringify({
          ...emptySearchParams,
          filters: { ...emptySearchParams.filters, ...initialState },
        });
      }
    } else {
      s = searchParamsString;
    }

    function setSearch(_searchParams) {
      if (_searchParams) {
        setSearchParams(JSON.parse(_searchParams));
        scrollSearchParams.current = JSON.parse(_searchParams);
        setDomainList([]);
      } else {
        setSearchParams(getEmptySearchParams());
        scrollSearchParams.current = getEmptySearchParams();
        setDomainList([]);
      }
    }
    if (
      !adultConsenting &&
      s &&
      JSON.parse(s).filters.categories.includes(ADULT_ID)
    ) {
      showAdultConsent(
        () => setSearch(s),
        () => {
          let parsedS = JSON.parse(s);
          parsedS.filters.categories = parsedS.filters.categories.filter(
            (c) => c !== ADULT_ID
          );
          setSearch(JSON.stringify(parsedS));
        }
      );
    } else {
      setSearch(s);
    }
  }, [searchParamsString, initialState]);

  function applySearch(searchParams) {
    router.push({
      search: `?${new URLSearchParams({
        s: JSON.stringify(searchParams),
      }).toString()}`,
    });
  }

  async function setupData() {
    handleScroll();
    const currenciesRes = await api.getCurrencies();
    const currenciesArray = currenciesRes.result || [];
    setCurrencies(currenciesArray);
    setSearchParams((searchParams) => {
      if (searchParams?.filters?.priceRange?.currencyId == undefined) {
        return {
          ...searchParams,
          filters: {
            ...searchParams.filters,
            priceRange: {
              ...searchParams.filters.priceRange,
              currencyId:
                currenciesArray.length > 0 ? currenciesArray[0].id : undefined,
              decimals:
                currenciesArray.length > 0
                  ? currenciesArray[0].decimals
                  : undefined,
            },
          },
        };
      } else {
        return searchParams;
      }
    });
    const categoriesRes = await api.getCategories();
    setCategories(categoriesRes.result);
  }

  function handleScroll() {
    if (
      tableEl.current?.scrollHeight - tableEl.current?.scrollTop >
      scrollFetchThreshHold
    )
      return;
    fetchNewData();
  }

  useEffect(() => {
    console.log(
      tableEl.current?.scrollHeight - tableEl.current?.scrollTop >
        scrollFetchThreshHold
    );
    tableEl.current?.addEventListener("scroll", handleScroll);
    setupData();
    return () => {};
  }, [tableEl.current]);

  useEffect(() => {
    handleScroll();
  }, [domainList]);

  useEffect(() => {
    localStorage?.setItem(
      "is-consenting-adult",
      JSON.stringify(adultConsenting)
    );
  }, [adultConsenting]);

  const fetchNewData = async () => {
    setShowLoader(true);
    if (scrollSearchParams.current) {
      scrollSearchParams.current.isFetching = true;
      try {
        const domains = await api.getDomains(scrollSearchParams.current);
        if (!scrollSearchParams.current?.isFetching) {
          return;
        }
        setNoResults(() => false);
        setDomainList((domainList) => domainList.concat(domains.result));
        // scrollSearchParams.current.nextCursor = domains.nextCursor;
        scrollSearchParams.current.isFetching = false;
        if (domains.nextCursor) {
          scrollSearchParams.current = {
            ...scrollSearchParams.current,
            nextCursor: domains.nextCursor,
          };
        } else {
          if (domainList.length == 0 && domains.result.length == 0) {
            setNoResults(() => true);
          }
          scrollSearchParams.current = null;
        }
      } catch (error) {
        console.error("Error fetching new data:", error);
      } finally {
        // Ensure that the loader is displayed for at least 2 seconds
        setTimeout(() => {
          setShowLoader(false); // Hide the loader
          if (scrollSearchParams.current) {
            scrollSearchParams.current.isFetching = false;
          }
        }, 1000);
      }
    }
  };

  // console.log(JSON.stringify(domainList), 'domainList');
  const searchClickHandler = async (e) => {
    e.preventDefault();
    applySearch(searchParams);
  };

  const clickSortButton = async ({ key, label }) => {
    const params = { ...searchParams, sortBy: key, sortByLabel: label };
    applySearch(params);
  };

  const onKeywordChange = (e) => {
    let params = { ...searchParams, keyword: e.target.value };
    if (params.keywordFilter) {
      params = {
        ...params,
        filters: { ...params.filters, [params.keywordFilter]: e.target.value },
      };
    }
    setSearchParams(params);
  };

  const onKeywordFilter = (e) => {
    let params = {
      ...searchParams,
      filters: {
        ...searchParams.filters,
        [searchParams.keywordFilter]: undefined,
        [e.target.value]: searchParams.keyword,
      },
    };
    const newSearchParams = { ...params, keywordFilter: e.target.value };
    setSearchParams(newSearchParams);
    applySearch(newSearchParams);
  };

  const booleanFilterChecked = (input, filterName) => {
    if (input) {
      input.checked = searchParams.filters?.[filterName];
    }
  };

  const onBooleanFilter = (e, filterName) => {
    const newSearchParams = {
      ...searchParams,
      filters: { ...searchParams.filters, [filterName]: e.target.checked },
    };

    setSearchParams(newSearchParams);
    applySearch(newSearchParams);
  };

  const showAdultConsent = (onOkCallback, onCancel) => {
    confirm({
      title: "Are you over the age of 18?",
      icon: <ExclamationCircleFilled />,
      content: "You must be 18 or over to view the contents of this category",
      onOk() {
        setAdultConsenting(true);
        onOkCallback();
      },
      onCancel,
    });
  };

  const onChangeCategory = (e, id) => {
    function setCategories() {
      const list = e.target.checked
        ? [...searchParams.filters.categories, id]
        : searchParams.filters.categories.filter((el) => el != id);
      const newSearchParams = {
        ...searchParams,
        filters: { ...searchParams.filters, categories: list },
      };
      setSearchParams(newSearchParams);
      applySearch(newSearchParams);
    }

    if (!adultConsenting && e.target.checked && id == ADULT_ID) {
      showAdultConsent(setCategories, () => (e.target.checked = false));
    } else {
      setCategories();
    }
  };

  const onDomainLengthChange = (e, key) => {
    setSearchParams({
      ...searchParams,
      filters: {
        ...searchParams.filters,
        domainLength: {
          ...searchParams.filters.domainLength,
          [key]: e.target.value,
        },
      },
    });
  };

  const onPriceRangeChange = (e, key) => {
    let values = { ...searchParams.filters.priceRange, [key]: e.target.value };
    if (key == "currencyId") {
      const currencyDecimals = currencies.find(
        (c) => c.id == e.target.value
      ).decimals;
      values.decimals = currencyDecimals;
    }

    const newSearchParams = {
      ...searchParams,
      filters: {
        ...searchParams.filters,
        priceRange: {
          ...values,
        },
      },
    };

    if (
      key == "currencyId" &&
      !(isEmptyInput(values.min) || isEmptyInput(values.max))
    ) {
      setSearchParams(newSearchParams);
      applySearch(newSearchParams);
    }

    setSearchParams(newSearchParams);
  };

  const resetFilters = () => {
    applySearch(getEmptySearchParams());
  };

  const onCheckAllChange = (e) => {
    const list = e.target.checked
      ? categories.map((category) => category.id)
      : [];
    setSearchParams({
      ...searchParams,
      filters: { ...searchParams.filters, categories: list },
    });
  };

  const sortItems = [
    {
      label: "Recently listed",
      key: "creation_date_high_to_low",
    },
    {
      label: "Oldest",
      key: "creation_date_low_to_high",
    },
    {
      label: "Domain name A-z",
      key: "domain_name_a_z",
    },
    {
      label: "Domain name Z-a",
      key: "domain_name_z_a",
    },
    {
      label: "Price low to high",
      key: "price_low_to_high",
    },
    {
      label: "Price high to low",
      key: "price_high_to_low",
    },
    {
      label: "Renting price low to high",
      key: "leasing_price_low_to_high",
    },
    {
      label: "Renting price high to low",
      key: "leasing_price_high_to_low",
    },
  ];
  const domainCards = useMemo(
    () => (
      <div ref={tableEl}>
        {domainList.length == 0 ? (
          noResults ? (
            <div className="mt-5 w-full text-center text-lg">
              {hideFilters == undefined ? (
                <>
                  No domains found using the current filters.
                  <button
                    onClick={resetFilters}
                    className="btn-lg mx-auto mt-6 block"
                  >
                    Reset filters
                  </button>
                </>
              ) : (
                <div> No domains </div>
              )}
            </div>
          ) : (
            <Loading />
          )
        ) : (
          <>
            <div className="hidden overflow-x-auto md:grid">
              <ul className="flex">
                <li className="min-w-[360px] p-5 lg:w-[calc(100%-540px)]"></li>
                <li className="min-w-[170px] border-l border-white p-5 text-white">
                  Provider
                </li>
                <li className="min-w-[170px] border-l border-slate-400 p-5 text-white ">
                  Buy Now
                </li>
                <li className="min-w-[200px] max-w-[200px] border-l border-slate-400 p-5 text-white">
                  Rent
                </li>
              </ul>

              {domainList.map((el) => (
                <div key={el.id} className="col-span-1">
                  <div className="group relative flex">
                    <AuthenticatedFragment
                      permission={"listed_domains:update"}
                      owner={el.seller_id}
                    >
                      <Link
                        className="absolute top-2 right-2 z-10 rounded-md bg-white px-4 py-2 text-xs text-black hover:text-black"
                        href={`/marketplace/edit/${el.name}`}
                      >
                        Edit
                      </Link>
                    </AuthenticatedFragment>
                    <div className="relative flex min-w-[360px] items-center overflow-hidden p-2 lg:w-[calc(100%-540px)]">
                      <Image
                        src={
                          el?.category_array.length > 0
                            ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${el?.category_array[0].id}.png`
                            : "/assets/images/web3png.png"
                        }
                        alt="categories"
                        className="h-[40px] w-[40px] self-center rounded-lg bg-white object-contain p-1 md:h-[60px] md:w-[60px] md:rounded-3xl"
                        width={60}
                        height={60}
                      ></Image>
                      <h2 className="ml-2">
                        <Link
                          className="text-16 text-white hover:text-white hover:opacity-50 md:text-xl"
                          href={`/marketplace/${el.name}`}
                        >
                          {el.name}
                        </Link>
                      </h2>
                    </div>
                    <div className="min-w-[170px] border-l border-white p-5">
                      {/* {el.provider_name} */}
                      {el.provider_name === "stoppable" && (
                        <Link
                          href="/unstoppable"
                          className="text-white hover:text-white hover:opacity-50"
                        >
                          Stoppable
                        </Link>
                      )}
                      {el.provider_name === "unstoppable" && (
                        <Link
                          href="/unstoppable"
                          className="text-white hover:text-white hover:opacity-50"
                        >
                          Unstoppable
                        </Link>
                      )}
                      {el.provider_name === "freename" && (
                        <Link
                          href="/freename"
                          className="text-white hover:text-white hover:opacity-50"
                        >
                          Freename
                        </Link>
                      )}
                    </div>
                    <div className="min-w-[170px] border-l border-slate-400  p-5">
                      {el.price == null ? (
                        <div className="text-white">Not available</div>
                      ) : (
                        <Link
                        href={`/marketplace/${el.name}`}
                          // onClick={(e) => {
                          //   userInfo?.name && el.seller_id != userInfo?.name
                          //     ? buyOrder(el)
                          //     : e.preventDefault();
                          // }}
                          className="text-white hover:text-white hover:opacity-50"
                        >
                          {formatEther(el.price, el.price_currency_decimals)}{" "}
                          {el.price_currency_name}
                        </Link>
                      )}
                    </div>
                    <div className="min-w-[200px] max-w-[200px] border-l border-slate-400 p-5 text-white">
                      <span className="break-all">
                        {" "}
                        {el.approx_leasing_price_usd == null
                          ? "Not available"
                          : `$ ${el.approx_leasing_price_usd}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-y-auto px-3 py-5 md:hidden ">
              {domainList.map((el) => (
                <div
                  key={el.id}
                  className="mt-5 overflow-hidden rounded-lg border border-primary-1200/70 bg-primary-newBgColor/80 p-3 shadow-lg first:mt-0"
                >
                  <div className="h-[150px] overflow-hidden rounded-md bg-white shadow ">
                  <Link
                        href={`/marketplace/${el.name}`}
                      >
                      <Image
                        src={
                          el?.category_array.length > 0
                            ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${el?.category_array[0].id}.png`
                            : "/assets/images/web3png.png"
                        }
                        alt="categories"
                        className="h-full w-full object-contain"
                        width={200}
                        height={200}
                        ></Image>
                      </Link>
                  </div>
                  <div className="flex items-center justify-between gap-1 py-2">
                    <h2 className=" text-18 font-semibold text-white">
                      <Link
                        className=" text-white hover:text-white hover:opacity-50"
                        href={`/marketplace/${el.name}`}
                      >
                        {el.name}
                      </Link>
                    </h2>
                    <AuthenticatedFragment
                      permission={"listed_domains:update"}
                      owner={el.seller_id}
                    >
                      <Link
                        className="rounded-md border border-primary-500/60 bg-white px-3 py-2 text-black "
                        href={`/marketplace/edit/${el.name}`}
                      >
                        Edit
                      </Link>
                    </AuthenticatedFragment>
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex gap-2">
                      <h4 className="w-[70px] text-14 font-semibold text-slate-200">
                        Provider
                      </h4>
                      <span className="text-slate-200">:</span>
                      <span className="text-slate-300">
                        {el.provider_name === "unstoppable" ? (
                          <Link
                            href="/unstoppable"
                            className="text-white hover:text-white hover:opacity-50"
                          >
                            Unstoppable
                          </Link>
                        ) : (
                          <Link
                            href="/freename"
                            className="text-white hover:text-white hover:opacity-50"
                          >
                            Freename
                          </Link>
                        )}
                      </span>
                    </div>
                    <div className="flex  gap-2">
                      <h4 className="w-[70px] text-14 font-semibold text-slate-200">
                        Buy Now
                      </h4>
                      <span className="text-slate-200">:</span>
                      <span className="text-slate-300">
                        {el.price == null ? (
                          "Not available"
                        ) : (
                          <Link
                            href="#"
                            onClick={(e) => {
                              userInfo?.name && el.seller_id != userInfo?.name
                                ? buyOrder(el)
                                : e.preventDefault();
                            }}
                            className="text-white hover:text-white hover:opacity-50"
                          >
                            {formatEther(el.price, el.price_currency_decimals)}{" "}
                            {el.price_currency_name}
                          </Link>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="w-[70px] text-14 font-semibold text-slate-200">
                        Rent
                      </h4>
                      <span className="text-slate-200">:</span>
                      <span className="text-slate-300">
                        {el.approx_leasing_price_usd == null
                          ? "Not available"
                          : `$ ${el.approx_leasing_price_usd}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    ),
    [domainList, noResults]
  );

  /*Function inspired from DomainName.js*/

  async function buyOrder(_order) {
    //betaDisallowed();
    let order;
    const response = await api["getOrders"]({
      domain_id: +_order.id,
      is_erc_20_offer: false,
    });
    if (response?.result.length) {
      order = response.result[0];
    } else {
      const response = await api["getOrders"]({
        domain_id: +_order.id,
        is_erc_20_offer: true,
      });
      if (response?.result.length) {
        order = response.result[0];
      } else {
        return false;
      }
    }
    await wrapWalletFlow("Buy domain", async () => {
      const exchange = await getContract({
        name: await getExchangeName(_order),
        network: getNetwork(_order),
      });
      //console.log('Order---', order);
      const { firstOrder, secondOrder, firstSignature, secondSignature } =
        await prepareOrders(
          { ..._order, ...order.order_json.data },
          order.order_json.signature,
          order.order_json.data.amount,
          signBuyOrder,
          exchange,
          exchange
        );
      
      let overrides = { gasLimit: 1000000, value: firstOrder.amount };
      console.log("Currency: "+firstOrder.currencyContract);
      if (nativeAddress == firstOrder.currencyContract) {
        
        await sendContractTransaction(
          exchange,
          "atomicMatch",
          [firstOrder, secondOrder, firstSignature, secondSignature, overrides],
          "Transfer domain"
        );

      } else {
        await sendContractTransaction(
          exchange,
          "atomicMatch",
          [firstOrder, secondOrder, firstSignature, secondSignature, overrides],
          "Transfer domain"
        );
      }
      // overrides = { value: firstOrder.amount,  gasLimit: 1000000 };
      // reloadOrdersList({
      //   isErc20Offer: order.is_erc_20_offer,
      //   isLeasing: false,
      // });
    });
  }

  async function getExchangeName(domainInfo) {
    if (domainInfo.provider_name == "freename") {
      return "ExchangeFreename";
    }
    if (domainInfo.provider_name == "unstoppable") {
      return "Exchange";
    }
    if (domainInfo.provider_name == "ens") {
      return "ExchangeENS";
    }
    throw new Error("Unknown domain provider");
  }

  function getNetwork(order) {
    //console.log('order----', order);
    if (order.provider_name == "freename") {
      return "polygon";
    }
    if (order.provider_name == "unstoppable") {
      return "polygon";
    }
    if (order.provider_name == "ens") {
      return "ethereum";
    }
  }

  const prepareOrders = async (
    baseOrder,
    signature,
    totalPrice,
    signFunction,
    contract,
    exchange
  ) => {
    let res = {};
    const orderA = baseOrder;
    const orderB = {
      ...baseOrder,
      maker: currentAddress,
      salt: Math.floor(Math.random() * (1000000 - 1) + 1),
      nonce: (await exchange.nonce(currentAddress)).toString(),
      offerNonce: (
        await exchange.offerNonce(baseOrder.tokenId, currentAddress)
      ).toString(),
    };
    if (orderA.isErc20Offer) {
      orderB.isErc20Offer = false;

      res.firstOrder = orderB;
      res.firstSignature = await signFunction(orderB);

      res.secondOrder = orderA;
      res.secondSignature = signature;

      // await approveDomainContract(contract, domainInfo.provider_name);
    } else {
      orderB.isErc20Offer = true;
      res.firstOrder = orderA;
      res.firstSignature = signature;

      res.secondOrder = orderB;
      res.secondSignature = await signFunction(orderB);

      // if (orderA.currencyContract != nativeAddress) {
      //   await increaseTokenAllowance(
      //     orderA.currencyContract,
      //     totalPrice,
      //     contract
      //   );
      // }
    }

    console.log("PREPARATION", res);
    return res;
  };

  async function signBuyOrder(order) {
    const domain = {
      name: "Web3 Onboarding",
      version: "1.0",
      chainId: config.networks[getNetwork(order)].chainId,
      verifyingContract: config.contractAddresses[await getExchangeName(order)],
    };
   
    return await signTypedData({
      types: {
        EIP712Domain: config.eip712Domain.fields,
        Order: config.eip712Order.fields,
      },
      domain: domain,
      primaryType: "Order",
      message: order,
    });

    
  }
  // provider filter funtion
  // const dummy = Array.from(
  //   domainList.map((item, index) => {
  //     if (index % 2 == 0) {
  //       item.provider_name = "stoppable";
  //       return item;
  //     }
  //     return item;
  //   })
  // );

  const [selectedProviders, setSelectedProviders] = useState([]);
  const uniqueProviderName = [
    ...new Set(domainList.map((item) => item.provider_name)),
  ];

  const handleCheckboxChange = (providerName) => {
    if (selectedProviders.includes(providerName)) {
      setSelectedProviders(
        selectedProviders.filter((name) => name !== providerName)
      );
    } else {
      setSelectedProviders([...selectedProviders, providerName]);
    }
  };

  // const filteredData = domainList.filter((item) =>
  //   selectedProviders.length === 0 || selectedProviders.includes(item.provider_name)
  // );
  // setDomainList(filteredData);
  // console.log(filteredData, 'filteredData');
  useEffect(() => {
    const filteredData = domainList.filter(
      (item) =>
        selectedProviders.length === 0 ||
        selectedProviders.includes(item.provider_name)
    );
    setDomainList(filteredData);
    // console.log(filteredData, 'filteredData');
  }, [selectedProviders]);
  // console.log(domainList, 'new domainList');

  const [isSelected, setIsSelected] = React.useState(false);

  const handleSwitch = async (e) => {

    if (isSelected == false) { 
      router.push('/marketplace/tlds');
    } else {
      router.push('/marketplace');
    }
  }

  return (
    <>
      <div className="flex h-screen">
        <sidebar className="bg-image4 z-[9] hidden h-full w-64 border-r border-white text-white md:relative md:block">
          <div className="h-[81px] border-b border-white p-3">
            {/* <Link href="/home">
              <Image
                src={web3img}
                width={150}
                height={150}
                className="m-auto w-full max-w-[150px] cursor-pointer"
              ></Image>
            </Link> */}
            {/* Switch */}
              <div className="flex flex-row gap-1 mt-5">
              <p className="text-sm ml-3">Domains</p>
              <Switch
                isSelected={isSelected} onClick={handleSwitch} onValueChange={setIsSelected}
                classNames={{
                  base: cn(
                    "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                    "justify-between cursor-pointer rounded-lg gap-1 p-0 mr-5",
                    "data-[selected=true]:border-primary",
                  ),
                  wrapper: "p-0 h-4 overflow-visible  border-white border-2",
                  thumb: cn("w-6 h-6 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    //selected
                    "group-data-[selected=true]:ml-6",
                    // pressed
                    "group-data-[pressed=true]:w-7",
                    "group-data-[selected]:group-data-[pressed]:ml-4",
                  ),
                }}
                >
                </Switch>
                <p className="text-sm text-default-400">TLDs</p>
              </div>
         
          </div>
          <div className="h-[calc(100%-105px)] px-6 py-4">
            <div className="mb-8">
              {/* sub heading 1 */}
              <div className="mb-3">
                <h2 className="text-md mb-3 border-b border-white pb-1 font-light">
                  Filter
                </h2>
                {sidebar.map((item, index) => (
                  <div key={index} className="relative">
                    <div className=" peer relative flex h-[30px] cursor-pointer items-center px-2 py-1">
                      <span className="ay-center left-0">
                        {reactIcons.arrowright}
                      </span>
                      <span className="ml-4"> {item.name}</span>
                      <span className="ay-center right-0">
                        {reactIcons.dropdown}
                      </span>
                    </div>
                    {item.type === "KP" && (
                      <div className="gradient-color absolute z-[100] hidden w-full flex-col rounded  hover:flex peer-hover:flex">
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            checked={
                              searchParams.keywordFilter == "containsKeyword"
                            }
                            type="radio"
                            id="Contains"
                            name="keyword-radio"
                            value="containsKeyword"
                            onChange={onKeywordFilter}
                            className="mr-2"
                          />
                          <label
                            htmlFor="Contains"
                            className="font-brand-freename text-white"
                          >
                            Contains
                          </label>
                        </div>
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            checked={
                              searchParams.keywordFilter == "startsWithKeyword"
                            }
                            type="radio"
                            id="Starts with"
                            name="keyword-radio"
                            value="startsWithKeyword"
                            onChange={onKeywordFilter}
                            className="mr-2"
                          />
                          <label
                            htmlFor="Starts with"
                            className="font-brand-freename text-white"
                          >
                            Starts with
                          </label>
                        </div>
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            checked={
                              searchParams.keywordFilter == "endsWithKeyword"
                            }
                            type="radio"
                            id="Ends with"
                            name="keyword-radio"
                            value="endsWithKeyword"
                            onChange={onKeywordFilter}
                            className="mr-2"
                          />
                          <label
                            htmlFor="Ends with"
                            className="font-brand-freename text-white"
                          >
                            Ends with
                          </label>
                        </div>
                      </div>
                    )}
                    {item.type === "LP" && (
                      <div className="gradient-color absolute z-[100] hidden w-full flex-col rounded hover:flex peer-hover:flex">
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            ref={(input) =>
                              booleanFilterChecked(input, "buyNowListing")
                            }
                            type="checkbox"
                            id="Buy-listings"
                            onClick={(e) => onBooleanFilter(e, "buyNowListing")}
                            className="mr-2"
                          />
                          <label
                            htmlFor="Buy-listings"
                            className="font-brand-freename text-white"
                          >
                            Buy now listings
                          </label>
                        </div>
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            ref={(input) =>
                              booleanFilterChecked(input, "leaseNowListing")
                            }
                            type="checkbox"
                            id="Lease-listings"
                            onClick={(e) =>
                              onBooleanFilter(e, "leaseNowListing")
                            }
                            className="mr-2"
                          />
                          <label
                            htmlFor="Lease-listings"
                            className="font-brand-freename text-white"
                          >
                            Rent now listings
                          </label>
                        </div>
                      </div>
                    )}
                    {item.type === "PR" && (
                      <div className="gradient-color absolute z-[100] hidden w-auto flex-col rounded hover:flex peer-hover:flex md:w-96">
                        <div className="w-full px-4 py-4 text-left">
                          <select
                            name="Price"
                            id="Price-range"
                            value={
                              searchParams.filters?.priceRange?.currencyId || ""
                            }
                            onChange={(e) =>
                              onPriceRangeChange(e, "currencyId")
                            }
                            className="bg-gray rounded p-1 text-black"
                          >
                            {currencies.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex w-full gap-2 px-4 py-4 text-left">
                          <input
                            type="number"
                            placeholder="Min"
                            value={searchParams.filters?.priceRange?.min || ""}
                            onInput={(e) => onPriceRangeChange(e, "min")}
                            className="bg-gray w-1/2 rounded p-2 text-black"
                            onKeyUp={onEnterPress}
                          />
                          <span className="my-auto text-white">to</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={searchParams.filters?.priceRange?.max || ""}
                            onInput={(e) => onPriceRangeChange(e, "max")}
                            className="bg-gray w-1/2 rounded p-2 text-black"
                            onKeyUp={onEnterPress}
                          />
                        </div>
                      </div>
                    )}
                    {item.type === "DL" && (
                      <div className="gradient-color absolute z-[100] hidden w-auto flex-col rounded px-4 py-4 text-white hover:flex peer-hover:flex md:w-96">
                        <p>Characters</p>
                        <div className="mt-2 flex w-full gap-2 text-left">
                          <input
                            value={
                              searchParams.filters?.domainLength?.min || ""
                            }
                            type="number"
                            placeholder="1"
                            onInput={(e) => onDomainLengthChange(e, "min")}
                            className="bg-gray w-1/2 rounded p-2 text-black"
                            onKeyUp={onEnterPress}
                          />
                          <span className="my-auto">to</span>
                          <input
                            value={
                              searchParams.filters?.domainLength?.max || ""
                            }
                            type="number"
                            placeholder="∞"
                            onInput={(e) => onDomainLengthChange(e, "max")}
                            className="bg-gray w-1/2 rounded p-2 text-black"
                            onKeyUp={onEnterPress}
                          />
                        </div>
                      </div>
                    )}
                    {item.type === "SC" && (
                      <div className="gradient-color absolute z-[100] hidden w-80 flex-col rounded  text-white hover:flex peer-hover:flex">
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            ref={(input) =>
                              booleanFilterChecked(input, "excludeHyphens")
                            }
                            type="checkbox"
                            id="hyphens-char"
                            onClick={(e) =>
                              onBooleanFilter(e, "excludeHyphens")
                            }
                            className="mr-2"
                          />
                          <label
                            htmlFor="hyphens-char"
                            className="font-brand-freename"
                          >
                            Exclude domains with hyphens
                          </label>
                        </div>
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            ref={(input) =>
                              booleanFilterChecked(input, "excludeNumerals")
                            }
                            type="checkbox"
                            id="numerals-char"
                            onClick={(e) =>
                              onBooleanFilter(e, "excludeNumerals")
                            }
                            className="mr-2"
                          />
                          <label
                            htmlFor="numerals-char"
                            className="font-brand-freename"
                          >
                            Exclude domains with numerals
                          </label>
                        </div>
                        <div className="w-full px-4 py-4 text-left">
                          <input
                            ref={(input) =>
                              booleanFilterChecked(input, "onlyNumerals")
                            }
                            type="checkbox"
                            id="numerals-char2"
                            onClick={(e) => onBooleanFilter(e, "onlyNumerals")}
                            className="mr-2"
                          />
                          <label
                            htmlFor="numerals-char2"
                            className="font-brand-freename"
                          >
                            Domains with numerals only
                          </label>
                        </div>
                      </div>
                    )}
                    {item.type === "CAT" && (
                      <div className="gradient-color absolute z-[100] hidden h-[150px] flex-col overflow-auto overflow-y-auto rounded  text-white hover:flex peer-hover:flex">
                        <div className="w-full px-5 py-3 text-left">
                          <input
                            type="checkbox"
                            id="Check-category"
                            ref={(input) => {
                              if (input) {
                                input.indeterminate =
                                  searchParams.filters.categories.length > 0 &&
                                  searchParams.filters.categories.length <
                                    categories.length;
                                input.checked =
                                  searchParams.filters.categories.length ==
                                  categories.length;
                              }
                            }}
                            onClick={onCheckAllChange}
                            className="mr-2"
                          />
                          <label
                            htmlFor="Check-category"
                            className="font-brand-freename"
                          >
                            Check all
                          </label>
                        </div>
                        {categories &&
                          categories.map((category) => (
                            <div
                              className="w-full px-5 py-2 text-left"
                              key={category.id}
                            >
                              <input
                                type="checkbox"
                                id={category.name}
                                ref={(input) => {
                                  if (input) {
                                    input.checked =
                                      searchParams.filters.categories.includes(
                                        category.id
                                      );
                                  }
                                }}
                                onChange={(e) =>
                                  onChangeCategory(e, category.id)
                                }
                                className="mr-2"
                              />
                              <label
                                htmlFor={category.name}
                                className="font-brand-freename cursor-default "
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                      </div>
                    )}
                    {item.type === "PROV" && (
                      <div className="gradient-color absolute z-[100] hidden h-[150px] flex-col overflow-auto overflow-y-auto rounded  text-white hover:flex peer-hover:flex">
                          {uniqueProviderName.map((providerName) => (
                            <div className="w-full px-5 py-3 text-left" key={providerName}>
                                 <label className="font-brand-freename cursor-default" >
                              <input
                                type="checkbox"
                                className="mr-2"
                                value={providerName}
                                checked={selectedProviders.includes(
                                  providerName
                                )}
                                onChange={() =>
                                  handleCheckboxChange(providerName)
                                }
                              />
                              {providerName}
                            </label>
                            </div>
                           
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* sub heading 2 */}
              <div className="mb-3">
                <h2 className="text-md mb-3 border-b border-white pb-1 font-light">
                  Sort
                </h2>
                <div className="relative">
                  <div className="peer flex h-[30px] cursor-pointer items-center whitespace-nowrap px-2 py-1">
                    <span className="ay-center left-0">
                      {reactIcons.arrowright}
                    </span>
                    <span className="ml-4">
                      {searchParams.sortByLabel || "Sort"}
                    </span>
                    <span className="ay-center right-1">
                      {reactIcons.dropdown}
                    </span>
                  </div>
                  <div className="gradient-color absolute top-[30px] right-0 z-[100] hidden h-[150px] flex-col overflow-auto  rounded p-3  text-white hover:flex peer-hover:flex">
                    {sortItems.map((sortItem) => (
                      <a
                        className="font-brand-freename whitespace-nowrap py-3 hover:opacity-70 hover:opacity-50"
                        key={sortItem.key}
                        onClick={(e) => clickSortButton(sortItem)}
                      >
                        {sortItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* sub heading 3 */}
              <h2 className="text-md mb-3 border-b border-white pb-1 font-light">
                Preference
              </h2>
              {domainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50"
                >
                  <span className="ay-center left-0">{item.icon}</span>
                  <span className="ml-4">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </sidebar>
        <div className="w-full flex-1">
          <header className="flex h-auto border-b border-white p-3 text-white md:h-[81px] md:p-4">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-0 md:flex-row">
              <div className="flex w-full items-center justify-between space-x-2 md:w-auto">
                <div className="flex-center md:hidden">
                  <button
                    className="text-24 md:hidden"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    {reactIcons.menu}
                  </button>
                  <Drawer
                    anchor="left"
                    PaperProps={{
                      style: {
                        width: "70%",
                        backgroundColor: "black",
                      },
                    }}
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    className="md:hidden"
                  >
                    <sidebar className="bg-image4 relative z-[9] h-full border-r border-white text-white">
                      <div className="h-[105px] border-b border-white p-3">
                        {/* <Link href="/home">
                          <Image
                            src={web3img}
                            width={150}
                            height={150}
                            className="m-auto w-full max-w-[150px] cursor-pointer"
                          ></Image>
                        </Link> */}
                                    {/* Switch */}
                        <div className="flex flex-row gap-1 mt-5">
                        <p className="text-sm ml-3">Domains</p>
                        <Switch
                          isSelected={isSelected} onClick={handleSwitch} onValueChange={setIsSelected}
                          classNames={{
                            base: cn(
                              "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                              "justify-between cursor-pointer rounded-lg gap-1 p-0 mr-5",
                              "data-[selected=true]:border-primary",
                            ),
                            wrapper: "p-0 h-4 overflow-visible  border-white border-2",
                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                              "group-data-[hover=true]:border-primary",
                              //selected
                              "group-data-[selected=true]:ml-6",
                              // pressed
                              "group-data-[pressed=true]:w-7",
                              "group-data-[selected]:group-data-[pressed]:ml-4",
                            ),
                          }}
                          >
                          </Switch>
                          <p className="text-sm text-default-400">TLDs</p>
                        </div>
                      </div>
                      <div className="h-[calc(100%-105px)] px-6 py-4">
                        <div className="mb-8">
                          {/* sub heading 1 */}
                          <div className="mb-3">
                            <h2 className="text-md mb-3 border-b border-white pb-1 font-light">
                              Filter
                            </h2>
                            {sidebar.map((item, index) => (
                              <div key={index} className="relative">
                                <div className=" peer relative flex h-[30px] cursor-pointer items-center px-2 py-1">
                                  <span className="ay-center left-0">
                                    {reactIcons.arrowright}
                                  </span>
                                  <span className="ml-4"> {item.name}</span>
                                  <span className="ay-center right-0">
                                    {reactIcons.dropdown}
                                  </span>
                                </div>
                                {item.type === "KP" && (
                                  <div className="gradient-color absolute z-[100] hidden w-full flex-col rounded  hover:flex peer-hover:flex">
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        checked={
                                          searchParams.keywordFilter ==
                                          "containsKeyword"
                                        }
                                        type="radio"
                                        id="Contains"
                                        name="keyword-radio"
                                        value="containsKeyword"
                                        onChange={onKeywordFilter}
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="Contains"
                                        className="font-brand-freename text-white"
                                      >
                                        Contains
                                      </label>
                                    </div>
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        checked={
                                          searchParams.keywordFilter ==
                                          "startsWithKeyword"
                                        }
                                        type="radio"
                                        id="Starts with"
                                        name="keyword-radio"
                                        value="startsWithKeyword"
                                        onChange={onKeywordFilter}
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="Starts with"
                                        className="font-brand-freename text-white"
                                      >
                                        Starts with
                                      </label>
                                    </div>
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        checked={
                                          searchParams.keywordFilter ==
                                          "endsWithKeyword"
                                        }
                                        type="radio"
                                        id="Ends with"
                                        name="keyword-radio"
                                        value="endsWithKeyword"
                                        onChange={onKeywordFilter}
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="Ends with"
                                        className="font-brand-freename text-white"
                                      >
                                        Ends with
                                      </label>
                                    </div>
                                  </div>
                                )}
                                {item.type === "LP" && (
                                  <div className="gradient-color absolute z-[100] hidden w-full flex-col rounded hover:flex peer-hover:flex">
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        ref={(input) =>
                                          booleanFilterChecked(
                                            input,
                                            "buyNowListing"
                                          )
                                        }
                                        type="checkbox"
                                        id="Buy-listings"
                                        onClick={(e) =>
                                          onBooleanFilter(e, "buyNowListing")
                                        }
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="Buy-listings"
                                        className="font-brand-freename text-white"
                                      >
                                        Buy now listings
                                      </label>
                                    </div>
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        ref={(input) =>
                                          booleanFilterChecked(
                                            input,
                                            "leaseNowListing"
                                          )
                                        }
                                        type="checkbox"
                                        id="Lease-listings"
                                        onClick={(e) =>
                                          onBooleanFilter(e, "leaseNowListing")
                                        }
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="Lease-listings"
                                        className="font-brand-freename text-white"
                                      >
                                        Rent now listings
                                      </label>
                                    </div>
                                  </div>
                                )}
                                {item.type === "PR" && (
                                  <div className="gradient-color absolute z-[100] hidden w-auto flex-col rounded hover:flex peer-hover:flex md:w-96">
                                    <div className="w-full px-4 py-4 text-left">
                                      <select
                                        name="Price"
                                        id="Price-range"
                                        value={
                                          searchParams.filters?.priceRange
                                            ?.currencyId || ""
                                        }
                                        onChange={(e) =>
                                          onPriceRangeChange(e, "currencyId")
                                        }
                                        className="bg-gray rounded p-1 text-black"
                                      >
                                        {currencies.map((c) => (
                                          <option key={c.id} value={c.id}>
                                            {c.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="flex w-full gap-2 px-4 py-4 text-left">
                                      <input
                                        type="number"
                                        placeholder="Min"
                                        value={
                                          searchParams.filters?.priceRange
                                            ?.min || ""
                                        }
                                        onInput={(e) =>
                                          onPriceRangeChange(e, "min")
                                        }
                                        className="bg-gray w-1/2 rounded p-2 text-black"
                                        onKeyUp={onEnterPress}
                                      />
                                      <span className="my-auto text-white">
                                        to
                                      </span>
                                      <input
                                        type="number"
                                        placeholder="Max"
                                        value={
                                          searchParams.filters?.priceRange
                                            ?.max || ""
                                        }
                                        onInput={(e) =>
                                          onPriceRangeChange(e, "max")
                                        }
                                        className="bg-gray w-1/2 rounded p-2 text-black"
                                        onKeyUp={onEnterPress}
                                      />
                                    </div>
                                  </div>
                                )}
                                {item.type === "DL" && (
                                  <div className="gradient-color absolute z-[100] hidden w-auto flex-col rounded px-4 py-4 text-white hover:flex peer-hover:flex md:w-96">
                                    <p>Characters</p>
                                    <div className="mt-2 flex w-full gap-2 text-left">
                                      <input
                                        value={
                                          searchParams.filters?.domainLength
                                            ?.min || ""
                                        }
                                        type="number"
                                        placeholder="1"
                                        onInput={(e) =>
                                          onDomainLengthChange(e, "min")
                                        }
                                        className="bg-gray w-1/2 rounded p-2 text-black"
                                        onKeyUp={onEnterPress}
                                      />
                                      <span className="my-auto">to</span>
                                      <input
                                        value={
                                          searchParams.filters?.domainLength
                                            ?.max || ""
                                        }
                                        type="number"
                                        placeholder="∞"
                                        onInput={(e) =>
                                          onDomainLengthChange(e, "max")
                                        }
                                        className="bg-gray w-1/2 rounded p-2 text-black"
                                        onKeyUp={onEnterPress}
                                      />
                                    </div>
                                  </div>
                                )}
                                {item.type === "SC" && (
                                  <div className="gradient-color absolute z-[100] hidden w-auto flex-col rounded text-white  hover:flex peer-hover:flex md:w-80">
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        ref={(input) =>
                                          booleanFilterChecked(
                                            input,
                                            "excludeHyphens"
                                          )
                                        }
                                        type="checkbox"
                                        id="hyphens-char"
                                        onClick={(e) =>
                                          onBooleanFilter(e, "excludeHyphens")
                                        }
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="hyphens-char"
                                        className="font-brand-freename"
                                      >
                                        Exclude domains with hyphens
                                      </label>
                                    </div>
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        ref={(input) =>
                                          booleanFilterChecked(
                                            input,
                                            "excludeNumerals"
                                          )
                                        }
                                        type="checkbox"
                                        id="numerals-char"
                                        onClick={(e) =>
                                          onBooleanFilter(e, "excludeNumerals")
                                        }
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="numerals-char"
                                        className="font-brand-freename"
                                      >
                                        Exclude domains with numerals
                                      </label>
                                    </div>
                                    <div className="w-full px-4 py-4 text-left">
                                      <input
                                        ref={(input) =>
                                          booleanFilterChecked(
                                            input,
                                            "onlyNumerals"
                                          )
                                        }
                                        type="checkbox"
                                        id="numerals-char2"
                                        onClick={(e) =>
                                          onBooleanFilter(e, "onlyNumerals")
                                        }
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="numerals-char2"
                                        className="font-brand-freename"
                                      >
                                        Domains with numerals only
                                      </label>
                                    </div>
                                  </div>
                                )}
                                {item.type === "CAT" && (
                                  <div className="gradient-color absolute z-[100] hidden h-[150px] flex-col overflow-auto overflow-y-auto rounded  text-white hover:flex peer-hover:flex">
                                    <div className="w-full px-5 py-3 text-left">
                                      <input
                                        type="checkbox"
                                        id="Check-category"
                                        ref={(input) => {
                                          if (input) {
                                            input.indeterminate =
                                              searchParams.filters.categories
                                                .length > 0 &&
                                              searchParams.filters.categories
                                                .length < categories.length;
                                            input.checked =
                                              searchParams.filters.categories
                                                .length == categories.length;
                                          }
                                        }}
                                        onClick={onCheckAllChange}
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor="Check-category"
                                        className="font-brand-freename"
                                      >
                                        Check all
                                      </label>
                                    </div>
                                    {categories &&
                                      categories.map((category) => (
                                        <div
                                          className="w-full px-5 py-2 text-left"
                                          key={category.id}
                                        >
                                          <input
                                            type="checkbox"
                                            id={category.name}
                                            ref={(input) => {
                                              if (input) {
                                                input.checked =
                                                  searchParams.filters.categories.includes(
                                                    category.id
                                                  );
                                              }
                                            }}
                                            onChange={(e) =>
                                              onChangeCategory(e, category.id)
                                            }
                                            className="mr-2"
                                          />
                                          <label
                                            htmlFor={category.name}
                                            className="font-brand-freename cursor-default "
                                          >
                                            {category.name}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* sub heading 2 */}
                          <div className="mb-3">
                            <h2 className="text-md mb-3 border-b border-white pb-1 font-light">
                              Sort
                            </h2>
                            <div className="relative">
                              <div className="peer flex h-[30px] cursor-pointer items-center whitespace-nowrap px-2 py-1">
                                <span className="ay-center left-0">
                                  {reactIcons.arrowright}
                                </span>
                                <span className="ml-4">
                                  {searchParams.sortByLabel || "Sort"}
                                </span>
                                <span className="ay-center right-1">
                                  {reactIcons.dropdown}
                                </span>
                              </div>
                              <div className="gradient-color absolute top-[30px] right-0 z-[100] hidden h-[150px] flex-col overflow-auto  rounded p-3  text-white hover:flex peer-hover:flex">
                                {sortItems.map((sortItem) => (
                                  <a
                                    className="font-brand-freename whitespace-nowrap py-3 hover:opacity-70 hover:opacity-50"
                                    key={sortItem.key}
                                    onClick={(e) => clickSortButton(sortItem)}
                                  >
                                    {sortItem.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* sub heading 3 */}
                          <h2 className="text-md mb-3 border-b border-white pb-1 font-light">
                            Preference
                          </h2>
                          {domainLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50"
                            >
                              <span className="ay-center left-0">
                                {item.icon}
                              </span>
                              <span className="ml-4">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </sidebar>
                  </Drawer>
                </div>
                <span className="text-xl font-medium">Marketplace</span>
                {/* <Link
                  className="flex-center ml-auto flex h-[40px] gap-2 rounded-2xl bg-white px-3 text-16 text-black hover:text-black"
                  href={
                    initialState?.domainType == "tld"
                      ? "/marketplace"
                      : "/marketplace/tlds"
                  }
                >
                  <span>{reactIcons.power}</span>{" "}
                  <span className="hidden md:flex">
                    {initialState?.domainType == "tld"
                      ? "Switch to Domain"
                      : "Switch to TLDs"}
                  </span>
                </Link> */}
              <form
                className="relative hidden lg:flex"
                onSubmit={searchClickHandler}
              >
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchParams.keyword || ""}
                  onKeyUp={onEnterPress}
                  onInput={onKeywordChange}
                  className="w-[350px] rounded-full bg-white p-3 pl-10 text-black"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-16 text-black">
                  <BiSearch />
                </div>
              </form>
              </div>
              {/* <Account
                className={"ml-0 w-full justify-between gap-2 md:w-auto"}
                textClass="text-white"
              /> */}
            </div>
          </header>

          <div className="h-[calc(100%-81px)] overflow-auto" id="scrrolledDiv">
            <InfiniteScroll
              dataLength={domainList.length}
              next={fetchNewData}
              hasMore={true}
              scrollableTarget="scrrolledDiv"
            >
              {domainCards}
            </InfiniteScroll>
            {showLoader && <Loading />}
          </div>
        </div>
      </div>
    </>
  );
}
