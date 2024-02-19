import styles from "./ViewCategoryPage.module.scss";
import { Card } from "antd";
import { useAPI } from "../../hooks/useAPI";
import React, { useState, useEffect } from "react";
import { setTitle } from "helpers/utils";
import Image from "next/image";

export default function ViewCategoryPage({ categoryId }) {
  const { api } = useAPI();

  const [category, setCategory] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchCategoryId = async () => {
      const res = await api.getCategory({ id: categoryId });
      setCategory({
        name: res.result[0].name,
      });
      setTitle(res.result[0].name);
    };

    fetchCategoryId();
  }, [api]);

  return (
    <>
      <div className={styles.categoryPage}>
        <div className={styles.leftColumn}>
          <img
            className={styles.categoryImage}
            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${categoryId}.png`}
            onError="this.onerror=null;this.src='https://via.placeholder.com/300';"
            alt="category"
          ></img>
        </div>
        <div className={styles.rightColumn}>
          <Card className={styles.categoryTitle}>{category.name}</Card>
          <Card title="Description" className={styles.descriptionCard}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
            elementum dignissim. Nunc mollis eros non odio aliquam varius.
            Pellentesque pulvinar, purus nec luctus auctor, nunc nunc congue
            diam, sed tempus nibh arcu blandit ante. Fusce dui libero, mattis id
            tellus a, fermentum efficitur magna. Mauris et elit risus. Integer
            venenatis ante porta dui dignissim, vitae mollis odio luctus. Nulla
            tincidunt a ante quis vehicula. Nulla vulputate congue enim vel
            auctor.
          </Card>
          <Card>
            Link to all the domains of this category: <a href="/home">click here</a>
            .
          </Card>
        </div>
      </div>
    </>
  );
}
