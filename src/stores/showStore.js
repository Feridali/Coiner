import axios from "axios";
import { create } from "zustand";

const showStore = create((set) => ({
  graphData: [],
  data: {},

  fetchData: async (id) => {
    const [graphRes, dataRes] = await Promise.all([
      await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=121`
      ),

      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
      ),
    ]);

    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-us");
      return {
        Date: date,
        Price: p,
      };
    });
    const data = dataRes.data;

    console.log(dataRes);
    set({ graphData, data });
  },
}));
export default showStore;
