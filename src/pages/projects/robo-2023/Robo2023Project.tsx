import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import PictureCarousel from '../../../components/project/PictureCarousel';
import ProjectDetails, {
    ProjectDetailsBody,
    ProjectDetailsContainer,
    ProjectDetailsTitle,
} from '../../../components/project/ProjectDetails';
import ProjectSection from '../../../components/project/ProjectSection';
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
                            width: '400px',
                        }}
                    >
                        <ProjectDetailsTitle>Languages/Frameworks Used</ProjectDetailsTitle>
                        <ProjectDetailsBody>
                            Java <br /> WPILib <br /> PathPlanner
                        </ProjectDetailsBody>
                    </ProjectDetails>
                    <ProjectDetails
                        accentColor='var(--bs-gray-600)'
                        style={{
                            height: '200px',
                            width: '200px',
                        }}
                    >
                        Helllo
                    </ProjectDetails>
                </ProjectDetailsContainer>
            }
        >
            <ProjectSection
                style={{
                    backgroundColor: 'var(--bs-gray-800)',
                    color: 'var(--bs-gray-400)',
                }}
            >
                <PictureCarousel
                    style={{ width: '500px', height: '500px' }}
                    images={['/projects/robo-2023/banner.jpg', '/projects/robo-2024/banner.jpg']}
                />
                {/* <ProjectSectionTitle>Test</ProjectSectionTitle>
                <ProjectSectionBody>Lorem ipsum</ProjectSectionBody> */}
            </ProjectSection>
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
