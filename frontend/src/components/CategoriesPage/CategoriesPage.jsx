import Button from "../utils/Button";
import React, { useState, useEffect } from "react";
import { useAPI } from "../../hooks/useAPI";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import Image from "next/image";
import Link from "next/link";

const CategoriesPage = () => {
  useEffect(() => {
    document.title = "Categories";
  }, []);

  const { api } = useAPI();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.getCategories({});
      setCategoryList(
        response.result.sort((a, b) => a.name.localeCompare(b.name)),
      );       
    }

    fetchCategories();
  }, [api]);

  return (
    <>
      <h1 className="text-center font-brand-heading text-3xl text-black">
        Domain Categories
      </h1>

      <div className="mx-auto mt-16 flex w-10/12 flex-wrap justify-center gap-4">
        {categoryList.map((category) => (
          <div
            className="from-brand-darker-blue to-brand-blue mb-8 h-96 w-72 rounded-full bg-gradient-to-b text-center"
            key={category.id}
          >
            <Image
              className=""
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${category.id}.png`}
              alt={category.name}
              loading="lazy"
              width={300}
              height={300}
            />
            <div className="mx-4 flex justify-center gap-2">
              <Button
                href={`/marketplace?s=%7B"filters"%3A%7B"categories"%3A%5B${category.id}%5D%7D%7D`}
              >
                Browse
              </Button>
              <AuthenticatedFragment permission={"categories:update"}>
                <Link href={`/editcategory/${category.id}`}>
                  <Button>✏️</Button>
                </Link>
              </AuthenticatedFragment>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesPage;
