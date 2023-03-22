const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: "Review cannot be found.",
  });
}

async function destroy(req, res) {
  const reviewId = res.locals.review.review_id;
  await service.destroy(reviewId);
  res.sendStatus(204).json("No content");
}

/*async function update(req, res) {
  const { data: { content, score } } = req.body;
  const { review_id } = res.locals.review;
  const updatedReview = {
    review_id,
    content,
    score,
  };
  console.log(updatedReview);
  const criticsInfo = await service.update(updatedReview);
  updatedReview.critic = criticsInfo;
  res.json({ data: updatedReview });
}*/

async function update(req, res) {
  console.log("req.body:", req.body);
  const review = res.locals.review;
  const updatedReview = { ...review };

  if (req.body.data) {
    const { content, score } = req.body.data;
    if (content) updatedReview.content = content;
    if (score) updatedReview.score = score;
  }
  console.log("updatedReview:", updatedReview);
  const criticsInfo = await service.update(updatedReview);
  console.log("criticsInfo:", criticsInfo);
  updatedReview.critic = criticsInfo;

  res.json({ data: updatedReview });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
