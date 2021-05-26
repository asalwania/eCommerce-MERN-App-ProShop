import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {data} = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: {data},
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const listProducts = () => {
//   return (dispatch) => {
//     dispatch({ type: PRODUCT_LIST_REQUEST });
//     axios
//       .get("https://api.github.com/users")
//       .then((res) => {
//         const users = res.data;
//         dispatch({
//           type: PRODUCT_LIST_SUCCESS,
//           payload: users,
//         });
//       })
//       .catch((err) => {
//         dispatch({
//       type: PRODUCT_LIST_FAIL,
//       payload:
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message,
//     })
//       });
//   };
// };
