import { v4 as uuidv4 } from 'uuid';

const categories = [
  {
    id: "1",
    name: "Fast-food"
  },
  {
    id: "2",
    name: "Asian cuisine"
  },
  {
    id: "3",
    name: "Uzbek cuisine"
  }
];

const meals = [
  {
    id: "1",
    name: "Hot-dog",
    price: 25000,
    quantity: 7,
    category_id: "1"
  },
  {
    id: "2",
    name: "Sushi",
    price: 60000,
    quantity: 12,
    category_id: "2"
  },
  {
    id: "3",
    name: "Vassabi",
    price: 9000,
    quantity: 5,
    category_id: "2"
  },
  {
    id: "4",
    name: "Ramyon",
    price: 39000,
    quantity: 21,
    category_id: "2"
  },
  {
    id: "5",
    name: "Osh",
    price: 50000,
    quantity: 128,
    category_id: "3"
  },
  {
    id: "6",
    name: "Shaverma",
    price: 21000,
    quantity: 37,
    category_id: "1"
  },
  {
    id: "7",
    name: "Somsa",
    price: 8000,
    quantity: 173,
    category_id: "3"
  },
  {
    id: "8",
    name: "Gamburger",
    price: 18000,
    quantity: 25,
    category_id: "1"
  }
];

const resolvers = {
  Query: {
    meals: () => meals,
    categories: () => categories,
    meal: (_, args) => {
      const meal = meals.find(meal => meal.id == args.id);

      if (!meal) {
        throw new Error('Meal not found');
      };

      return meal;
    },
    category: (_, args) => {
      const category = categories.find(category => category.id == args.id);

      if (!category) {
        throw new Error('Category not found');
      };

      return category;
    }
  },
  Meal: {
    category: (parent) => {
      return categories.find(category => category.id === parent.category_id);
    }
  },
  Category: {
    meals: (parent) => {
      return meals.filter(meal => meal.category_id === parent.id);
    }
  },
  Mutation: {
    createCategory: (_, args) => {
      categories.push({
        id: uuidv4(),
        name: args.input.name
      });

      return categories.at(-1);
    },
    updateCategory: (_, args) => {
      const category = categories.find(category => category.id == args.id);
      const index = categories.findIndex(category => category.id == args.id);

      if (!category) {
        throw new Error(`Category not found`);
      };

      categories.splice(index, 1, { ...category, ...args.input });

      return categories[index];
    },
    removeCategory: (_, args) => {
      const category = categories.find(category => category.id == args.id);
      const index = categories.findIndex(category => category.id == args.id);

      if (!category) {
        throw new Error(`Category not found`);
      };

      categories.splice(index, 1);

      return category;
    },
    createMeal: (parent, args) => {
      meals.push({
        id: uuidv4(),
        name: args.input.name,
        price: args.input.price,
        quantity: args.input.quantity,
        category_id: args.input.category_id
      });

      return meals.at(-1);
    },
    updateMeal: (_, args) => {
      const meal = meals.find(meal => meal.id == args.id);
      const index = meals.findIndex(meal => meal.id == args.id);

      if (!meal) {
        throw new Error(`Meal not found`);
      };

      meals.splice(index, 1, { ...meal, ...args.input });

      return meals[index];
    },
    removeMeal: (_, args) => {
      const meal = meals.find(meal => meal.id == args.id);
      const index = meals.findIndex(meal => meal.id == args.id);

      if (!meal) {
        throw new Error(`Meal not found`);
      };

      meals.splice(index, 1);

      return meal;
    }
  }
};

export default resolvers;