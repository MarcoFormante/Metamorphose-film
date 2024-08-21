import React from 'react'

const AboutPersonMobile = ({person}) => {
  return (
    <a href={person.instaLink}>
      <figure>
        <h1>{person.name}</h1>
        <img src={`/assets/static/images/${person.src}`} alt="" />
        <div className="about__authors__mobile__skills">
          {person.skills.map((skill, index) => {
            return <p key={"skills__" + index}>{skill}</p>;
          })}
        </div>
      </figure>
    </a>
  );
}

export default AboutPersonMobile
