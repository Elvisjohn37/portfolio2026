import Link from "next/link"
import Image from "next/image"

const MainNav = () => {
    return (
        <nav className="flex justify-between px-5 bg-primary items-center fixed w-full z-10 overflow-y-hidden">
            <div className="brand h-[40px]">
                <Image
                    className="w-[78px]"
                    src="/logo.png"
                    width={78}
                    height={39}
                    alt={"logo"}
                />
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
}

export default MainNav
