import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loadState } from "../../../utils/storageManager";

const NavigateToHome = ({ children }) => {
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedState = loadState("storedState");

    if (storedState?.token) {
      setHasToken(true);

      if (storedState?.selectedCompany?.company?.domain) {
        setDomain(storedState.selectedCompany.company.domain);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  if (hasToken && !domain) {
    return <Navigate to="/login/select-company" />;
  }

  if (domain) {
    return <Navigate to={`/${domain}/home`} />;
  }

  return children;
};

export default NavigateToHome;
