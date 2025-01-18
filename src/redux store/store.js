import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./profileSlice"

const store = configureStore({
    reducer: {
        "profiles": ProfileReducer
    }
})

export default store