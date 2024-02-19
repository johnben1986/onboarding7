import { Card, List } from "antd";
import Title from "antd/lib/typography/Title";
import Link from "next/link";
import styles from "./TopDomains.module.scss";
import getData from "../mock_data";
import { useAPI } from "../../hooks/useAPI";
import React, { useState, useEffect, useRef } from "react";

function randomN(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) n = len;
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export default function TopDomains() {
  const { api } = useAPI();
  const [domainList, setDomainList] = useState([]);
  async function getDomains() {
    const response = await api.getDomains({});
    setDomainList(response.result);
    
  }

  useEffect(() => {
    getDomains();
  }, []);
  return (
    <div className={styles.categoriesContainer}>
      {[
        {
          title: "Top Web2 Domains",
          domains: randomN(getData().web2, 8),
          isWeb2: true,
        },
        {
          title: "Top Web3 Domains",
          domains: randomN(domainList, 8),
        },
        {
          title: "Top Crypto Domains",
          domains: randomN(domainList, 8),
        },
      ].map((category) => (
        <Card
          title={<Title level={3}>{category.title}</Title>}
          bodyStyle={{ paddingTop: "0", paddingBottom: "0" }}
          className={styles.category}
          key={category.title}
        >
          <List>
            {category.domains.map((domain) => (
              <List.Item className={styles.domainRow} key={domain.id || domain}>
                <div className={styles.domainTitle}>
                  {domain.name || domain}
                </div>
                <div className={styles.domainBuyButton}>
                  {category.isWeb2 ? (
                    <a
                      href={`https://uk.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domain}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy
                    </a>
                  ) : (
                    <Link href={`marketplace/${domain.name}`}>Buy</Link>
                  )}
                </div>
              </List.Item>
            ))}
          </List>
        </Card>
      ))}
    </div>
  );
}
