function Profile({ profile }) {

    if (!profile) {
        return null;
    }

    return (
        <div>

            <h2>Your Profile</h2>

            <h3>Skills</h3>

            <ul>
                {profile.skills.map((skill, index) => (
                    <li key={index}>
                        {skill}
                    </li>
                ))}
            </ul>


            <h3>Projects</h3>

            <ul>
                {profile.projects.map((project, index) => (
                    <li key={index}>
                        {project}
                    </li>
                ))}
            </ul>


            <h3>Education</h3>

            <ul>
                {profile.education.map((education, index) => (
                    <li key={index}>
                        {education}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Profile;