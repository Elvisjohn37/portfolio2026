import ProjectsDialog from "@/app/components/ProjectsDialog"

const Project = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id

    return <ProjectsDialog id={id} hasParams={true} />
}

export default Project
