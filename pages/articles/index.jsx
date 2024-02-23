// import Barcode from 'assets/barcode.svg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from 'hooks/index';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from 'src/css/Articles.module.css';
import { formatDate } from 'utils/date';
import { classes, cssProps } from 'utils/style';

const ArticlesPost = ({
  slug,
  href,
  title,
  abstract,
  date,
  featured,
  banner,
  timecode,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);
  
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Featured
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={{ src: banner }}
            placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg`,
            height: featured ? 400 : 200,
            width: featured ? 800 : 400,
        }}
            alt=""
            height={featured ? 400 : 200}
            width={featured ? 800 : 400}
            role="presentation"
          />
        </div>
      )}
      <Link
        href={href}
        scroll={false}
        className={styles.postLink}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>

        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {dateTime}
          </div>
          <Heading as="h2" level={featured ? 2 : 4}>
            {title}
          </Heading>
          <Text size={featured ? 'l' : 's'} as="p">
            {abstract}
          </Text>
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevronRight" as="div">
              Read article
            </Button>
            <Text className={styles.timecode} size="s">
              {timecode}
            </Text>
          </div>
        </div>

      </Link>
      {featured && (
        <Text aria-hidden className={styles.postTag} size="s">
          477
        </Text>
      )}
    </article>
  );
};

const SkeletonPost = ({ index }) => {
  return (
    <article
      aria-hidden="true"
      className={classes(styles.post, styles.skeleton)}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      <div className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            Coming soon...
          </div>
          <Heading
            className={styles.skeletonBone}
            as="h2"
            level={4}
            style={{ height: 24, width: '70%' }}
          />
          <Text
            className={styles.skeletonBone}
            size="s"
            as="p"
            style={{ height: 90, width: '100%' }}
          />
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevronRight" as="div">
              Read more
            </Button>
            <Text className={styles.timecode} size="s">
              00:00:00:00
            </Text>
          </div>
        </div>
      </div>
    </article>
  );
};

export default function Articles({ posts, featured }) {
  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;

  const postsHeader = (
    <header className={styles.header}>
      <Heading className={styles.heading} level={5} as="h1">
        <Link href="https://kanakkholwal.medium.com" target='_blank' scroll={false}>

        <DecoderText text="Latest articles" />
        </Link>
      </Heading>
      <Barcode />
    </header>
  );

  const postList = (
    <div className={styles.list}>
      {!isSingleColumn && postsHeader}
      {posts.map(({ slug, ...post }, index) => (
        <ArticlesPost key={slug} slug={slug} index={index} {...post} />
      ))}
      {Array(0)
        .fill()
        .map((skeleton, index) => (
          <SkeletonPost key={index} />
        ))}
    </div>
  );

  const featuredPost = <ArticlesPost {...featured} />;

  return (
    <article className={styles.articles}>
      <Meta
        title="Articles"
        description="A collection of technical design and development articles. May contain incoherent ramblings."
      />
      <Section className={styles.content}>
        {!isSingleColumn && (
          <div className={styles.grid}>
            {postList}
            {featuredPost}
          </div>
        )}
        {isSingleColumn && (
          <div className={styles.grid}>
            {postsHeader}
            {featuredPost}
            {postList}
          </div>
        )}
      </Section>
      <Footer />
    </article>
  );
}
const allPosts = [
    {
      slug: '2023-10-26',
      href: 'https://kanakkholwal.medium.com/5-things-you-dont-know-about-promise-all-6ab469192b45',
      title: 'Promise.all and Promise.allSettled -Unlocking JavaScript’s Hidden Secrets',
      abstract: 'Leaverage Promise.all and Promise.allSettled in js to make your code more efficient and readable',
      date: '2023-10-26',
      featured: true,
      banner: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200&w=1080&q=75',
      timecode: '2 min read',
      index: 0,
    },
    {
      slug: '2023-10-25',
      href: 'https://medium.com/@kanakkholwal/25-javascript-tricks-you-need-to-know-about-c1979ea2ec2b',
      title: '25 JavaScript Tricks You Need To Know About',
      abstract: 'These 25 JavaScript tricks cover a wide range of scenarios, from deep object manipulation to elegant looping and data manipulation. By incorporating..',
      date: '2023-10-25',
      featured: false,
      banner: 'https://images.pexels.com/photos/14011035/pexels-photo-14011035.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200&w=640&q=75',
      timecode: '2 min read',
      index: 1,
    },
    {
      slug: '2023-10-25',
      href: 'https://medium.com/@kanakkholwal/how-to-deploy-your-node-js-backend-on-vercel-a-step-by-step-guide-21796db74601',
      title: 'How to Deploy Your Node.js Backend on Vercel: A Step-by-Step Guide',
      abstract: 'Deploying your Node.js backend on Vercel using Serverless Functions offers a powerful solution for creating scalable and flexible applications...',
      date: '2023-10-25',
      featured: false,
      banner: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*vfhGnuF4gUINNv92',
      timecode: '2 min read',
      index: 2,
    },
  ];
  export function getStaticProps() {
  
    const featured = allPosts.find(post => post.featured);
  
    const posts = allPosts
      .filter(post => post.slug !== featured.slug)
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
  
    return {
      props: { posts, featured },
    };
  }