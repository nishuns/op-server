const { Issue, Poll } = require("../models/models"); // Issue from Models @desc used for operations in mongodb

/**
 *  @description API to view all issues
 *  @method POST /view
 */
exports.view = async (req, res) => {
   try {
      const issues = await Issue.find();
      res.send({ issues: issues });
   } catch (error) {
      res.status(404).send([]);
   }
};

/**
 *  @description API to view selected Issue
 *  @method POST /add
 */
exports.viewOne = async (req, res) => {
   try {
      const issue = await Issue.findOne({ _id: req.params.id });
      res.send({ issue: issue });
   } catch (error) {
      res.status(404).send({});
   }
};

/**
 *  @description API for adding Issue
 *  @method POST /add
 */
exports.add = (req, res) => {
   const { title, content, creator } = req.body;
   const issue = new Issue({
      title,
      content,
      creator
   });

   issue
      .save()
      .then((data) => {
         console.log(data);
         res.send({ issue: data });
      })
      .catch((error) => {
         res.status(404).send("Unable to posted Issue, Try Again!");
      });
};

/**
 *  @description API for updating Issue
 *  @method PUT /upate
 */
exports.update = async (req, res) => {
   try {
      await Issue.updateOne({ _id: req.params.id }, { ...req.body });
      res.send("updated Sucessfully");
   } catch (error) {
      res.status(404).send("Unable to Update Issue, Try Again!");
   }
};

/**
 *  @description API for updatingOpinions Issue
 *  @method PUT /upate/opinions/:id
 */
exports.updateOpinions = async (req, res) => {
   const { id } = req.params;
   const { userId, opinion } = req.body;
   try {
      const selectedIssue = await Issue.findOne({ _id: id });
      if (selectedIssue && selectedIssue.opinions.length > 0) {
         const userOpinion = selectedIssue.opinions.filter(
            (each) => each.userId === userId
         );
         if (userOpinion.length > 0) {
            const updatedOpinions = selectedIssue.opinions.map((each) => {
               if (each.userId === userId) {
                  if (each.opinion !== opinion) each.opinion = opinion;
               }
               return each;
            });
            await Issue.updateOne({ _id: id }, { opinions: updatedOpinions });
            // const issues = await Issue.find();
            res.send("opinion updated Successfully");
         } else {
            await Issue.updateOne(
               { _id: id },
               { $push: { opinions: req.body } }
            );
            // const issues = await Issue.find();
            res.send("opinion added successfully");
         }
      } else {
         await Issue.updateOne({ _id: id }, { $push: { opinions: req.body } });
         // const issues = await Issue.find();
         res.send("opinion added successfully");
      }
   } catch (error) {
      res.status(404).send("Unable to Update Issue, Try Again!");
   }
};

/**
 *  @description API for deleting Issue
 *  @method DELETE /delete
 */
exports.delete = async (req, res) => {
   try {
      await Issue.deleteOne({ _id: req.params.id });
      await Poll.deleteOne({ issueId: req.params.id });
      res.send("deleted Sucessfully");
   } catch (error) {
      res.status(404).send("Unable to Delete, Try Again!");
   }
};
