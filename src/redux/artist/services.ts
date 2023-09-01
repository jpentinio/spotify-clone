import axios from "axios";

class Services {
  static async getArtistDetails(id: string) {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/artists/${id}`,
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

  static async getArtistTopTracks(id: string) {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=PH`,
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

  static async getUserArtist() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/me/following?type=artist`,
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
