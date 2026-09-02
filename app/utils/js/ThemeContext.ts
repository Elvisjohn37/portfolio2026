import { createContext, Dispatch } from "react"

export type Ttheme = "light" | "dark"

export type Tstate = {
    theme: Ttheme
}

export type Taction = {
    theme: Ttheme
    type: string
}

export type ThemeContextValue = {
    state: Tstate
    dispatch: Dispatch<Taction>
}

const ThemeReducer = (state: Tstate, action: Taction): Tstate => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, theme: action.theme }
        default:
            return state
    }
}

const ThemeContext = createContext<ThemeContextValue>({
    state: { theme: "dark" },
    dispatch: () => null,
})

export default ThemeContext
export { ThemeReducer }
