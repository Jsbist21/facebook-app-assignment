import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState({});
  const [since, setSince] = useState("2023-11-01");
  const [until, setUntil] = useState("2023-12-31");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateDateRange = (since, until) => {
    const sinceDate = new Date(since);
    const untilDate = new Date(until);
    const diffTime = Math.abs(untilDate - sinceDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90;
  };

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);

      if (!validateDateRange(since, until)) {
        setError("The date range cannot be more than 90 days.");
        setLoading(false);
        return;
      }

      try {
        const result = await axios.get(
          `https://graph.facebook.com/${pageId}/insights`,
          {
            params: {
              metric:
                "page_follows,page_post_engagements,page_impressions,page_actions_post_reactions_like_total",
              since,
              until,
              period: "day",
              access_token: accessToken,
            },
          }
        );

        const data = result.data.data.reduce((acc, item) => {
          acc[item.name] = item.values[0].value;
          return acc;
        }, {});

        setInsights(data);
      } catch (error) {
        console.error(
          "Error fetching insights:",
          error.response?.data || error.message
        );
        setError("Failed to fetch insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchInsights();
    }
  }, [pageId, accessToken, since, until]);

  return (
    <div className="max-w-2xl mx-auto p-4 m-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-700">Since:</label>
        <input
          type="date"
          value={since}
          onChange={(e) => setSince(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-700">Until:</label>
        <input
          type="date"
          value={until}
          onChange={(e) => setUntil(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      {loading && <div className="text-blue-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-100 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Total Followers / Fans</h3>
            <div>{insights.page_follows}</div>
          </div>
          <div className="bg-green-100 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Total Engagement</h3>
            <div>{insights.page_post_engagements}</div>
          </div>
          <div className="bg-yellow-100 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Total Impressions</h3>
            <div>{insights.page_impressions}</div>
          </div>
          <div className="bg-pink-100 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Total Reactions</h3>
            <div>{insights.page_actions_post_reactions_like_total}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
