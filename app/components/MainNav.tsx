import Link from "next/link"
import Image from "next/image"

const MainNav = () => (
    <nav className="flex justify-between px-5 bg-secondary items-center fixed w-full z-10 overflow-y-hidden">
        <div className="brand h-10">
            <Link className="link" href="#home">
                <Image
                    className="w-19.5"
                    src="/logo.png"
                    width={78}
                    height={39}
                    alt={"logo"}
                />
            </Link>
        </div>
        <div className="navigation">
            <ul className="ul">
                <li>
                    <Link className="link" href="#home">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="link" href="#about">
                        About
                    </Link>
                </li>
                <li>
                    <Link className="link" href="#projects">
                        Projects
                    </Link>
                </li>
                <li>
                    <Link className="link" href="#contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
)

export default MainNav
