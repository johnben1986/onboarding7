import { ethers } from "ethers";
import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAPI } from "../../hooks/useAPI";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import useWallet from "../../hooks/useWallet";
import { Modal } from "antd";
import Loading from "components/utils/Loading";
import Link from "next/link";
import Button from "components/utils/Button";
import DropdownIcon from "../../../public/assets/images/svg/dropdown-icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { reactIcons } from "components/utils/icons";
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
];
const domainLinks = [
  {
    name: "Account",
    href: "/users/me",
  },
  {
    name: "Mint UD Domain",
    href: "/marketplace/mint",
  },
  {
    name: "List Domain",
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

export default function DomainFilter({ initialState, hideFilters }) {
  const { api } = useAPI();
  const { config } = useWallet();
  const [domainList, setDomainList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
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

  const onEnterPress = (e) => {
    e = e || window.event;
    if (e.keyCode == 13) {
      document.getElementById("searchBtn").click();
      return false;
    }
    return true;
  };

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
    if (scrollSearchParams.current && !scrollSearchParams.current.isFetching) {
      scrollSearchParams.current.isFetching = true;

      const domains = await api.getDomains(scrollSearchParams.current);
      // console.log("DOMAINS", domains);
      if (!scrollSearchParams.current?.isFetching) {
        return;
      }

      setNoResults(() => false);
      setDomainList((domainList) => domainList.concat(domains.result));
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
    }
  };

  const searchClickHandler = async () => {
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
  // const domainTable = useMemo(
  //   () => (
  //     <div
  //       className="mb-10 w-full bg-brand-background"
  //       style={{ height: "70vh" }}
  //     >
  //       <div className="mx-10 flex justify-between py-5 text-center font-brand-heading text-2xl font-bold text-black">
  //         <p className="w-full lg:w-4/12">Domain</p>
  //         <p className="hidden w-4/12 lg:block">Category</p>
  //         <p className="hidden w-2/12 lg:block">Price</p>
  //         <p className="hidden w-2/12 lg:block">Renting</p>
  //       </div>

  //       <div
  //         className="space-y-4 overflow-y-auto pt-4 lg:space-y-2"
  //         style={{ height: "84%" }}
  //         ref={tableEl}
  //       >
  //         {domainList.length == 0 ? (
  //           noResults ? (
  //             <div className="mt-5 w-full text-center text-lg">
  //               {hideFilters == undefined ? (
  //                 <>
  //                   No domains found using the current filters.
  //                   <a onClick={resetFilters} className="text-brand-blue">
  //                     Reset filters
  //                   </a>
  //                 </>
  //               ) : (
  //                 <> No domains </>
  //               )}
  //             </div>
  //           ) : (
  //             <Loading />
  //           )
  //         ) : (
  //           domainList.map((el) => (
  //             <div key={el.id} className="flex w-full px-2 text-black lg:px-10">
  //               <div className="flex w-8/12 justify-between text-start font-brand-tomorrow lg:w-4/12">
  //                 <Link className="text-xl" href={`/marketplace/${el.name}`}>
  //                   {el.name}
  //                 </Link>
  //                 <AuthenticatedFragment
  //                   permission={"listed_domains:update"}
  //                   owner={el.seller_id}
  //                 >
  //                   <Button href={`/marketplace/edit/${el.name}`}>Edit</Button>
  //                 </AuthenticatedFragment>
  //               </div>
  //               <div className="hidden w-0 justify-center gap-1 lg:flex lg:w-4/12">
  //                 {el.category_array?.map((category) => (
  //                   <Link
  //                     key={category.id}
  //                     className="my-auto rounded-full bg-brand-primary px-2 py-4 font-bold text-white"
  //                     href={`/marketplace?s=${encodeURIComponent(
  //                       `{"filters":{"categories":[${category.id}]}}`
  //                     )}`}
  //                   >
  //                     {category.name}
  //                   </Link>
  //                 ))}
  //               </div>
  //               <div className="w-2/12 text-end font-brand-tomorrow">
  //                 {el.price == null
  //                   ? "-"
  //                   : `${formatEther(el.price, el.price_currency_decimals)} ${
  //                       el.price_currency_name
  //                     }`}
  //               </div>
  //               <div className="w-2/12 text-end font-brand-tomorrow">
  //                 {el.main_leasing_json == null
  //                   ? "-"
  //                   : `${
  //                       Math.round(
  //                         formatEther(
  //                           ethers.BigNumber.from(
  //                             el.main_leasing_json.data.paymentPerSecond
  //                           )
  //                             .mul(SECONDS_IN_MONTH)
  //                             .div(
  //                               ethers.BigNumber.from(
  //                                 config.PAYMENT_PER_SECOND_MULTIPLIER
  //                               )
  //                             ),
  //                           el.leasing_price_per_second_currency_decimals
  //                         ) * 1e4
  //                       ) / 1e4
  //                     } ${el.leasing_price_per_second_currency_name} p/m`}
  //               </div>
  //             </div>
  //           ))
  //         )}
  //       </div>
  //     </div>
  //   ),
  //   [domainList, noResults]
  // );
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
          <div className="grid gap-5 pt-5 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
            {domainList.map((el) => (
              <div key={el.id} className="col-span-1">
                <div className="group relative">
                  <AuthenticatedFragment
                    permission={"listed_domains:update"}
                    owner={el.seller_id}
                  >
                    <Link
                      className="absolute top-2 right-2 z-10 rounded-md bg-white px-6 py-2 text-xs text-black hover:text-black"
                      href={`/marketplace/edit/${el.name}`}
                    >
                      Edit
                    </Link>
                  </AuthenticatedFragment>
                  <div className="gradient-color relative h-[300px]  w-full  overflow-hidden rounded-t-lg">
                    <Image
                      src={
                        el?.category_array.length > 0
                          ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${el?.category_array[0].id}.png`
                          : "/assets/default-cover.png"
                      }
                      alt="categories"
                      className="  self-center object-contain"
                      fill
                    ></Image>
                  </div>
                  <div className=" space-y-2 overflow-hidden rounded-b-xl border border-primary-borderWhite bg-primary-900 text-12">
                    <div className="py-4 px-2">
                      <Link
                        className="text-xl"
                        href={`/marketplace/${el.name}`}
                      >
                        {el.name}
                      </Link>
                      <div className="flex items-start justify-between pt-2">
                        <div className="flex flex-wrap items-start gap-1">
                          {el?.category_array.slice(0, 1)?.map((category) => (
                            <Link
                              key={category.id}
                              className=" rounded-full bg-primary-200 px-4 py-1 text-[10px] font-bold text-white"
                              href={`/marketplace?s=${encodeURIComponent(
                                `{"filters":{"categories":[${category.id}]}}`
                              )}`}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>

                        <span>
                          {" "}
                          {el.price == null
                            ? "-"
                            : `${formatEther(
                                el.price,
                                el.price_currency_decimals
                              )} ${el.price_currency_name}`}
                        </span>
                      </div>
                    </div>
                    <button className="btn-lg absolute bottom-0 h-8 w-full max-w-full rounded-t-none rounded-b-xl text-12 opacity-0 transition-all group-hover:opacity-100 group-hover:transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    [domainList, noResults]
  );

  return (
    <>
      <div className="container">
        <div className="section-center">
          <h2 className="heading-1 text-center">
            Web3 {initialState?.domainType == "tld" ? "TLDs" : "Domains"}{" "}
            Marketplace
          </h2>
          <h2 className="pt-5 text-center text-xl">
            {initialState?.domainType == "tld"
              ? "Buy or Sell"
              : "Buy, Sell or Rent"}
          </h2>
        </div>

        <Link
          className="flex-center ml-auto h-[56px] w-full max-w-[300px] gap-4 rounded-xl border border-primary-borderWhite bg-black text-20"
          href={
            initialState?.domainType == "tld"
              ? "/marketplace"
              : "/marketplace/tlds"
          }
        >
          <span>{reactIcons.power}</span>{" "}
          {initialState?.domainType == "tld"
            ? "Switch to Domain"
            : "Switch to TLDs"}
        </Link>

        <div className="flex items-start gap-2 pt-[50px] text-20">
          <div className="w-[250px] space-y-5 rounded-xl border border-primary-borderWhite py-5 px-2">
            {sidebar.map((item, index) => (
              <div key={index} className="relative">
                <div className="peer relative flex h-[30px] cursor-pointer items-center">
                  <span> {item.name}</span>
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
                        onClick={(e) => onBooleanFilter(e, "leaseNowListing")}
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
                  <div className="gradient-color absolute z-[100] hidden w-96 flex-col rounded hover:flex peer-hover:flex">
                    <div className="w-full px-4 py-4 text-left">
                      <select
                        name="Price"
                        id="Price-range"
                        value={
                          searchParams.filters?.priceRange?.currencyId || ""
                        }
                        onChange={(e) => onPriceRangeChange(e, "currencyId")}
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
                  <div className="gradient-color absolute z-[100] hidden w-96 flex-col rounded px-4 py-4 text-white hover:flex peer-hover:flex">
                    <p>Characters</p>
                    <div className="mt-2 flex w-full gap-2 text-left">
                      <input
                        value={searchParams.filters?.domainLength?.min || ""}
                        type="number"
                        placeholder="1"
                        onInput={(e) => onDomainLengthChange(e, "min")}
                        className="bg-gray w-1/2 rounded p-2 text-black"
                        onKeyUp={onEnterPress}
                      />
                      <span className="my-auto">to</span>
                      <input
                        value={searchParams.filters?.domainLength?.max || ""}
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
                        onClick={(e) => onBooleanFilter(e, "excludeHyphens")}
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
                        onClick={(e) => onBooleanFilter(e, "excludeNumerals")}
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
                  <div className="gradient-color absolute z-[100] hidden max-h-96 flex-col overflow-y-auto rounded  text-white hover:flex peer-hover:flex">
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
                            onChange={(e) => onChangeCategory(e, category.id)}
                            className="mr-2"
                          />
                          <label
                            htmlFor={category.name}
                            className="font-brand-freename cursor-default text-16"
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
          <div className="flex-1">
            <div className="flex items-center justify-between gap-5">
              <div className="relative w-full max-w-[650px] flex-1 ">
                <input
                  type="text"
                  name="Search"
                  id="Search"
                  className="input-field p-1 pr-[30%] pl-2"
                  placeholder={
                    initialState?.domainType == "tld"
                      ? "Find TLDs"
                      : "Find Domains"
                  }
                  value={searchParams.keyword || ""}
                  onKeyUp={onEnterPress}
                  onInput={onKeywordChange}
                />
                <button
                  id="searchBtn"
                  type="submit"
                  onClick={searchClickHandler}
                  className="btn-lg ay-center right-[2px] h-[52px] rounded-[10px] text-[17px]"
                >
                  Search
                </button>
              </div>
              <div className="relative">
                <div className="flex-center peer h-[57px] min-w-[140px]  cursor-pointer whitespace-nowrap rounded-xl border border-primary-borderWhite py-1 px-4 pr-6">
                  {searchParams.sortByLabel || "Sort"}
                  <span className="ay-center right-1">
                    {reactIcons.dropdown}
                  </span>
                </div>
                <div className="gradient-color absolute top-[55px] right-0 z-[100] hidden w-96 flex-col  rounded p-3  text-white hover:flex peer-hover:flex">
                  {sortItems.map((sortItem) => (
                    <a
                      className="py-3 text-lg hover:opacity-70"
                      key={sortItem.key}
                      onClick={(e) => clickSortButton(sortItem)}
                    >
                      {sortItem.label}
                    </a>
                  ))}
                </div>
              </div>
              {domainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex-center h-[57px] min-w-[160px] whitespace-nowrap  rounded-xl border border-primary-borderWhite px-4 py-1  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {domainCards}

            {/* <div className="mt-4">{domainTable}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
