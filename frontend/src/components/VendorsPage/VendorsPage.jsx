import styles from "./VendorsPage.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { useAPI } from "../../hooks/useAPI";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import Link from "next/link";
import { setTitle } from "helpers/utils";

export default function VendorsPage() {
  const { api } = useAPI();
  const [vendorsList, setVendorsList] = useState([]);

  const tableEl = useRef(null);

  useEffect(() => {
    setTitle("Vendors");
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const res = await api.getVendorsAndAUM();
      setVendorsList(res);
    };
    getUsers();
  }, [api]);

  return (
    <div className='min-h-screen overflow-y-auto bg-image3  lg:flex'>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Wallet</th>
              <th>AUM</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendorsList.map((user) => (
              <tr key={user.id}>
                <td>{user.id == user.name ? "" : user.name}</td>
                <td className={styles.wallet}>{user.id}</td>
                <td className="text-right font-mono">${user.aum.toFixed(2)}</td>
                <td>
                  <Link className={styles.button} href={`/users/${user.id}`}>
                    View
                  </Link>{" "}
                  <AuthenticatedFragment
                    permission={"users:update"}
                    owner={user.seller_id}
                  >
                    <Link
                      className={styles.button}
                      href={`/users/${user.id}/edit`}
                    >
                      Edit
                    </Link>
                  </AuthenticatedFragment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        Total AUM: $
        {vendorsList.reduce((acc, user) => acc + user.aum, 0).toFixed(2)}
      </div>
    </div>
  );
}
