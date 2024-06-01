import { createSlice } from "@reduxjs/toolkit"


interface ThemeState {
    theme: string
}

const initialState: ThemeState = {
    theme: 'light'
}

const ThemeToggleAction = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }
    }
})

export const { setTheme } = ThemeToggleAction.actions

export default ThemeToggleAction.reducer