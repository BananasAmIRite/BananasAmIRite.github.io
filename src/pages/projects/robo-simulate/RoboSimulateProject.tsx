import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function RoboSimulateProject(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'Robot Mechanism Visualization'}
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

const RoboSimulateData: ProjectBlurb = {
    id: 'robo-simulate',
    title: 'Mechanism Visualizer',

    image: '/projects/robo-simulate/banner.png',
    blurb: (
        <>
            <p>
                This is a mechanism visualizer made for FTC bots inspired by FRC6328's AdvantageScope application. It
                allows programmers to simulate how their code would affect a mechanism in different states (eg. PID
                changing the arm of a robot) without actually needing a physical mechanism to test on.
            </p>
            <a href='https://github.com/BananasAmIRite/robot-simulation-client'>View the Project</a>
        </>
    ),
    projPage: makeGenericProject(RoboSimulateProject),
};

export default RoboSimulateData;
