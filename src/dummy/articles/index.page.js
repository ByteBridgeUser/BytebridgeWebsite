

export { Articles as default } from './Articles';

const allPosts = [
  {
    slug: '2021-05-01-what-is-ux',
    title: 'What is UX?',
    abstract: 'A brief introduction to the field of UX design.',
    date: '2021-05-01',
    featured: true,
    banner: '/images/what-is-ux.jpg',
    timecode: '2 min read',
    index: 0,
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
