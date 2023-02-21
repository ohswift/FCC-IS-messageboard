const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

let last_thread_id = 0;
let last_reply_id = 0;
chai.use(chaiHttp);
suite("Functional Tests", function () {
  suite("API Tests", function () {
    test("#1 POST /api/threads/{board}", function (done) {
      chai
        .request(server)
        .post("/api/threads/func_test")
        .send({ text: "fcc_test", delete_password: "delete_me" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "_id");
          assert.property(res.body, "reported");
          assert.property(res.body, "created_on");
          assert.property(res.body, "bumped_on");
          last_thread_id = res.body._id;
          done();
        });
    });
    test("#2 GET /api/threads/{board}", function (done) {
      chai
        .request(server)
        .get("/api/threads/func_test")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], "created_on");
          assert.property(res.body[0], "bumped_on");
          assert.property(res.body[0], "text");
          done();
        });
    });
    test("#3 PUT /api/threads/{board}", function (done) {
      chai
        .request(server)
        .put("/api/threads/func_test")
        .send({ thread_id: last_thread_id })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "reported");
          done();
        });
    });
    test("#4 POST /api/replies/{board}", function (done) {
      chai
        .request(server)
        .post("/api/replies/func_test")
        .send({
          text: "fcc_test_reply",
          delete_password: "delete_me",
          thread_id: last_thread_id,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "_id");
          assert.property(res.body, "text");
          assert.property(res.body, "created_on");
          last_reply_id = res.body._id;
          done();
        });
    });
    test("#5 GET /api/replies/{board}", function (done) {
      chai
        .request(server)
        .get(`/api/replies/func_test?thread_id=${last_thread_id}`)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "_id");
          assert.property(res.body, "created_on");
          assert.property(res.body, "bumped_on");
          assert.property(res.body, "replies");
          done();
        });
    });
    test("#6 PUT /api/replies/{board}", function (done) {
      chai
        .request(server)
        .put("/api/threads/func_test")
        .send({ thread_id: last_thread_id, reply_id: last_reply_id })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "reported");
          done();
        });
    });
    test("#7 DELETE /api/replies/{board} incorrect password", function (done) {
      chai
        .request(server)
        .delete("/api/replies/func_test")
        .send({ reply_id: last_reply_id, delete_password: "delete_me_wrong" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "incorrect password");
          done();
        });
    });
    test("#8 DELETE /api/replies/{board} correct password", function (done) {
      chai
        .request(server)
        .delete("/api/replies/func_test")
        .send({ reply_id: last_reply_id, delete_password: "delete_me" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "success");
          done();
        });
    });
    test("#9 DELETE /api/threads/{board} incorrect password", function (done) {
      chai
        .request(server)
        .delete("/api/threads/func_test")
        .send({ thread_id: last_thread_id, delete_password: "delete_me_wrong" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "incorrect password");
          done();
        });
    });
    test("#10 DELETE /api/threads/{board} correct password", function (done) {
      chai
        .request(server)
        .delete("/api/threads/func_test")
        .send({ thread_id: last_thread_id, delete_password: "delete_me" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "success");
          done();
        });
    });
  });
});
