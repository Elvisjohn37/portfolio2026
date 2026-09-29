import { Box, Tab, Tabs } from "@mui/material"
import { useState, SyntheticEvent } from "react"
import dynamic from "next/dynamic"
import Loader from "./Loader"

// Better loading fallback (prevents layout shift)
const FrontendTechStack = dynamic(() => import("./FrontendTechStack"), {
    loading: () => <Loader />,
})

const BackendTechStack = dynamic(() => import("./BackendTechStack"), {
    loading: () => <Loader />,
})

const ToolsTechStack = dynamic(() => import("./ToolsTechStack"), {
    loading: () => <Loader />,
})

const TABS = [
    { label: "Frontend", Component: FrontendTechStack },
    { label: "Backend", Component: BackendTechStack },
    { label: "Tools", Component: ToolsTechStack },
]

const TechStacks = () => {
    const [value, setValue] = useState(0)

    // Track visited tabs (prevents remount lag)
    const [mountedTabs, setMountedTabs] = useState([0])

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue)

        if (!mountedTabs.includes(newValue))
            setMountedTabs((prev) => [...prev, newValue])
    }

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                {TABS.map((tab, index) => (
                    <Tab
                        key={tab.label}
                        label={tab.label}
                        id={`tab-${index}`}
                        aria-controls={`tabpanel-${index}`}
                    />
                ))}
            </Tabs>

            {TABS.map(({ Component }, index) => {
                const isActive = value === index
                const isMounted = mountedTabs.includes(index)

                if (!isMounted) return null

                return (
                    <Box
                        key={index}
                        role="tabpanel"
                        hidden={!isActive}
                        id={`tabpanel-${index}`}
                        aria-labelledby={`tab-${index}`}
                    >
                        <Box className="min-h-80 relative">
                            <Component />
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}

export default TechStacks