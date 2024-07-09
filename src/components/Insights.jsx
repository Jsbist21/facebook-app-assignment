import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
const Insights = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState({});
  const [since, setSince] = useState("2023-01-01");
  const [until, setUntil] = useState("2023-12-31");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(since);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      const formattedSince = moment(since).format("YYYY-MM-DD");
      const formattedUntil = moment(until).format("YYYY-MM-DD");
      try {
        const result = await axios.get(
          `https://graph.facebook.com/${pageId}/insights`,
          {
            params: {
              metric:
                "page_follows,page_post_engagements,page_impressions,post_reactions_by_type_total",
              formattedSince,
              formattedUntil,
              period: "day",
              access_token: accessToken,
            },
          }
        );

        console.log(result);
        const data = result.data.data.reduce((acc, item) => {
          acc[item.name] = item.values[0].value;
          return acc;
        }, {});
        console.log(data);
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
    <div>
      <div>
        <label>Since: </label>
        <input
          type="date"
          value={since}
          onChange={(e) => setSince(e.target.value)}
        />
      </div>
      <div>
        <label>Until: </label>
        <input
          type="date"
          value={until}
          onChange={(e) => setUntil(e.target.value)}
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && (
        <>
          <div>Followers: {insights.page_follows}</div>
          <div>Engagement: {insights.page_post_engagements}</div>
          <div>Impressions: {insights.page_impressions}</div>
          <div>Reactions: {insights.post_reactions_by_type_total}</div>
        </>
      )}
    </div>
  );
};

export default Insights;
