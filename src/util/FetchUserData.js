import axios from "axios";

const fetchUserData = async (accessToken) => {
  try {
    const response = await axios.get("https://graph.facebook.com/v20.0/me", {
      params: {
        fields: "id,name,picture",
        access_token: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export default fetchUserData;
