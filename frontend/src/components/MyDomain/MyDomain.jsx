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
import feature1 from "/public/assets/images/feature1.png";

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
            <div className="w-full text-center text-lg">
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
                <p className='mt-5 text-sm text-center'>Nothing to see here yet, <Link href="https://unstoppabledomains.com/?ref=4f4046defa8b48b" target="_blank" className="text-violet-900">Get the Domain </Link>or
                <Link href="https://freename.io/?referralCode=eager-boxes-throw" target="_blank" className="text-blue-900"> TLD here.</Link></p>
              )}
            </div>
          ) : (
            <Loading />
          )
        ) : (
          <>
            <div className="hidden overflow-x-auto md:grid">
            <div className="grid grid-cols-3 gap-3 pt-5">
                {domainList.map((el) => (
                  <div className="col-span-1">
                  <div className="rounded-lg overflow-hidden border bg-primary-newBgColor2/40">
                      <div className="h-[250px] bg-primary-1000 border-b-2">
                          <Image
                            src={feature1}
                            alt=""
                            width={300}
                            height={300}
                            className="m-auto w-full cursor-pointer"
                          ></Image>
                      </div>
                      <div className="p-3 px-4">
                                <h3 className='text'>
                                    <Link
                           className="text-16 text-white hover:text-white hover:opacity-50 md:text-xl  border-b-2"
                           href={`/marketplace/${el.name}`}
                         >
                           {el.name}
                         </Link></h3>
                          {/* <div className="pt-8 grid grid-cols-2 gap-1 justify-between">
                              <div className="col-span-1"><h4 className='text-[#CED6FF] text-18'>TLD/DOMAIN</h4></div>
                              <div className="col-span-1"><h4 className='text-[#CED6FF] text-18'>Price</h4></div>
                          </div>
                          <div className="grid grid-cols-2 pt-4">
                              <div className="col-span-1 flex items-center gap-1 text-[#CED6FF]"><span className='text-[#E8AFF6]'>{reactIcons.person}</span>by USER</div>
                              <div className="col-span-1 flex items-center gap-1 text-[#CED6FF]"><span className='text-[#E8AFF6]'>{reactIcons.tag}</span>Category</div>
                          </div> */}
                      </div>
                  </div>

                    </div>
                    
                // <div key={el.id} className="col-span-1">
                //   <div className="group relative flex">
                //     <AuthenticatedFragment
                //       permission={"listed_domains:update"}
                //       owner={el.seller_id}
                //     >
                //       <Link
                //         className="absolute top-2 right-2 z-10 rounded-md bg-white px-4 py-2 text-xs text-black hover:text-black"
                //         href={`/marketplace/edit/${el.name}`}
                //       >
                //         Edit
                //       </Link>
                //     </AuthenticatedFragment>
                //     <div className="relative flex min-w-[360px] items-center overflow-hidden p-2 lg:w-[calc(100%-540px)]">
                //       <Image
                //         src={
                //           el?.category_array.length > 0
                //             ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${el?.category_array[0].id}.png`
                //             : "/assets/images/web3png.png"
                //         }
                //         alt="categories"
                //         className="h-[40px] w-[40px] self-center rounded-lg bg-white object-contain p-1 md:h-[60px] md:w-[60px] md:rounded-3xl"
                //         width={60}
                //         height={60}
                //       ></Image>
                //       <h2 className="ml-2">
                //         <Link
                //           className="text-16 text-white hover:text-white hover:opacity-50 md:text-xl"
                //           href={`/marketplace/${el.name}`}
                //         >
                //           {el.name}
                //         </Link>
                //       </h2>
                //     </div>
                //       </div>
                // </div>
                ))}
                                  </div>
            </div>
          </>
        )}
      </div>
    ),
    [domainList, noResults]
  );

  const [selectedProviders, setSelectedProviders] = useState([]);
  const uniqueProviderName = [
    ...new Set(domainList.map((item) => item.provider_name)),
  ];

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

  return (
    <>
      <div className="flex h-screen">
        <div className="w-full flex-1">
                  <div className="h-[calc(100%-81px)] overflow-auto" id="scrrolledDiv">
                  <h2 className='font-medium text-2xl text-center'>My Domains</h2>              
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
