import axios from "axios";

class Services {
  static async getCurrentPlayingTrack() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing`,
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
