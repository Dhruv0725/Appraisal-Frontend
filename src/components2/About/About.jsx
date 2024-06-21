// import { about } from "../../../portfolio";
import "./About.css";

const About = () => {
  const { firstName, designation, dateOfJoining, contactNumber } = JSON.parse(
    sessionStorage.getItem("user")
  );
  console.log(sessionStorage.getItem("user"));
  console.log(JSON.parse(sessionStorage.getItem("user")));
  return (
    <div className="about center">
      {firstName && (
        <h1>
          Welcome <span className="about__name">{firstName}</span>
        </h1>
      )}

      {designation && <h2 className="about__role">{designation}.</h2>}
      <p className="about__desc">{designation && designation}</p>

      <div className="about__contact center">
        {
          <a href={"www.beehyv.com"}>
            <span type="button" className="btn btn--outline">
              Resume
            </span>
          </a>
        }

        {/* {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label="github"
                className="link link--icon"
              >
                github
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label="linkedin"
                className="link link--icon"
              >
                linkedin
              </a>
            )}
          </>
        )} */}
      </div>
    </div>
  );
};

export default About;
