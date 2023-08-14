import { createSlice} from "@reduxjs/toolkit";

import { RootState } from 'app/redux/store'


const initialState = {
 
}



const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishList: (state, action: any) => {
            state = action.payload;
            return state;
        },

    }
})


export const selectWishList = (state:RootState) => state.wishlist;

export default wishListSlice;