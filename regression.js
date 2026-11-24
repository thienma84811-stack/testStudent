function predictScore(data, hoursToPredict){
    let sumHours = 0;
    let sumScore = 0;
    for(const item of data){
        sumHours += item.hours;
        sumScore += item.score;
    }
    let meanHours = sumHours / data.length;
    let meanScore = sumScore / data.length;
    let numerator = 0;
    let denominator = 0;
    for(let i = 0; i<data.length; i++){
        const item = data[i];
        numerator += (item.hours - meanHours) * (item.score - meanScore);
        denominator += (item.hours - meanHours)**2;
    }
    if(denominator === 0){
        return null;
    }
    let b = numerator / denominator;
    let a = meanScore - b*meanHours;
    let y = a + b*hoursToPredict;
    return y;
}
module.exports = {predictScore};