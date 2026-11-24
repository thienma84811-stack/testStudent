function calculateAverage(scores){
    if(scores.length === 0){
        return null;
    }
    let tong = 0;
    for(const score of scores){
        tong += score;
    }return tong / scores.length;
}

function calculateHighestScore(scores){
    if(scores.length === 0){
        return null;
    }
    let highest = scores[0];
    for(const score of scores){
        if(score>highest){
            highest = score;
        }
    }return highest;
}

function calculateLowestScore(scores){
    if(scores.length === 0){
        return null;
    }
    let lowest = scores[0];
    for(const score of scores){
        if(score<lowest){
            lowest = score;
        }
    }return lowest;
}

function calculateStandardDeviation(scores){
    if(scores.length === 0){
        return null;
    }
    let average = calculateAverage(scores);
    let squaredDiffTotal = 0;
    for(const score of scores){
        squaredDiffTotal += (score - average)**2;
    }
    const variance = squaredDiffTotal / scores.length;
    return Math.sqrt(variance);
}
module.exports = {
    calculateAverage,
    calculateHighestScore,
    calculateLowestScore,
    calculateStandardDeviation
};