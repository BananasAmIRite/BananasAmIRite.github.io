import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function Robo2025Project(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'FRC 2025 Robot'}
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
                        }}
                    >
                        Helllo
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

const Robo2025Data: ProjectBlurb = {
    id: 'robo-2025',
    title: 'SeaBiscuit',

    image: '/projects/robo-2025/banner.jpg',
    blurb: (
        <>
            <p>
                SeaBiscuit was FRC team 321's robot for the 2025 season of FRC, Reefscape, where robots were tasked with
                transporting coral (PVC pipes) on reefs (metal sticks), as well as putting algae (big blue balls) in
                various places on the field. This robot is capable of automatically scoring coral in all locations on
                the field and has fully customizable autonomous modes. The codebase was developed with full robot
                simulation capabilities on a computer.
            </p>
            <a href='https://github.com/RoboLancers/321-Reefscape-2025'>View the Project</a>
        </>
    ),
    projPage: makeGenericProject(Robo2025Project),
};

export default Robo2025Data;
