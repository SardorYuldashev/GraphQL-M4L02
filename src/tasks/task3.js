const groups = [
  {
    id: "1",
    name: "FullStack FS82"
  },
  {
    id: "2",
    name: "FrontEnd F93"
  },
  {
    id: "3",
    name: "BackEnd B101"
  }
];

const users = [
  {
    id: "1",
    first_name: "Sardor",
    last_name: "Yuldashev"
  },
  {
    id: "2",
    first_name: "Imron",
    last_name: "Abdusalimov"
  },
  {
    id: "3",
    first_name: "Sherzod",
    last_name: "Arziyev"
  },
  {
    id: "4",
    first_name: "Aziz",
    last_name: "Nabiyev"
  },
  {
    id: "5",
    first_name: "Bunyod",
    last_name: "Jo'rayev"
  },
  {
    id: "6",
    first_name: "Bekzod",
    last_name: "To'ychiyev"
  },
  {
    id: "7",
    first_name: "Akmal",
    last_name: "Usmonov"
  },
  {
    id: "8",
    first_name: "Oybek",
    last_name: "Xasanov"
  },
  {
    id: "9",
    first_name: "O'ral",
    last_name: "Xasanov"
  },
  {
    id: "10",
    first_name: "Shoxruh",
    last_name: "Solmetov"
  }
];

const group_users = [
  {
    id: "1",
    user_id: "1",
    group_id: "1"
  },
  {
    id: "2",
    user_id: "2",
    group_id: "1"
  },
  {
    id: "3",
    user_id: "3",
    group_id: "2"
  },
  {
    id: "4",
    user_id: "4",
    group_id: "3"
  },
  {
    id: "5",
    user_id: "5",
    group_id: "3"
  },
  {
    id: "6",
    user_id: "6",
    group_id: "3"
  },
  {
    id: "7",
    user_id: "7",
    group_id: "1"
  },
  {
    id: "8",
    user_id: "8",
    group_id: "2"
  },
  {
    id: "9",
    user_id: "9",
    group_id: "2"
  },
  {
    id: "10",
    user_id: "10",
    group_id: "2"
  }
];

const resolvers = {
  Query: {
    groups: () => groups,
    users: () => users,
    group: (_, args) => {
      const group = groups.find(group => group.id == args.id);

      if (!group) {
        throw new Error('Group not found');
      };

      return group;
    },
    user: (_, args) => {
      const user = users.find(user => user.id == args.id);

      if (!user) {
        throw new Error('User not found');
      };

      return user;
    }
  },
  User: {
    groups: (parent) => {
      const existing = group_users.find(item => item.user_id === parent.id);
      return groups.filter(group => group.id === existing.group_id);
    },
    full_name: (parent) => `${parent.first_name} ${parent.last_name}`
  },
  Group: {
    users: (parent) => {
      const existing = group_users.filter(item => item.group_id === parent.id);

      return users.filter(user => {
        return existing.find(item => item.user_id === user.id);
      });
    }
  }
};

export default resolvers;