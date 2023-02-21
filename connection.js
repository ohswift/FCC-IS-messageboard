async function main(callback) {
  const mongoose = require("mongoose");
  console.log("[DB] begin connect db successfully.");

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const ThreadModel = mongoose.model(
      "threads",
      new mongoose.Schema({
        board: { type: String, required: true },
        text: { type: String },
        delete_password: { type: String },
        reported: { type: Boolean },
        created_on: { type: Date },
        bumped_on: { type: Date },
      })
    );
    const ReplyModel = mongoose.model(
      "replies",
      new mongoose.Schema({
        thread_id: { type: String, required: true },
        text: { type: String },
        delete_password: { type: String },
        reported: { type: Boolean },
        created_on: { type: Date },
      })
    );

    console.log("[DB] connect db successfully.");

    // Basic/Inner function
    const CreateModel = async (params, model) => {
      return new Promise((resolve, reject) => {
        // console.log("doc.create params:", params);
        const doc = new model(params);
        doc.save((err1, doc1) => {
          console.log("doc.create", err1, doc1);
          if (err1) return reject(err1);
          resolve(doc1);
        });
      });
    };

    // Biz
    const CreateThread = async (params) => {
      params["created_on"] ||= new Date();
      params["bumped_on"] ||= params["created_on"];
      params["reported"] = false;
      return await CreateModel(params, ThreadModel);
    };

    const CreateReply = async (params) => {
      params["created_on"] ||= new Date();
      // update thread
      await ThreadModel.findOneAndUpdate(
        { _id: params.thread_id },
        { bumped_on: params.created_on }
      );
      return await CreateModel(params, ReplyModel);
    };

    const UpdateThread = async (_id, update) => {
      return await ThreadModel.findOneAndUpdate({ _id }, update);
    };

    const UpdateReply = async (_id, update) => {
      return await ReplyModel.findOneAndUpdate({ _id }, update);
    };

    const DeleteThread = async (filter) => {
      const doc = await ThreadModel.deleteMany(filter);
      if (doc.deletedCount && doc.deletedCount != 0) {
        return true;
      }
      return false;
    };

    const DeleteReply = async (filter) => {
      // return await ReplyModel.deleteMany(filter);
      const doc = await ReplyModel.findOneAndUpdate(filter, {
        text: "[deleted]",
      });
      if (doc) {
        return true;
      }
      return false;
    };

    const FetchThread = async (filter) => {
      const thread = await ThreadModel.findOne(filter);
      console.log("FetchThread thread:", thread);
      const replies = await ReplyModel.find({ thread_id: thread._id });
      console.log("FetchThread replies:", replies, replies.length);
      // thread["replies"] = replies;
      const res = { ...thread._doc, replies: replies };
      return res;
    };

    const FetchBoard = async (filter) => {
      // const threads = await ThreadModel.aggregate([
      //   { $match: filter },
      //   { $sort: { sortKey: { bumped_on: -1 }, limit: 10 } },
      // ]);
      // for (const thread of threads) {
      //   const replies = await ReplyModel.aggregate([
      //     { $match: { thread_id: thread._id } },
      //     { $sort: { sortKey: { created_on: -1 }, limit: 3 } },
      //   ]);
      //   thread.replies = replies;
      // }
      let threads = await ThreadModel.find(filter)
        .sort({ bumped_on: -1 })
        .limit(10)
        .exec();
      threads = threads.map((t) => t._doc);
      for (const thread of threads) {
        const replies = await ReplyModel.find({ thread_id: thread._id })
          .sort({ bumped_on: -1 })
          .limit(3)
          .exec();
        thread.replies = replies;
      }
      console.log("FetchBoard: ", threads);
      return threads;
    };

    callback({
      CreateThread,
      CreateReply,
      UpdateThread,
      UpdateReply,
      DeleteThread,
      DeleteReply,
      FetchThread,
      FetchBoard,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to Connect to Database");
  }
}

module.exports = main;
