import { Expertise, ExpertiseBody, ExpertiseContainer } from '../components/about/Expertise';

export default function AboutPage() {
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
                    <Expertise projects={[]} projsHeight={0}>
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
                        topHeight={250}
                        projsHeight={125}
                    >
                        <ExpertiseBody
                            title='Robotics'
                            blurb={`Passionate about developing code for controlling physical components in Java through WPILib. Programmer at FRC team 321 for 3 years. `}
                        />
                    </Expertise>
                    <Expertise projects={[{ to: 'attd-trkr', title: 'Attendance Tracker' }]} projsHeight={100}>
                        <ExpertiseBody
                            title='Frontend Design'
                            blurb={`Worked with react and react native to build fluid apps for the web and mobile devices. `}
                        />
                    </Expertise>
                </ExpertiseContainer>
            </div>
        </div>
    );
}
