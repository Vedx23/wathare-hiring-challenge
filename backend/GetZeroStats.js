const getZeroStats = (data) => {
    let zeroCount = 0;
    let oneCount = 0;
    let maxConsecutiveOnes = 0;
    let currentConsecutiveOnes = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].machine_status === 0) {
            zeroCount++;
            if (currentConsecutiveOnes > maxConsecutiveOnes) {
                maxConsecutiveOnes = currentConsecutiveOnes;
            }
            currentConsecutiveOnes = 0;
        } else if (data[i].machine_status === 1) {
            oneCount++;
            currentConsecutiveOnes++;
        }
    }

    return {
        "zeroCount": zeroCount,
        "oneCount": oneCount,
        "maxOnes": maxConsecutiveOnes,
    }
}


module.exports = getZeroStats;