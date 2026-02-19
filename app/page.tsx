import GitHubIcon from "@mui/icons-material/GitHub"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import EmailIcon from "@mui/icons-material/Email"
import TelegramIcon from "@mui/icons-material/Telegram"
import { Grow, IconButton, Tooltip, Typography, Zoom } from "@mui/material"
import Image from "next/image"

const Home = () => {
    return (
        <div className="flex justify-center home">
            <div className="flex flex-row lg:w-5xl">
                <div className="flex w-full flex-col gap-2 justify-center">
                    <Grow in={true} timeout={1000}>
                        <Typography>Hi, I'm Elvis John Cayetano</Typography>
                    </Grow>
                    <Grow in={true} timeout={2000}>
                        <Typography className="job-title text-primary-text-accent">
                            Senior Web Developer
                        </Typography>
                    </Grow>
                    <Grow in={true} timeout={3000}>
                        <Typography>
                            Norem Epsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </Typography>
                    </Grow>
                    <div className="flex gap-2">
                        <Grow in={true} timeout={4000}>
                            <div>
                                <Tooltip
                                    placement="top"
                                    slots={{
                                        transition: Zoom,
                                    }}
                                    arrow
                                    title="Github"
                                >
                                    <IconButton className="icon-button">
                                        <GitHubIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grow>
                        <Grow in={true} timeout={5000}>
                            <div>
                                <Tooltip
                                    placement="top"
                                    slots={{
                                        transition: Zoom,
                                    }}
                                    arrow
                                    title="Whats App"
                                >
                                    <IconButton className="icon-button">
                                        <WhatsAppIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grow>
                        <Grow in={true} timeout={6000}>
                            <div>
                                <Tooltip
                                    placement="top"
                                    slots={{
                                        transition: Zoom,
                                    }}
                                    arrow
                                    title="Gmail"
                                >
                                    <IconButton className="icon-button">
                                        <EmailIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grow>
                        <Grow in={true} timeout={7000}>
                            <div>
                                <Tooltip
                                    placement="top"
                                    slots={{
                                        transition: Zoom,
                                    }}
                                    arrow
                                    title="Telegram"
                                >
                                    <IconButton className="icon-button">
                                        <TelegramIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grow>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center">
                    <Grow in={true} timeout={1000}>
                        <div className="w-1/2 rounded-sm overflow-hidden">
                            <Image
                                src="/profile-pic.jpg"
                                width={1092}
                                height={1400}
                                alt="profile-image"
                            />
                        </div>
                    </Grow>
                </div>
            </div>
        </div>
    )
}

export default Home
