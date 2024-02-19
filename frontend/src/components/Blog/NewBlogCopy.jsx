import { useAPI } from "../../hooks/useAPI";
import React, { useEffect, useState, useRef } from "react";
import AuthenticatedPage from "components/Authenticated/AuthenticatedPage";
import { setTitle } from "helpers/utils";
import Datepicker from "react-tailwindcss-datepicker";
import { Tag, Tooltip, message, AutoComplete } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "../utils/ReactQuill";
import { useRouter } from "next/router";

const NewBlog = ({ editBlogSlug }) => {
  const { api } = useAPI();
  const router = useRouter();

  const maxTags = 3;

  const [blog, setBlog] = useState({
    title: "",
    preview_text: "",
    created_at: null,
  });
  const [datePickerTime, setDatePickerTime] = useState();
  const [tags, setTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const fetchData = async () => {
    const categories = await api.getCategories();
    setAllCategories(categories.result);
    let categoryIds = [];

    if (editBlogSlug) {
      const response = await api.getPostDetails({ slug: editBlogSlug });

      setBlog(response);
      const createdAt = new Date(response.created_at)
        .toISOString()
        .substring(0, 10);
      setDatePickerTime({
        startDate: createdAt,
        endDate: createdAt,
      });
      categoryIds =
        response.category_array.map((category) => category.id) || [];
      setTags(categoryIds);
    }
    const filteredOptions = categories.result
      .filter((category) => !categoryIds.includes(category.id))
      .map((category) => ({
        value: category.name,
        id: category.id,
      }));
    setOptions(filteredOptions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setCategory = (newCategory) => {
    setTags([...tags, newCategory.id]);
    setOptions(options.filter((option) => option.value !== newCategory.name));
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

  const handleInputChange = (value) => {
    setInputValue(value.toLowerCase());
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const removeCategoryTag = (removedTag, e) => {
    e.preventDefault();
    const newTags = tags.filter((tag) => tag !== removedTag);
    const removedCategoryName = allCategories.find(
      (category) => category.id === removedTag,
    ).name;
    setOptions([...options, { id: removedTag, value: removedCategoryName }]);
    setTags(newTags);
  };
  const generateSlug = (e) => {
    const generatedSlug = e.target.value
      .toLowerCase()
      .replaceAll(/\s+/g, "-")
      .replaceAll(/[^a-z0-9-]/g, "");
    setBlog({ ...blog, slug: generatedSlug, title: e.target.value });
  };
  const checkSlug = (e) => {
    if (e.target.value.match(/[^a-z0-9-]/g)) {
      return;
    }
    setBlog({ ...blog, slug: e.target.value });
  };

  const createBlogPost = async () => {
    await api.createOrUpdateBlogPost({
      ...blog,
      category_ids: tags,
    });

    router.push("/blog");
  };

  const handleCreatedAtChange = (newValue) => {
    setDatePickerTime(newValue);
    setBlog({
      ...blog,
      created_at: new Date(newValue.startDate + " UTC ").toISOString(),
    });
  };

  return (
    <AuthenticatedPage
      permission="blog_posts:insert"
      render={({ currentAddress, disconnectWallet }) => (
        <>
          <div className="mx-auto w-3/5 space-y-3 pb-24 font-brand-tomorrow text-lg text-black">
            <h1 className="mb-10 text-center font-brand-heading text-3xl">
              {blog.id ? "Edit" : "Create"} Blog Post
            </h1>
            <div className="flex flex-row">
              <label className="mr-5 w-32">Heading: </label>
              <input
                placeholder="Heading"
                onChange={generateSlug}
                value={blog.title}
                className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              ></input>
            </div>
            <div className="flex flex-row">
              <label className="mr-5 w-32">Url: </label>
              <input
                placeholder="URL"
                onChange={checkSlug}
                value={blog.slug}
                className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              ></input>
            </div>
            <ReactQuill
              value={blog.content}
              onChange={(content) =>
                setBlog((state) => ({ ...state, content }))
              }
            />
            <div>
              {tags.map((tag) => {
                const tagName = allCategories.find(
                  (category) => category.id === tag,
                ).name;
                const isLongTag = tagName.length > 20;
                const tagElem = (
                  <Tag
                    className="pb-1"
                    key={tag}
                    closable
                    onClose={(e) => removeCategoryTag(tag, e)}
                  >
                    <span>
                      {isLongTag ? `${tagName.slice(0, 20)}...` : tagName}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
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
                <Tag className="text-md pb-1" onClick={showInput}>
                  <PlusOutlined /> New Category
                </Tag>
              )}
            </div>
            <div className="flex flex-row">
              <label className="mr-5 w-32 break-keep">Created at: </label>
              <Datepicker
                useRange={false}
                readOnly={true}
                asSingle={true}
                displayFormat={"YYYY-MM-DD"}
                value={datePickerTime}
                onChange={handleCreatedAtChange}
              />
            </div>
            <div className="flex flex-row">
              <label className="mr-5 w-32 break-keep">Preview Text: </label>
              <input
                placeholder="Preview Text"
                value={blog.preview_text}
                onChange={(e) =>
                  setBlog({ ...blog, preview_text: e.target.value })
                }
                className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              ></input>
            </div>
            <button
              className="bg-brand-500 text-brand-50 mt-0 inline-block px-5 py-3 font-brand-tomorrow text-lg"
              onClick={createBlogPost}
            >
              {blog.id ? "Edit" : "Create"}
            </button>
          </div>
        </>
      )}
    />
  );
};

export default NewBlog;
