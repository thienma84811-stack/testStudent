function updateRating(rating, difficulty, result, k=32){
    let e = 1 / (1+10**((difficulty - rating) / 400));
    let newRating = rating + k*(result - e);
    return newRating;
}
module.exports = {updateRating};