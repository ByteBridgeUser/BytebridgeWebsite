// import profileImgLarge, { default as profileImg, default as profileImgPlaceholder } from 'assets/images/me.jpg';
// import profileKatakana from 'assets/katakana-profile.svg?url';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="About Us" start={visible} delay={500} />
     
    </Heading>
    <Divider className="mt-3 mb-3"></Divider>
    
    <Text className={styles.description} data-visible={visible} size="l" as="p">
   
  
    Step into ByteBridge, a vibrant startup where bold ideas come to life. As pioneers in software solutions, we excel at turning creativity into concrete outcomes. From inception to execution, we're committed to bridging imagination with tangible results. Join our journey as we shape the future together. Let's build your vision into reality - ByteBridge: Where Dreams Become Solutions

    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
    Welcome to BYTE Bridge, where 'Bridging Visions, Building Reality' isn't just a slogan—it's our passion and purpose. Join us on an exciting journey where innovation thrives. Connect with us today to shape the future together.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const ConfigLight={
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#fcf6f4"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 3,
          "size_min": 0.4,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (<>
   
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
    
      

      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <h1 style={{fontSize:"50px"}}>
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"

              >
               Contact Us - Your Feedback Matters!
              </Button>
              </h1>
            </div>
          
          </div>
        )}
      </Transition>
    </Section>
  </>);
};
