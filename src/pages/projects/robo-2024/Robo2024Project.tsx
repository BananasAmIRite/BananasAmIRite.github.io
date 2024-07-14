import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function Robo2024Project(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'FRC 2024 Robot'}
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

const Robo2024Data: ProjectBlurb = {
    id: 'robo-2024',
    title: 'LANCE-A-BOT',

    image: '/projects/robo-2024/banner.jpg',
    blurb: (
        <>
            <p>
                LANCE-A-BOT was the robot FRC team 427 created for the 2024 season of FRC, Crescendo, where robots had
                to score notes (orange foam rings) into different areas. The robot, which uses a swerve drive, features
                multiple autonomous modes that accurately shoots notes and extensive driver-side automation that allows
                drivers to focus on the game rather than the robot.
            </p>
            <a href='https://github.com/RoboLancers/FRC427-Main-2024'>View the Project</a>
        </>
    ),
    projPage: makeGenericProject(Robo2024Project),
};

export default Robo2024Data;
