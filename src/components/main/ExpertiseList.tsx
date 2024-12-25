import { Expertise, ExpertiseBody, ExpertiseContainer } from './Expertise';

export default function ExpertiseList() {
    return (
        <div
            style={{
                background: 'linear-gradient(transparent 0%, black 5%, 95%, transparent 100%)',
                height: 'auto',
                width: '100%',
                margin: 'auto',
            }}
        >
            <div
                style={{
                    padding: '20px',
                    height: '100%',
                    width: '80%',
                    margin: 'auto',
                }}
            >
                <h1>I'm experienced in: </h1>
                <ExpertiseContainer>
                    <Expertise
                        projects={[
                            {
                                to: 'peddie-2023',
                                title: 'PickupTrash',
                            },
                        ]}
                    >
                        <ExpertiseBody
                            title='Backend Development'
                            blurb={`Over 5 years of development experience with server-side applications using Node.JS with both
                            SQL and NoSQL databases.`}
                        />
                    </Expertise>
                    <Expertise
                        projects={[
                            { to: 'robo-2023', title: '2023 Robot' },
                            { to: 'robo-2024', title: '2024 Robot' },
                        ]}
                    >
                        <ExpertiseBody
                            title='Robotics'
                            blurb={`Passionate about developing code for controlling physical components in Java through WPILib. Programmer at FRC team 321 for 3 years. `}
                        />
                    </Expertise>
                    <Expertise projects={[{ to: 'attd-trkr', title: 'Attendance Tracker' }]}>
                        <ExpertiseBody
                            title='Frontend Design'
                            blurb={`Worked with react and react native to build fluid apps for the web and mobile devices. `}
                        />
                    </Expertise>
                    <Expertise
                        projects={[
                            { to: 'robo-simulate', title: 'Mechanism Simulation' },
                            { to: 'nss', title: 'Natural Selection' },
                        ]}
                    >
                        <ExpertiseBody
                            title='Simulations'
                            blurb={`Created interactive models to simulate different physical phenomena (eg. natural selection, kinematics)`}
                        />
                    </Expertise>
                </ExpertiseContainer>
            </div>
        </div>
    );
}
