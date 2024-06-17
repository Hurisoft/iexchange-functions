import axios from "axios";

(async () => {
  const res = await axios.get(
    "https://explorer-api-testnet.morphl2.io/api/v2/addresses/0xB4A71512cf4F3A8f675D2aeC76198D6419D219C7/logs",
    {
      params: {
        // block_number: 1733703,
        index: 0,
        // items_count: 100,
      },
    }
  );

  console.log(res.data);
  
})();
