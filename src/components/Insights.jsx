import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState({});
  const [since, setSince] = useState("2023-01-01");
  const [until, setUntil] = useState("2023-12-31");

  useEffect(() => {
    const fetchInsights = async () => {
      const result = await axios.get(
        `https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_total&since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`
      );
      const data = result.data.data.reduce((acc, item) => {
        acc[item.name] = item.values[0].value;
        return acc;
      }, {});
      setInsights(data);
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
      <div>Followers: {insights.page_fans}</div>
      <div>Engagement: {insights.page_engaged_users}</div>
      <div>Impressions: {insights.page_impressions}</div>
      <div>Reactions: {insights.page_actions_post_reactions_total}</div>
    </div>
  );
};

export default Insights;
