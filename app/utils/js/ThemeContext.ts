import { createContext } from "react"

export type Ttheme = "light" | "dark"

type Tstate = {
    theme: Ttheme
}

type Taction = {
    theme: Ttheme
    type: string
}

const ThemeReducer = (state: Tstate, action: Taction) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, theme: action.theme }
        default:
            return state
    }
}

export default createContext({
    state: { theme: "dark" },
    dispatch: (p0: { type: string; theme: Ttheme }) => null,
})

export { ThemeReducer }
