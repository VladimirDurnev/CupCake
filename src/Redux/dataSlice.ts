import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../Redux/store";

interface IDataItem {
    EUR: number;
    RUB: number;
    USD: number;
}

interface IState {
    test: (number | string)[][];
    isLoading: boolean
}

export const fetchFirst = createAsyncThunk("dataSlice/fetchFirst", async () => {
    const response = await fetch("http://localhost:3000/api/v1/first/poll");
    const { rates } = await response.json();

    return (await rates) as IDataItem;
});
export const fetchSecond = createAsyncThunk(
    "dataSlice/fetchSecond",
    async () => {
        const response = await fetch(
            "http://localhost:3000/api/v1/second/poll",
        );
        const { rates } = await response.json();

        return (await rates) as IDataItem;
    },
);
export const fetchThird = createAsyncThunk("dataSlice/fetchThird", async () => {
    const response = await fetch("http://localhost:3000/api/v1/second/poll");
    const { rates } = await response.json();

    return (await rates) as IDataItem;
});

const initialState: IState = {
    test: [
        ["RUB/CUPCAKE"],
        ["USD/CUPCAKE"],
        ["EUR/CUPCAKE"],
        ["RUB/USD"],
        ["RUB/EUR"],
        ["EUR/USD"],
    ],
    isLoading: true
};

export const counterSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers: {
        setRubUsd: (state) => {
            state.test[3] = state.test[0].map((item, index) =>
                typeof item === "number"
                    ? item / Number(state.test[1][index])
                    : "RUB/USD",
            );
        },
        setRubEur: (state) => {
            state.test[4] = state.test[0].map((item, index) =>
                typeof item === "number"
                    ? item / Number(state.test[2][index])
                    : "RUB/EUR",
            );
        },
        setEurUsd: (state) => {
            state.test[5] = state.test[2].map((item, index) =>
                typeof item === "number"
                    ? item / Number(state.test[1][index])
                    : "EUR/USD",
            );
        },
        setIsLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchFirst.fulfilled,
            (state, action: PayloadAction<IDataItem>) => {
                const { RUB, USD, EUR } = action.payload;
                state.test[0][1] = RUB;
                state.test[1][1] = USD;
                state.test[2][1] = EUR;
            },
        );
        builder.addCase(fetchFirst.rejected, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(fetchSecond.fulfilled, (state, action) => {
            const { RUB, USD, EUR } = action.payload;
            state.test[0][2] = RUB;
            state.test[1][2] = USD;
            state.test[2][2] = EUR;
        });
        builder.addCase(fetchSecond.rejected, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(fetchThird.fulfilled, (state, action) => {
            const { RUB, USD, EUR } = action.payload;
            state.test[0][3] = RUB;
            state.test[1][3] = USD;
            state.test[2][3] = EUR;
        });
        builder.addCase(fetchThird.rejected, (state, action) => {
            console.log(action.payload);
        });
    },
});

export const { setRubUsd, setRubEur, setEurUsd, setIsLoading } = counterSlice.actions;

export const selectData = (state: RootState) => state.dataSlice;

export default counterSlice.reducer;
