import GenericProjectPage, { makeGenericProject, ProjectTextBlock } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function SphinxProject(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'Sphinx'}
            image={'/projects/sphinx/sphinx.jpg'}
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
                        title='Role'
                        blurb='Controls and primary flight software'
                    />
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
                        title='System'
                        blurb='Autonomous VTOL lander'
                    />
                </ProjectDetailsContainer>
            }
            sections={
                <>
                    <ProjectTextBlock title='Control Algorithms'>
                        <p>
                            Sphinx uses flight-control algorithms to keep the vehicle stable and controllable while
                            hovering and navigating.
                        </p>
                    </ProjectTextBlock>
                    <ProjectTextBlock title='State Estimation and Filters'>
                        <p>
                            This section is ready for the sensor-fusion and filtering details, including the signals,
                            assumptions, and tuning that make the onboard state estimate reliable.
                        </p>
                    </ProjectTextBlock>
                </>
            }
        >
        </GenericProjectPage>
    );
}

const SphinxData: ProjectBlurb = {
    id: 'sphinx',
    title: 'Sphinx',

    image: '/projects/sphinx/sphinx.jpg',
    blurb: (
        <>
            <p>
                As part of MIT Rocket Team, I developed the controls algorithms and the primary flight software for a vertical-takeoff vertical-landing propeller-powered lander, Sphinx. It is capable of propelling itself and controllably hovering with a set of contra-rotating propellers on a 10-degree gimbal while autonomously navigating using an onboard GPS module. 
            </p>
            {/* <a href='https://github.com/BananasAmIRite/'>See more of Rocket Team</a> */}
        </>
    ),
    projPage: makeGenericProject(SphinxProject),
    allowReadMore: false
};

export default SphinxData;
