import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import dynamic from "next/dynamic"
import Loader from "./Loader"

const FrontendTechStack = dynamic(() => import("./FrontendTechStack"), {
    loading: Loader,
})

const BackendTechStack = dynamic(() => import("./BackendTechStack"), {
    loading: Loader,
})

const ToolsTechStack = dynamic(() => import("./ToolsTechStack"), {
    loading: Loader,
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
