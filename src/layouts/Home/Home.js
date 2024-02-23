import CLIPng from 'assets/images/cli.png';
import NexoNautsPng from 'assets/images/nexonauts.png';

// Components
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
const disciplines = ['Technology', 'Innovation', 'Design'];


export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title=""
        // description=""
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        alternate={true}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Vivid"
        description="Experience Vivid: Where student connections thrive and education is empowered. Our cutting-edge platform seamlessly integrates management tasks, revolutionizing educational efficiency
"
        buttonText="Explore More!"
        buttonLink="https://vivid-bytebridge.netlify.app/"
       
        model={{
          type: 'laptop',
          alt: 'Vivid',
          textures: [
            {
              srcSet: [NexoNautsPng, NexoNautsPng],
              placeholder: NexoNautsPng,
            },
          ],
        }}
      />
      {/* <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="CodeGenX"
        description="Go-lang CLI tool designed to streamline project development by integrating popular features."
        buttonText="View Github Repo"
        buttonLink="https://github.com/GDSC-NITH/GenCodeX"
        model={{
          type: 'laptop',
          alt: 'CodeGenX',
          textures: [
            {
              srcSet: [CLIPng, CLIPng],
              placeholder: CLIPng,
            },
          ],
        }}
      /> */}
    
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
