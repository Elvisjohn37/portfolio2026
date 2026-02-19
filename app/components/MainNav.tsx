import Link from "next/link"

const MainNav = () => {
    return (
        <nav className="flex justify-between px-5 bg-primary items-center">
            <div className="brand">LVS</div>
            <div className="navigation">
                <ul className="ul">
                    <li>
                        <Link className="link" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="link" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="link" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="link" href="/">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainNav
