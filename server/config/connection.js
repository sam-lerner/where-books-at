const mongoose = require('mongoose');
// mongodb+srv://mongo:mongo@cluster0.gnx5xkw.mongodb.net/booksDB?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/where-books-at', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
