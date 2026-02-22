import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import dynamic from "next/dynamic"
import { DotLoader } from "react-spinners"

const Loading = () => (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DotLoader color="#30374c" />
    </div>
)

const FrontendTechStack = dynamic(() => import("./FrontendTechStack"), {
    loading: Loading,
})

const BackendTechStack = dynamic(() => import("./BackendTechStack"), {
    loading: Loading,
})

const ToolsTechStack = dynamic(() => import("./ToolsTechStack"), {
    loading: Loading,
})

type TabPanelProps = {
    children?: React.ReactNode
    index: number
    value: number
}

const TechStacks = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Frontend" {...a11yProps(0)} />
                    <Tab label="Backend" {...a11yProps(1)} />
                    <Tab label="Tools" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div className="min-h-80 relative">
                    <FrontendTechStack />
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="min-h-80 relative">
                    <BackendTechStack />
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className="min-h-80 relative">
                    <ToolsTechStack />
                </div>
            </CustomTabPanel>
        </Box>
    )
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
})

export default TechStacks
