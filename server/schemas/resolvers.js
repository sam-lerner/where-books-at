const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-_v -password')
        return userData;
      }
      throw new AuthenticationError('Please log in')
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      console.log(args)
      if (context.user) {
        try {
          const userData = await User.findByIdAndUpdate(
            context.user._id,
            { $push: { savedBooks: args.book } },
            { new: true }
          ) 
          console.log(userData)
          return userData;

        } catch (err) {
          console.error(JSON.parse(JSON.stringify(err)));
        }
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        console.log(bookId)
        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        )
        console.log(userData)
        return userData;
      }
    }
  }
}
module.exports = resolvers;