import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useFormInput } from 'hooks/index';
import { useRef, useState } from 'react';
import styles from "./Contact.module.css";
import { cssProps, msToNum, numToMs } from 'utils/style';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const errorRef = useRef();
  const form = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [statusError, setStatusError] = useState('');
  // const initDelay = tokens.base.durationS;

  const onSubmit = async event => {
    event.preventDefault();
    setStatusError('');
    
      // e.preventDefault();
      setSending(true);
      setComplete(false);
      // alert("Your message has been sent successfully")
      // console.log(form.current);
  
      emailjs
        .sendForm('service_vlsqj1c', 'template_xd0uirn', form.current, {
          publicKey: 'v5jg44syuVOknYpby',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            setComplete(true);
          },
          (error) => {
            setSending(false);
            setStatusError(error.text);
            setComplete(true);
            console.log('FAILED...', error.text);
          },
        );
    

  
    
  };

  return (
    <Section className={styles.contact}>
     
      <Transition unmount in={!complete} timeout={1600}>
        {(visible, status) => (
          <form className={styles.form} method="post" onSubmit={()=>{
            // console.log("submitting")
            alert("Your message has been sent successfully");

          }} ref={form}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              // style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say Hello" start={status !== 'exited'} delay={300} />
              
            </Heading>
            {/* <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            /> */}
            <div style={{backgroundColor:"black",height:"5px",marginBottom:"30px"}}>

            </div>
            <Input
              required
              className={styles.input}
              data-status={status}
              // style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your Email"
              type="email"
              maxLength={512}
              {...email}
              name="user_email"
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              // style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              maxLength={4096}
              {...message}
              name="message"
            />
            <Transition in={statusError} >
              {errorStatus => (
                <div
                  className={styles.formError}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {statusError}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              // style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send Message
            </Button>
          </form>
        )}
      </Transition>
      <Transition unmount in={complete}>
        {(visible, status) => (
          <div className={styles.complete} aria-live="polite">
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              // style={getDelay(tokens.base.durationXS)}
            >
              I’ll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              // style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevronRight"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};
export default Contact;

function getStatusError({
  status,
  errorMessage,
  fallback = 'There was a problem with your request',
}) {
  if (status === 200) return false;

  const statuses = {
    500: 'There was a problem with the server, try again later',
    404: 'There was a problem connecting to the server. Make sure you are connected to the internet',
  };

  if (errorMessage) {
    return errorMessage;
  }

  return statuses[status] || fallback;
}

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
