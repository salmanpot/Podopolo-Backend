import express from "express";
import {
  createTweet,
  deleteTweet,
  getUserFeed,
  getUserTweet,
  handleTweetLikeStatus,
  updateTweet,
} from "../../controllers/tweet.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { getUserTweets, likeTweet } from "../../services/tweet.service";
import * as tweetValidations from "../../validations/tweet.validation";
const tweetRoute = express.Router();

tweetRoute.get("/feed", auth("tweet"), getUserFeed);

tweetRoute.get("/", auth("tweet"), getUserTweets);

tweetRoute.post(
  "/create",
  [auth("tweet"), validate(tweetValidations.createTweet)],
  createTweet
);

tweetRoute.delete("/:id", auth("tweet"), getUserTweet);

tweetRoute.patch(
  "/:id",
  [auth("tweet"), validate(tweetValidations.tweetUpdate)],
  updateTweet
);

tweetRoute.patch(
  "/like/:id",
  [auth("tweet"), validate(tweetValidations.likeTweet)],
  handleTweetLikeStatus
);

export default tweetRoute;
