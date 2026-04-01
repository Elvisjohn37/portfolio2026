import { DotLoader } from "react-spinners"
import classNames from "classnames"
import { ReactElement } from "react"

export type TLoaderParams = { className?: string }

type TLoader = ({ className }: TLoaderParams) => ReactElement

const Loader: TLoader = ({ className }) => (
    <div
        className={classNames([
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            className,
        ])}
    >
        <DotLoader color="#30374c" />
    </div>
)

export default Loader
