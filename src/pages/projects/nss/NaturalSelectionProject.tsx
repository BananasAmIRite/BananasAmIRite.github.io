import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function NaturalSelectionProject(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'Natural Selection Simulation'}
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
                            borderRadius: '10px',
                            padding: '5px',
                            color: 'var(--bs-gray-100)',
                            width: '200px',
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        Helllo
                    </ProjectDetails>
                    <ProjectDetails
                        accentColor='var(--bs-gray-600)'
                        style={{
                            height: '200px',
                            borderRadius: '10px',
                            padding: '5px',
                            color: 'var(--bs-gray-100)',
                            width: '200px',
                            justifyContent: 'center',
                            display: 'flex',
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
        </GenericProjectPage>
    );
}

const NaturalSelectionData: ProjectBlurb = {
    id: 'nss',
    title: 'Natural Selection Simulation',
    image: '/projects/nss/banner.png',
    blurb: (
        <>
            <p>
                This project is a simple simulation of how traits are optimized through natural selection, inspired by a{' '}
                <a
                    style={{
                        textDecoration: 'underline',
                    }}
                    href={'https://youtu.be/0ZGbIKd0XrM'}
                >
                    video by Primer
                </a>
                . It allows the users to create traits and choose how they affect an individual through an API and then
                play back the simulation at different speeds.
            </p>
            <a href='https://github.com/BananasAmIRite/NaturalSelectionSimulation'>View the Project</a>
        </>
    ),
    projPage: makeGenericProject(NaturalSelectionProject),
};

export default NaturalSelectionData;
