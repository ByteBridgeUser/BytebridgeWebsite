import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { classes } from 'utils/style';
import styles from './Footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
    
      <br />
      <span style={{marginTop:"30px"}}>
      {/* <i class="fa-brands fa-instagram fa-2xl " style={{marginBottom:"30px"}}></i> */}
      {/* <i class="fa-brands fa-linkedin fa-2xl me-3" style={{marginLeft:"20px"}}></i> */}
      <i class="fa-solid fa-envelope fa-xl me-3" style={{marginLeft:"20px"}}></i>
      <span style={{marginLeft:"0px"}}>bytebridge.00@gmail.com</span>
      {/* <i class="fa-brands fa-github fa-2xl me-3" style={{marginLeft:"20px"}}></i> */}
      </span>
      <br />
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} Byte Bridge.`}
      </span>
    </Text>
  </footer>
);
