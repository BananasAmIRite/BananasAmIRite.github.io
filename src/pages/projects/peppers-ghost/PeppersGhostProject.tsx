import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function PeppersGhostProject(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={"Pepper's Ghost Holographic Display"}
            {...props}
            titleChildren={
                <ProjectDetailsContainer
                    style={{
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <ProjectDetails
                        accentColor='var(--bs-gray-600)'
                        style={{
                            height: '200px',
                            width: '200px',
                            color: 'var(--bs-gray-100)',
                        }}
                    >
                        Helllo
                    </ProjectDetails>
                    <ProjectDetails
                        accentColor='var(--bs-gray-600)'
                        style={{
                            height: '200px',
                            width: '200px',
                            color: 'var(--bs-gray-100)',
                        }}
                    >
                        Helllo
                    </ProjectDetails>
                </ProjectDetailsContainer>
            }
        >
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'transparent',
                    // , backgroundColor: 'var(--bs-gray-700)'
                }}
            ></div>
            <ProjectDetailsContainer
                style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'transparent',
                }}
            />
        </GenericProjectPage>
    );
}

const PeppersGhostData: ProjectBlurb = {
    id: 'attd-trkr',
    projPage: makeGenericProject(PeppersGhostProject),
    title: "Pepper's Ghost Display",
    image: '/projects/peppers-ghost/banner.jpg',
    blurb: (
        <>
            <p>
                This is a holographic display inspired by <a href='https://github.com/xanderchinxyz/OpenGhost'>this</a>{' '}
                GitHub project. I developed it to learn more about electronics as well as to spice up my desk setup! It
                currently has numerous features, including but not limited to weather, spotify connection, headphone
                status, a chicken from Stardew Valley, and a calendar view. This is intended to be an ongoing project,
                with me adding whatever features I'd like to see on my desk!
            </p>
            <a href='https://github.com/BananasAmIRite/peppers-ghost-display'>View the Project</a>
        </>
    ),
};

export default PeppersGhostData;
