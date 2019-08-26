const readTime = (body, title, description) => {
  const countWords = body.split(' ').length + title.split(' ').length + description.split(' ').length;
  const wordReadPerMinute = 256; // Average words read per minutes
  const time = Math.ceil(countWords / wordReadPerMinute);

  return `${time} min read`;
};

export default readTime;
