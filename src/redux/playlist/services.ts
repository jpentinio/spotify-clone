import axios from "axios";

class Services {
  static async getUserPlaylist() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
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

  static async getPlaylist(id: string) {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}?market=PH&fields=name,id,images,owner(display_name,id),public,tracks, description, type, uri`,
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
