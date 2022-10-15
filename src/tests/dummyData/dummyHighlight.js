export default {
  noStop: {
    startIndex: 1
  },
  invalidIndex: {
    startIndex: 'one'
  },
  invalidStopIndex: {
    startIndex: 1,
    stopIndex: 'stop'
  },
  ivalidComment: {
    startIndex: 1,
    stopIndex: 2,
    comment: ''
  },
  nonStringComment: {
    startIndex: 1,
    stopIndex: 2,
    comment: 1
  },
  validHighlight: {
    startIndex: 0,
    stopIndex: 1,
    comment: 'This is my comment'
  },
  sameStartStop: {
    startIndex: 0,
    stopIndex: 0,
    comment: 'This is my comment'
  },
  startGreater: {
    startIndex: 1,
    stopIndex: 0,
    comment: 'This is my comment'
  },
  validIndex: {
    startIndex: 53446,
    stopIndex: 5,
    comment: 'This is my comment'
  },
  noCommentHighlight: {
    startIndex: 0,
    stopIndex: 1
  }
};
