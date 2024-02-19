import React, { useState, useEffect } from "react";
import { useAPI } from "../../hooks/useAPI";
import Button from "components/utils/Button";
import Image from "next/image";

export default function DomainCategories() {
  const { api } = useAPI();
  const [DomainCategoriesList, setDomainCategoriesList] = useState([]);

  useEffect(() => {
    async function getDomains() {
      const response = await api.getFeaturedDomains({ categoriesBatchSize: 3 });
      
      setDomainCategoriesList(response.categories);
    }

    getDomains();

    const interval = setInterval(() => {
      getDomains();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  return (
    <div className="bg-brand-lightgray mt-10 py-10 px-20">
      <div className="text-center font-brand-heading text-3xl text-black">
        <h2>Domain Categories</h2>
      </div>

      <div className="mt-20 flex w-full flex-wrap justify-center gap-40">
        {DomainCategoriesList.map((category) => (
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
            <Button
              href={`/marketplace?s=%7B"filters"%3A%7B"categories"%3A%5B${category.id}%5D%7D%7D`}
            >
              Browse Category
            </Button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button className="font-brand-heading" href="/categories">
          See More
        </Button>
      </div>
    </div>
  );
}
