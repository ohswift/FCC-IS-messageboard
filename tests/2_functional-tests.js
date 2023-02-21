const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

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
          assert.property(res.body, "replies");
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
          assert.property(res.body[0], "replies");
          done();
        });
    });
    test("#3 PUT /api/threads/{board}", function (done) {
      chai
        .request(server)
        .put("/api/threads/func_test")
        .send({ text: "fcc_test", delete_password: "delete_me" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "_id");
          assert.property(res.body, "reported");
          assert.property(res.body, "created_on");
          assert.property(res.body, "bumped_on");
          assert.property(res.body, "replies");
          done();
        });
    });
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
          assert.property(res.body, "replies");
          done();
        });
    });
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
          assert.property(res.body, "replies");
          done();
        });
    });
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
          assert.property(res.body, "replies");
          done();
        });
    });
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
          assert.property(res.body, "replies");
          done();
        });
    });
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
          assert.property(res.body, "replies");
          done();
        });
    });
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
          assert.property(res.body, "replies");
          done();
        });
    });
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
          assert.property(res.body, "replies");
          done();
        });
    });
  });
});
