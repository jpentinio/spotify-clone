import axios from "axios";

class Services {
  static async getAlbum(id: string) {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/albums/${id}`,
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

  static async getUserAlbum() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/me/albums?market=PH`,
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
