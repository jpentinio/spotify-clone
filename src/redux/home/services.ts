import axios from "axios";

class Services {
  static async getRecentlyPlayedTracks() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/me/player/recently-played?limit=12`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      return response;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }

  static async getNewAlbumReleases() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/browse/new-releases?country=PH&limit=12`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      return response;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
}

export default Services;
