import React, { useEffect } from "react";
import { setTitle } from "helpers/utils";
import DomainFilter from "components/DomainsFilter/DomainFilter";
// import DomainFilterCopy from "components/DomainsFilter/DomainFilterCopy";

const DomainsPage = ({ initialState }) => {
  return (
    <>
      <DomainFilter initialState={initialState} />
      {/* <DomainFilterCopy initialState={initialState} /> */}
    </>
  );
};

export default DomainsPage;
