"use client"

import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Home from "./components/Home"

const App = () => (
    <div className="2xl:px-80 xl:px-50 lg:px-30 md:px-20 sm:px-10 px-5 overflow-y-hidden pb-5">
        <Home />
        <About />
        <Projects />
        <Contact />
    </div>
)

export default App
