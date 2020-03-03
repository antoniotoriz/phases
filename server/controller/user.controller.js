const User = require('../models/user.model');

module.exports.findAllUsers = (request, response) => {
    User.find()
    .then(allUsers => response.json( { users: allUsers }))
    .catch(err => response.json( { message: 'something went wrong', error: err } ));
};

module.exports.findOneSingleUser = (request, response) => {
    User.findOne({ _id: request.params.id })
    .then(oneSingleUser => response.json({ user: oneSingleUser }))
    .catch(err => response.json({ message: 'something went wrong', error: err }));
};

module.exports.createNewUser = (request, response) => {
    User.create(request.body)
    .then(newlyCreatedUser => response.json({ user: newlyCreatedUser }))
    .catch(err => response.json({ message: 'something went wrong', error: err }));
};

module.exports.updateExistingUser = (request, response) => {
    User.findByIdAndUpdate({ _id: request.params.id }, request.body, { new: true })
    .then(updatedUser => response.json({ user: updatedUser }))
    .catch(err => response.json({ message: 'something went wrong', error: err }));
};

module.exports.deleteAnExistingUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
    .then(result => response.json({ result: result }))
    .catch(err => response.json({ message: 'something went wrong', error: err }));
};