import axios from "axios";

class Services {
  static async getGenres() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
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

  static async getTracksByGenre(genre: string) {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&market=PH`,
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
