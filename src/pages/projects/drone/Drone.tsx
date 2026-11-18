import { ProjectTag } from '../../../components/ProjectTag';
import GenericProjectPage, { makeGenericProject, ProjectTextBlock } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function DroneProject(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'Drone'}
            image={'/projects/drone/drone-esc.jpg'}
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
                </ProjectDetailsContainer>
            }
            sections={
                <>
                </>
            }
        >
        </GenericProjectPage>
    );
}

const DroneData: ProjectBlurb = {
    id: 'drone',
    title: 'Drone ESC',

    image: '/projects/drone/drone-esc.jpeg',
    blurb: (
        <>
            <p>
                Designed and built a custom electronic speed controller (ESC) around the STSPIN32F0A processor, containing a three-phase gate driver and a STM microprocesor. This ESC drives a brushless drone motor without position sensing by reading the back-EMF on the motor's undriven phase. Currently in the process of building a full mini-drone using this ESC. 
            </p>
        </>
    ),
    projPage: makeGenericProject(DroneProject),
    allowReadMore: false,
    tags: [ProjectTag.WORK_IN_PROGRESS, ProjectTag.ELECTRONICS],
};

export default DroneData;
