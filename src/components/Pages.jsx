import React, { useState, useEffect } from "react";
import axios from "axios";

const Pages = ({ accessToken, setPageId }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const result = await axios.get(
        `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
      );
      setPages(result.data.data);
    };

    fetchPages();
  }, [accessToken]);

  return (
    <div>
      <select onChange={(e) => setPageId(e.target.value)}>
        <option value="">Select a Page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pages;
