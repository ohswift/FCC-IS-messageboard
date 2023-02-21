"use strict";

module.exports = function (app, client) {
  // {"_id":"63f1c40ccafff3049c976bbd","text":"fdsaf","created_on":"2023-02-19T06:39:08.251Z","bumped_on":"2023-02-20T15:28:38.007Z","replies":[{"_id":"63f391a663a36d165c2124a0","text":"tyytryrtyrtyrtyrty","created_on":"2023-02-20T15:28:38.007Z"}]}
  function formatThread(thread) {
    const replies = thread.replies.map((reply) => formatReply(reply));
    return {
      _id: thread._id,
      text: thread.text,
      created_on: thread.created_on,
      bumped_on: thread.bumped_on,
      replies,
    };
  }
  function formatReply(reply) {
    return {
      _id: reply._id,
      text: reply.text,
      created_on: reply.created_on,
    };
  }

  try {
    app
      .route("/api/threads/:board")
      .post(async (req, res, next) => {
        let board = req.params.board;
        console.log("post", req.body);
        const doc = await client.CreateThread({ ...req.body, board });
        res.send(doc);
      })
      .put(async (req, res, next) => {
        console.log("put", req.body);
        await client.UpdateThread(req.body.thread_id, { reported: true });
        res.send("reported");
      })
      .get(async (req, res, next) => {
        console.log("get", req.params);
        let ret = await client.FetchBoard({ board: req.params.board });
        ret = ret.map((thread) => formatThread(thread));
        res.send(ret);
      })
      .delete(async (req, res, next) => {
        console.log("delete", req.body);
        const ret = await client.DeleteThread({
          _id: req.body.thread_id,
          delete_password: req.body.delete_password,
        });
        if (ret) {
          return res.send("success");
        }
        res.send("incorrect password");
      });

    app
      .route("/api/replies/:board")
      .post(async (req, res, next) => {
        console.log("post", req.body);
        const doc = await client.CreateReply(req.body);
        res.send(formatReply(doc));
      })
      .put(async (req, res, next) => {
        console.log("put", req.body);
        await client.UpdateReply(req.body.reply_id, { reported: true });
        res.send("reported");
      })
      .get(async (req, res, next) => {
        console.log("get", req.query);
        const ret = await client.FetchThread({ _id: req.query.thread_id });
        res.send(formatThread(ret));
      })
      .delete(async (req, res, next) => {
        const ret = await client.DeleteReply({
          _id: req.body.reply_id,
          delete_password: req.body.delete_password,
        });
        if (ret) {
          return res.send("success");
        }
        res.send("incorrect password");
      });
  } catch (e) {}
};
