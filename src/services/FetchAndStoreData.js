
import { FetchGet } from "./FetchGet";

// Initial URLs
const FirtUrls = [
  "https://www.swapi.tech/api/people",
  "https://www.swapi.tech/api/planets",
  "https://www.swapi.tech/api/starships",
];

// Store Keys
const dataKeys = ["characters", "planets", "starships"];

// Store actions
const storeKeys = [
  "SET_CHARACTERS",
  "SET_PLANETS",
  "SET_STARSHIPS"
];

export const FetchAndStoreData = async (store, dispatch) => {
  if (store.loading === 0) {

    // Check if dataIndex is in localStorage
    if (localStorage.getItem("dataIndex") && localStorage.getItem("dataIndex") !== "[]") {

      const dataIndex = JSON.parse(localStorage.getItem("dataIndex"));
      // Saves dataIndex in store.
      dispatch({ type: "SET_DATA_INDEX", payload: dataIndex });
      //Upate store loading.
      dispatch({ type: "UPDATE_LOADING", payload: 1 });

      return []
    }

    // Calls first Fetch with choosen urls.
    try {

      const dataIndex = await FetchGet(FirtUrls);

      if (dataIndex && dataIndex.length > 0) {
        // saves first consult at local storage.
        localStorage.setItem("dataIndex", JSON.stringify(dataIndex));
        // saves dataIndex in store.
        dispatch({
          type: "SET_DATA_INDEX",
          payload: dataIndex
        });
        // Update store loading.
        dispatch({ type: "UPDATE_LOADING", payload: 1 });

        return [];
      }

    } catch (error) {

      console.log('Error fetching index data:', error);

    }
    //checks loading
  } else if (store.loading - 1 < FirtUrls.length) {
    // Checks if data is in local storage
    if (!localStorage.getItem(dataKeys[store.loading - 1])) {
      const dataIndex = JSON.parse(localStorage.getItem("dataIndex"));
      const dataUrl = dataIndex[store.loading - 1].map(item => item.url);
      // second fetchs.
      try {
        if (dataUrl && dataUrl.length > 0) {

          const allData = await FetchGet(dataUrl);

          if (allData && allData.length > 0) {
            localStorage.setItem(dataKeys[store.loading - 1], JSON.stringify(allData));
            dispatch({
              type: storeKeys[store.loading - 1],
              payload: allData
            });

            // Update the dispatch loading of page.
            dispatch({ type: "UPDATE_LOADING", payload: store.loading + 1 });

            return [];
          }
        }
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    } else {
      const allData = JSON.parse(localStorage.getItem(dataKeys[store.loading - 1]))
      dispatch({
        type: storeKeys[store.loading - 1],
        payload: allData
      })
      dispatch({ type: "UPDATE_LOADING", payload: store.loading + 1 });
      return [];
    }
  }
}