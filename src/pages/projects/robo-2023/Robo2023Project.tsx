import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function Robo2023Project(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'FRC 2023 Robot'}
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

const Robo2023Data: ProjectBlurb = {
    id: 'robo-2023',
    projPage: makeGenericProject(Robo2023Project),
    title: 'Lucy',

    image: '/projects/robo-2023/banner.jpg',
    blurb: (
        <>
            <p>
                Lucy was the robot FRC team 321 created for the 2023 season of FRC, Charged Up, where robots were tasked
                with scoring cones and cubes onto a set area. The software, programmed in Java, featured a custom
                library for planning autonomous paths, various setpoints and modes for scoring the game pieces.
            </p>

            <a href='https://github.com/RoboLancers/FRC-Main-2023'>View the Project</a>
        </>
    ),
};

export default Robo2023Data;
