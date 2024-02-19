import { Form, Input, Tag, Tooltip, message, AutoComplete } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AuthenticatedPage from "../Authenticated/AuthenticatedPage";
import useWallet from "hooks/useWallet";
import { useAPI } from "../../hooks/useAPI";
import { useRouter } from "next/router";
import Button from "components/utils/Button";
import { TfiClose } from "react-icons/tfi";
import { RxPlus } from "react-icons/rx";
const { TextArea } = Input;

const ListDomainPage = ({ editDomainName, addDomainName }) => {
  const maxTags = 3;
  const { api } = useAPI();
  const { currentAddress } = useWallet();

  const [form] = Form.useForm();

  const [domain, setDomain] = useState({
    currency_id: 0,
    description: "",
    list_date: "",
    minimum_offer: "",
    name: "",
    price: "10000",
    seller_id: "",
  });
  const [allCategories, setAllCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [domainName, setDomainName] = useState("");
  const inputRef = useRef(null);
  const [adultCategory, setAdultCategory] = useState(null);
  const [badWords, setBadWords] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const categories = await api.getCategories();
      setAllCategories(categories.result);
      setAdultCategory(
        categories.result.find((category) => category.name === "ADULT"),
      );
      
      let categoryIds = [];
      if (editDomainName) {
        const response = await api.getDomain({ name: editDomainName });
        
        setDomain({ id: response.result[0].id });
        form.setFieldsValue({
          name: response.result[0].name,
          description: response.result[0].description,
          minimum_offer: response.result[0].minimum_offer,
        });
        categoryIds =
          response.result[0].category_array.map((category) => category.id) ||
          [];
        setTags(categoryIds);
      } else {
        if (addDomainName) {
          form.setFieldsValue({
            name: addDomainName,
          });
          setDomainName(addDomainName);
        }
      }
      const filteredOptions = categories.result
        .filter((category) => !categoryIds.includes(category.id))
        .map((category) => ({
          value: category.name,
          id: category.id,
        }));
      setOptions(filteredOptions);

      const siteSettings = await api.getSiteSettings();
      setBadWords(siteSettings.profanity_words);
    };
    fetchData();
  }, [editDomainName, addDomainName, api]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (value) => {
    setInputValue(value.toLowerCase());
  };

  const hasBadWord = (value) => {
    for (const badWord of badWords) {
      if (value.includes(badWord)) {
        return true;
      }
    }

    return false;
  };

  const setCategory = (newCategory) => {
    setTags([...tags, newCategory.id]);
    setOptions(options.filter((option) => option.value !== newCategory.name));
  };

  const handleNameChange = (e) => {
    const name = e.target.value.toLowerCase();

    
    form.setFieldsValue({
      name,
    });

    setDomainName(name);

    if (tags.includes(adultCategory?.id)) {
      return;
    }

    if (hasBadWord(name)) {
      setCategory(adultCategory);
    }
  };

  const addCategoryTag = (selectedValue) => {
    const input = selectedValue || inputValue;
    const newCategory = allCategories.find(
      (category) => category.name === input,
    );
    
    if (!newCategory) {
      message.warning("Please add a valid category!");
    } else {
      setCategory(newCategory);
    }

    setInputVisible(false);
    setInputValue("");
  };

  const removeCategoryTag = (removedTag, e) => {
    e.preventDefault();

    if (removedTag === adultCategory.id && hasBadWord(domainName)) {
      return;
    }

    const newTags = tags.filter((tag) => tag !== removedTag);
    const removedCategoryName = allCategories.find(
      (category) => category.id === removedTag,
    ).name;
    setOptions([...options, { id: removedTag, value: removedCategoryName }]);
    setTags(newTags);
  };
  
  

  const submitDomain = async (values) => {
    let params = {
      name: values.name,
      currency_id: 1,
      description: values.description || "",
      minimum_offer: values.minimum_offer,
      price: 0,
      seller_id: currentAddress,
      category_ids: tags,
    };

    if (!params.category_ids.includes(adultCategory.id)) {
      for (const badWord of badWords) {
        if (params.name.includes(badWord)) {
          params.category_ids.push(adultCategory.id);
          break;
        }
      }
    }

    if (editDomainName) {
      await api.updateDomain({ id: domain.id, ...params });
      message.success("The domain has successfully been modified!");
      router.push(`/marketplace/${editDomainName}`);
    } else {
      try {
        const id = await api.addDomain(params);
        message.success("New domain successfully added!");
        router.push(`/marketplace/${params.name}`);
      } catch (e) {
        console.error(e);
        message.error(e.message);
      }
    }
  };

  const handleDeleteDomain = async (values) => {
    await api.deleteDomain({ id: domain.id });
    message.success("The domain has successfully been deleted!");
    router.push(`/marketplace`);
  };

  return (
    <AuthenticatedPage title="List a domain">
      <main className="bg-image4 py-6">
      <div className="m-auto flex max-w-4xl items-center justify-between">
        <h1 className="text-center text-3xl text-white">List Domain</h1>
        <Button href="/marketplace/bulk-upload">Bulk upload tool</Button>
      </div>
      <div className="mx-auto my-12 max-w-4xl">
        <Form
          className="bg-primary-newBgColor/40 border-2 border-white rounded-xl p-4"
          name="basic"
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={submitDomain}
          
        >
          <Form.Item
            label={<label className="text-lg text-white">Domain name</label>}
            name="name"
            onChange={handleNameChange}
            rules={[
              {
                required: true,
                message: "Please specify the domain name you want to list",
              },
              
              
              
              
              
            ]}
          >
            <Input disabled={editDomainName} className="bg-white" />
          </Form.Item>
          <Form.Item
            label={<label className="text-lg text-white">Description</label>}
            name="description"
          >
            <TextArea
              maxLength={500}
              style={{
                height: 300,
              }}
              className="bg-white"
            />
          </Form.Item>

          <Form.Item
            label={<label className="text-lg text-white">Categories</label>}
            name="categories"
            
            
            
            
            
            
          >
            <>
              {tags.map((tag) => {
                const tagName = allCategories.find(
                  (category) => category.id === tag,
                ).name;
                const isLongTag = tagName.length > 20;
                const tagElem = (
                  <Tag
                    className="mb-2 cursor-pointer rounded border-none bg-brand-primary 
                    py-2.5 px-4 text-left font-brand-tomorrow text-lg text-white"
                    key={tag}
                    closable
                    closeIcon={
                      <TfiClose className="ml-1 inline pb-1 text-base text-white" />
                    }
                    onClose={(e) => removeCategoryTag(tag, e)}
                  >
                    <span>
                      {isLongTag ? `${tagName.slice(0, 20)}...` : tagName}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip className="text-xl" title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <>
                  <AutoComplete
                    autoFocus={true}
                    defaultActiveFirstOption={true}
                    onKeyDown={(e) =>
                      e.key == "Enter" || e.key == "Tab"
                        ? e.preventDefault()
                        : ""
                    }
                    ref={inputRef}
                    value={inputValue}
                    style={{
                      width: 200,
                    }}
                    options={options.sort((a, b) =>
                      a.value.localeCompare(b.value),
                    )}
                    filterOption={(value, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(value.toUpperCase()) !== -1
                    }
                    onChange={handleInputChange}
                    onBlur={() => addCategoryTag(inputValue)}
                    onSelect={addCategoryTag}
                    open={true}
                  />
                </>
              )}
              {!inputVisible && tags.length < maxTags && (
                <Tag
                  className="mb-2 cursor-pointer rounded border-none bg-brand-primary 
                  py-2.5 px-4 text-left font-brand-tomorrow text-lg text-white"
                  onClick={showInput}
                >
                  <RxPlus className="inline" /> New Category
                </Tag>
              )}
            </>
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {editDomainName ? (
              <Button type="danger" onClick={handleDeleteDomain}>
                Delete
              </Button>
            ) : (
              <></>
            )}
          </Form.Item>
        </Form>
      </div>
      </main>
    </AuthenticatedPage>
  );
};

export default ListDomainPage;
