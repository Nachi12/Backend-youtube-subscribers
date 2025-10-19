const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const app = require("../app"); 
const Subscriber = require("../models/subscribers");

chai.should();
chai.use(chaiHttp);

describe("🎬 YouTube Subscribers API Tests", () => {
  let testSubscriber;

 
  before(async () => {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/youtubeSubscribersTest";

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear previous data
    await Subscriber.deleteMany({});

    // Insert one test document
    testSubscriber = await Subscriber.create({
      name: "Test User",
      subscribedChannel: "TechChannel",
      subscribedDate: new Date(),
    });
  });

  // After tests, clean up
  after(async () => {
    await mongoose.connection.close();
  });

  // Test 1: Get all subscribers
  it("✅ should GET all subscribers", (done) => {
    chai
      .request(app)
      .get("/subscribers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.greaterThan(0);
        done();
      });
  });

  // Test 2: Get subscribers names only
  it("✅ should GET subscribers with only name and subscribedChannel", (done) => {
    chai
      .request(app)
      .get("/subscribers/names")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("subscribedChannel");
        res.body[0].should.not.have.property("_id");
        done();
      });
  });

  // Test 3: Get subscriber by valid ID
  it("✅ should GET subscriber by valid ID", (done) => {
    chai
      .request(app)
      .get(`/subscribers/${testSubscriber._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eq("Test User");
        done();
      });
  });

  // Test 4: Invalid ID should return 400
  it("❌ should return 400 for invalid subscriber ID", (done) => {
    chai
      .request(app)
      .get("/subscribers/invalidid123")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        done();
      });
  });
});
