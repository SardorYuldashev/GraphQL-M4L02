const posts = [
  {
    id: "1",
    title: "O'zbekistonni alishmasman bashqa jahonga",
    content: 40,
    user_id: "1"
  },
  {
    id: "2",
    title: "Baland ekan archamiz",
    content: 20,
    user_id: "2"
  },
  {
    id: "3",
    title: "Paxta eksam boy bo'lamanmi yoki paxa tersammi?",
    content: 20,
    user_id: "2"
  }
];

const users = [
  {
    id: "1",
    name: "Sardorbek"
  },
  {
    id: "2",
    name: "Imron"
  },
];

const comments = [
  {
    id: "1",
    text: "O'zbekiston tengdur O'zbekistonga",
    user_id: "2",
    post_id: "1",
  },
  {
    id: "2",
    text: "Xayrom bo'ldik barchamiz",
    user_id: "1",
    post_id: "2",
  },
  {
    id: "3",
    text: "Paxta qo'ysang boy bo'lasan",
    user_id: "1",
    post_id: "3",
  }
];

const resolvers = {
  Query: {
    posts: () => posts,
    users: () => users,
    comments: () => comments,
  },
  Post: {
    user: (parent) => {
      return users.find(user => user.id === parent.user_id);
    },
    comments: (parent) => {
      return comments.filter(comment => comment.post_id === parent.id);
    }
  },
  User: {
    posts: (parent) => {
      return posts.filter(post => post.user_id === parent.id);
    }
  },
  Comment: {
    user: (parent) => {
      return users.find(user => user.id === parent.user_id);
    },
    post: (parent) => {
      return posts.find(post => post.id === parent.post_id);
    },
  }
};

export default resolvers;