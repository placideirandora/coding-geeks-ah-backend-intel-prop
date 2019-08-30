export default {
  noText: {
    startIndex: 1
  },
  invalidIndex: {
    startIndex: 'one'
  },
  invalidText: {
    startIndex: 1,
    text: ''
  },
  ivalidComment: {
    startIndex: 1,
    text: 'h',
    comment: ''
  },
  nonStringComment: {
    startIndex: 1,
    text: 'h',
    comment: 1
  },
  nonStringText: {
    startIndex: 1,
    text: 2,
    comment: 'This is my comment'
  },
  textNotFound: {
    startIndex: 0,
    text: 'texttexttext',
    comment: 'This is my comment'
  },
  validHighlight: {
    startIndex: 0,
    text: 'text',
    comment: 'This is my comment'
  },
  noCommentHighlight: {
    startIndex: 0,
    text: 'text'
  }
};
