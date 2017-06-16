const _baseUrl = 'https://cnodejs.org/api/v1'
export default {
  getTopics(tab, page, limit) {
    return `${_baseUrl}/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=true`;
  },
  getTopic(id) {
    return `${_baseUrl}/topic/${id}`;
  },
  login() {
    return `${_baseUrl}/accesstoken`;
  },
  personal(loginname) {
    return `${_baseUrl}/user/${loginname}`;
  },
  getCollect(loginname) {
    return `${_baseUrl}/topic_collect/${loginname}`;
  },
  getMsgCount() {
    return `${_baseUrl}/message/count`;
  },
  getMsg() {
    return `${_baseUrl}/messages`;
  },
  createPost() {
    return `${_baseUrl}/topics`;
  },
  modifyPost() {
    return `${_baseUrl}/topics/update`;
  },
  selCollect() {
    return `${_baseUrl}/topic_collect/collect`;
  },
  delCollect() {
    return `${_baseUrl}/topic_collect/de_collect`;
  },
  upsComm(replyId) {
    return `${_baseUrl}/reply/${replyId}/ups`;
  },
  createComm(topicId) {
     return `${_baseUrl}/topic/${topicId}/replies`;
  },
  markOne(msgId) {
     return `${_baseUrl}/message/mark_one/${msgId}`;
  },
  markAll() {
    return `${_baseUrl}/message/mark_all`;
  }
}
