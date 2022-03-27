const { Thoughts, Users } = require('../models');

const thoughtsController = {

getAllThoughts(req, res) {
    Thoughts.find({})
    .then((dbThoughtsData) =>  res.json(dbThoughtsData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
},

//add thought to user
addThought({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
    .then(({ _id }) => {
        return Users.findOneAndUpdate(
            { _id: params.usersId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.json(err));
},

addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
        { _id: params.thoughtsId },
        { $push: { reactions: body }},
        { new: true, runValidators: true }
    )
    .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
},

 // remove reaction
 removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { replyId: params.reactionsId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { comments: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

updateThoughts({ params }, res) {
    Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, body, { new: true })
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({ message: 'No thoughts found with this id!' });
        }
        res.json(dbThoughtsData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},


}

module.exports = thoughtsController;