import { Box, Tab, Tabs } from "@mui/material"
import { useState, SyntheticEvent } from "react"
import dynamic from "next/dynamic"

// Better loading fallback (prevents layout shift)
const FrontendTechStack = dynamic(() => import("./FrontendTechStack"), {
    loading: () => null,
})

const BackendTechStack = dynamic(() => import("./BackendTechStack"), {
    loading: () => null,
})

const ToolsTechStack = dynamic(() => import("./ToolsTechStack"), {
    loading: () => null,
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

        if (!mountedTabs.includes(newValue)) {
            setMountedTabs((prev) => [...prev, newValue])
        }
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange}>
                    {TABS.map((tab, index) => (
                        <Tab
                            key={tab.label}
                            label={tab.label}
                            id={`tab-${index}`}
                            aria-controls={`tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
            </Box>

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
                        sx={{ p: 3 }}
                    >
                        <Box className="min-h-80 relative">
                            <Component />
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default TechStacks
