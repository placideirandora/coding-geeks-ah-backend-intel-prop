const readTime = (body) => {
  const countWords = body.split(' ').length;
  const wordReadPerMinute = 256; // Average words read per minute
  const time = Math.ceil(countWords / wordReadPerMinute);

  return `${time} min read`;
};

export default readTime;
