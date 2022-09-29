const { Poll } = require("../models/models"); // Poll from Models @desc used for operations in mongodb
const bcrypt = require("bcrypt"); // ** npm install bcrypt @desc used for created hash passwords

/**
 *  @description API to view all polls
 *  @method POST /view
 */
exports.view = async (req, res) => {
   try {
      const polls = await Poll.find();
      console.log("async");
      console.log(polls);
      res.send({ polls: polls });
   } catch (error) {
       console.log(error);
      res.status(400).send([]);
   }
};

/**
 *  @description API to view one issue's polls
 *  @method POST /view
 */
exports.viewOne = async (req, res) => {
   try {
      const polls = await Poll.findOne({ issueId: req.params.id });
      res.send({ polls: polls });
   } catch (error) {
      res.status(400).send([]);
   }
};

/**
 *  @description API to view all likes
 *  @method POST /view/:option
 */
exports.viewCategory = async (req, res) => {
   const { option } = req.params;
   try {
      const polls = await Poll.find();
      switch (option) {
         case "likes":
            const totalLikes = polls.filter((each) => each.opinion === "like");
            res.send({ likes: totalLikes.length });
            break;
         case "dislikes":
            const totalDislikes = polls.filter(
               (each) => each.opinion === "dislike"
            );
            res.send({ dislikes: totalDislikes.length });
            break;
         default:
            res.send({ allPolls: polls.length });
      }
   } catch (error) {
      res.status(400).send("no available polls");
   }
};

exports.update = async (req, res) => {
    console.log(req.body);
   const { opinion } = req.body;
   try {
      const issuePolls = await Poll.findOne({ _id: req.params.id });
      if (issuePolls.opinions.length > 0) {
         const userOpinion = issuePolls.opinions.filter(
            (each) => each.userId === req.body.userId
         );
         if (userOpinion.length > 0) {
            const userResponse = userOpinion[0].opinion;
            if (userResponse === req.body.opinion) {
               res.send("Nothing to change");
            } else {
               const updatedOpinions = issuePolls.opinions.map((each) => {
                  if (each.userId === req.body.userId)
                     each.opinion = req.body.opinion;
                  return each;
               });
               await Poll.updateOne(
                  { _id: req.params.id },
                  { opinions: updatedOpinions }
               );
               res.send("Opinion Added Successfully");
            }
         } else {
            console.log("here");
            console.log(req.params.id);
            await Poll.updateOne(
               { _id: req.params.id },
               { $push: { opinions: req.body } }
            );
            res.send("Opinion Added Successfully");
         }
      } else {
         console.log("here");
         await Poll.updateOne(
            { _id: req.params.id },
            { $push: { opinions: req.body } }
         );
         res.send("Opinion Added Successfully");
      }
   } catch (error) {
      console.log(error);
      res.status(400).send("Unable to add Opinion, Try Again!");
   }
};
