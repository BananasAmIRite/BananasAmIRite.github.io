import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function Peddie2023Project(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'PickupTrash'}
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
                }}
            ></div>
        </GenericProjectPage>
    );
}

const Peddie2023Data: ProjectBlurb = {
    id: 'peddie-2023',
    title: 'PickupTrash',

    image: '/projects/peddie-2023/banner.png',
    blurb: (
        <>
            <p>
                Winner of the 2023 PeddieHacks Environment Track. Reminds users to pick up a piece of trash and throw it
                away. It uses AI to detect whether or not an item is trash, and picking up a piece of trash and throwing
                it away will allow the user to go on a streak.{' '}
            </p>
            <a href='https://github.com/LancerJawns/peddie-hacks-2023'>View the Project</a>
        </>
    ),
    projPage: makeGenericProject(Peddie2023Project),
};

export default Peddie2023Data;
