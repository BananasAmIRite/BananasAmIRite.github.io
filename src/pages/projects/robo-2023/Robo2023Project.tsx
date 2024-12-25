import GenericProjectPage from '../../../components/project/GenericProjectPage';
import PictureCarousel from '../../../components/project/PictureCarousel';
import ProjectDetails, {
    ProjectDetailsBody,
    ProjectDetailsContainer,
    ProjectDetailsTitle,
} from '../../../components/project/ProjectDetails';
import ProjectSection, { ProjectSectionBody, ProjectSectionTitle } from '../../../components/project/ProjectSection';

export default function Robo2023Project(props: { onExit: () => void; key: string }) {
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
