import { ProjectTag } from '../../../components/ProjectTag';
import GenericProjectPage, { makeGenericProject, ProjectTextBlock } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function AsteriaProject(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'Asteria'}
            image={'/projects/asteria/asteria-sim.jpg'}
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

const AsteriaData: ProjectBlurb = {
    id: 'asteria',
    title: 'Asteria',

    image: '/projects/asteria/asteria-sim.png',
    blurb: (
        <>
            <p>
                As part of MIT Rocket Team, I'm developing end-to-end simulation software for Asteria, a liquid bipropellant lander, for analysis now and hardware-in-the-loop (HITL) testing later. It models the hardware (6-DOF dynamics, fluid plumbing, TVC, and sensor noise) alongside the flight software, from sensor sampling rates to the EKF state estimator and cascaded PID controllers.
            </p>
        </>
    ),
    projPage: makeGenericProject(AsteriaProject),
    allowReadMore: false,
    tags: [ProjectTag.WORK_IN_PROGRESS, ProjectTag.CONTROLS, ProjectTag.SIMULATIONS],
};

export default AsteriaData;
