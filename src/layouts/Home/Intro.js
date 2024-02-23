"use client";

import ArrowDown from 'assets/arrow-down.svg';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { AnimatePresence } from 'framer-motion';
import { useInterval, usePrevious, useScrollToHash } from 'hooks/index';
import dynamic from 'next/dynamic';
import RouterLink from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { cssProps } from 'utils/style';
import styles from './Intro.module.css';

const DisplacementSphere = dynamic(() =>
  import('layouts/Home/DisplacementSphere').then(mod => mod.DisplacementSphere)
);

export function Intro({ id, sectionRef, disciplines, scrollIndicatorHidden, ...rest }) {
  const theme = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  );
  const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme.themeId
  );

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  const handleScrollClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme.themeId} timeout={3000}>
        {(visible, status) => (
          <Fragment>
            {/* <DisplacementSphere /> */}
            <div style={{height:"100vh",width:"100vw",position:"absolute",right:"0px",top:"60px",zIndex:"-1",border:"0px solid black"}}>
          
{/* 
*/}

{/* <spline-viewer className="small3d" style={{height:"100%",width:"100%"}} url="https://prod.spline.design/Lmw-DR8w0GIbRJVi/scene.splinecode"></spline-viewer>   */}

<spline-viewer className="big3d" style={{height:"100%",width:"100%"}} url="https://prod.spline.design/ocwrn9fNLOdymbe6/scene.splinecode"></spline-viewer>


            </div>
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                <div className='flex' style={{flexDirection:"column",display:"flex",justifyContent:"space-evenly",alignItems:"center",fontSize:"15px",minWidth:"30px",height:"100%"}}>
                <DecoderText  className="b-vertical" text="B" delay={300} />
                <DecoderText text="Y"  className="b-vertical" delay={300} />
                <DecoderText text="T"  className="b-vertical" delay={300}  />
                <DecoderText text="E" className="b-vertical mb-10"  delay={300} />
              

                <DecoderText text="B" className="b-vertical" delay={300} />
                <DecoderText text="R"  className="b-vertical"delay={300} />
                <DecoderText text="I" className="b-vertical" delay={300} />
                <DecoderText text="D" className="b-vertical" delay={300} />
                <DecoderText text="G" className="b-vertical" delay={300} />
                <DecoderText text="E" className="b-vertical" delay={300} />


                </div>
               
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <VisuallyHidden className={styles.label}>
                  {/* {`Development + ${introLabel}`} */}
                </VisuallyHidden>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                   <DecoderText text="Bridging Visions," delay={300} style={{marginBottom:"13px"}} />
                   {/* <br /> */}
                   
                  </span>
                  {/* <span className={styles.line} data-status={status} /> */}
                </span>
                <div className={styles.row} component="span">
                <DecoderText text="Building Reality" delay={300} />
                  <AnimatePresence>
                    {/* {disciplines.map(item => (
                      <Transition
                        unmount
                        in={item === currentDiscipline}
                        timeout={{ enter: 3000, exit: 2000 }}
                        key={item}
                      >
                        {(visible, status) => (
                          <span
                            aria-hidden
                            className={styles.word}
                            data-plus={true}
                            data-status={status}
                            style={cssProps({ delay: tokens.base.durationL })}
                          >
                            {item}
                          </span>
                        )}
                      </Transition>
                    ))} */}
                  </AnimatePresence>
                </div>
              </Heading>
            </header>
            <RouterLink
              href="/#project-1"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
              >
                <VisuallyHidden>Scroll to projects</VisuallyHidden>
              
            </RouterLink>
            <RouterLink
              href="/#project-1"
              className={styles.mobileScrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
              >
                <VisuallyHidden>Scroll to projects</VisuallyHidden>
                <ArrowDown aria-hidden />
            </RouterLink>
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}
