import { configureStore } from "@reduxjs/toolkit";
import { userReduser } from "./user-slice";

export const store = configureStore({
    reducer: userReduser
})