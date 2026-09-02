import { DotLoader } from "react-spinners"
import classNames from "classnames"
import { ReactElement, useContext } from "react"
import ThemeContext from "../utils/js/ThemeContext"

export type TLoaderParams = { className?: string }

type TLoader = ({ className }: TLoaderParams) => ReactElement

const Loader: TLoader = ({ className }) => {
    const { state } = useContext(ThemeContext)
    const { theme } = state
    return (
        <div
            className={classNames([
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                className,
            ])}
        >
            <DotLoader color={theme === "dark" ? "#58dad2" : "#0d9488"} />
        </div>
    )
}

export default Loader
