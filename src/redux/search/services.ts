import axios from "axios";

class Services {
  static async getSearch(value: string) {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/search?type=album,artist,track,playlist&market=PH&limit=10&q=${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }
}

export default Services;
