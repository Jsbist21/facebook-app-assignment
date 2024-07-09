import React, { useState, useEffect } from "react";
import axios from "axios";

const Pages = ({ accessToken, setPageId, setPageAccessToken }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const result = await axios.get(
          `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
        );
        setPages(result.data.data);
      } catch (error) {
        console.error(
          "Error fetching pages:",
          error.response?.data || error.message
        );
      }
    };

    fetchPages();
  }, [accessToken]);

  const handlePageChange = async (e) => {
    const selectedPageId = e.target.value;
    setPageId(selectedPageId);

    if (selectedPageId) {
      const selectedPage = pages.find((page) => page.id === selectedPageId);
      if (selectedPage) {
        setPageAccessToken(selectedPage.access_token);
      }
    }
  };

  return (
    <div className="mt-4">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        onChange={handlePageChange}
      >
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
