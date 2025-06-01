import GenericProjectPage, { makeGenericProject } from '../../../components/project/GenericProjectPage';
import ProjectDetails, { ProjectDetailsContainer } from '../../../components/project/ProjectDetails';
import { ProjectBlurb } from '../../ProjectsPage';

export function AttdTrkrProject(props: { onExit: () => void; key: string }) {
    return (
        <GenericProjectPage
            title={'Attendance Tracker'}
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
                            color: 'var(--bs-gray-100)',
                        }}
                    >
                        Helllo
                    </ProjectDetails>
                    <ProjectDetails
                        accentColor='var(--bs-gray-600)'
                        style={{
                            height: '200px',
                            width: '200px',
                            color: 'var(--bs-gray-100)',
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
            <ProjectDetailsContainer
                style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'transparent',
                }}
            />
        </GenericProjectPage>
    );
}

const AttdTrkrData: ProjectBlurb = {
    id: 'attd-trkr',
    projPage: makeGenericProject(AttdTrkrProject),
    title: 'Attendance Tracker',
    image: '/projects/attd-trkr/banner.png',
    blurb: (
        <>
            <p>
                This project relieves people of the hassle of taking attendance on my robotics team. It is an Android
                app that reads student ID cards through NFC IDs or barcodes and stores each instance of the scan in a
                google sheet.
            </p>

            <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                {' '}
                <a href='https://github.com/BananasAmIRite/robo-attendance-tracker'>View the Project (v1)</a>
                <a href='https://github.com/BananasAmIRite/attendance-tracker-rpi'>View the Project (v2)</a>
            </div>
        </>
    ),
};

export default AttdTrkrData;
