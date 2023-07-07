import { v4 as uuidv4 } from 'uuid';

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
    text: "Xayron bo'ldik barchamiz",
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
    post: (_, args) => {
      const post = posts.find(post => post.id == args.id);

      if (!post) {
        throw new Error('Post not found');
      };

      return post;
    },
    user: (_, args) => {
      const user = users.find(user => user.id == args.id);

      if (!user) {
        throw new Error('User not found');
      };

      return user;
    },
    comment: (_, args) => {
      const comment = comments.find(comment => comment.id == args.id);

      if (!comment) {
        throw new Error('Comment not found');
      };

      return comment;
    },
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
  },
  Mutation: {
    createPost: (_, args) => {
      posts.push({
        id: uuidv4(),
        title: args.input.title,
        content: args.input.content,
        user_id: args.input.user_id
      });

      return posts.at(-1);
    },
    updatePost: (_, args) => {
      const post = posts.find(post => post.id == args.id);
      const index = posts.findIndex(post => post.id == args.id);

      if (!post) {
        throw new Error(`Post not found`);
      };

      posts.splice(index, 1, { ...post, ...args.input });

      return posts[index];
    },
    removePost: (_, args) => {
      const post = posts.find(post => post.id == args.id);
      const index = posts.findIndex(post => post.id == args.id);

      if (!post) {
        throw new Error(`Post not found`);
      };

      posts.splice(index, 1);

      return post;
    },
    createUser: (_, args) => {
      users.push({
        id: uuidv4(),
        name: args.input.name
      });

      return users.at(-1);
    },
    updateUser: (_, args) => {
      const user = users.find(user => user.id == args.id);
      const index = users.findIndex(user => user.id == args.id);

      if (!user) {
        throw new Error(`User not found`);
      };

      users.splice(index, 1, { ...user, ...args.input });

      return users[index];
    },
    removeUser: (_, args) => {
      const user = users.find(user => user.id == args.id);
      const index = users.findIndex(user => user.id == args.id);

      if (!user) {
        throw new Error(`User not found`);
      };

      users.splice(index, 1);

      return user;
    },
    createComment: (_, args) => {
      comments.push({
        id: uuidv4(),
        text: args.input.text,
        user_id: args.input.user_id,
        post_id: args.input.post_id
      });

      return comments.at(-1);
    },
    updateComment: (_, args) => {
      const comment = comments.find(comment => comment.id == args.id);
      const index = comments.findIndex(comment => comment.id == args.id);

      if (!comment) {
        throw new Error(`Comment not found`);
      };

      comments.splice(index, 1, { ...comment, ...args.input });

      return comments[index];
    },
    removeComment: (_, args) => {
      const comment = comments.find(comment => comment.id == args.id);
      const index = comments.findIndex(comment => comment.id == args.id);

      if (!comment) {
        throw new Error(`Comment not found`);
      };

      comments.splice(index, 1);

      return comment;
    }
  }
};

export default resolvers;