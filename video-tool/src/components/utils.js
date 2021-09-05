export const colourPalette = [
    "#48AFF0", "#3DCC91", "#FFB366",
    "#FF7373", "#FF6E4A", "#FF66A1",
    "#C274C2", "#AD99FF", "#669EFF",
    "#2EE6D6", "#62D96B", "#FFC940"]

function* colourGenerator(colours) {
    // FIXME this is duplicated for colour palette
    let i = 0;

    while (true) {
        yield colours[i]
        console.log(i);
        i = i % colours.length;
    }
}

export const colourGen = colourGenerator(colourPalette);


//https://stackoverflow.com/questions/7193238/wait-until-a-condition-is-true/52652681#52652681
//https://stackoverflow.com/questions/22125865/wait-until-flag-true?answertab=votes#tab-top
const until = async conditionFunction => {
    const delay = () => {
        return new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (conditionFunction()) {
        return;
    } else {
        await delay();
        await until(conditionFunction);
    }
}

/* Calculate the hamming distance for two hashes in hex format */
// https://github.com/commonsmachinery/blockhash-js/blob/master/index.js
export function hammingDistance(hash1, hash2) {
    const one_bits = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];

    let d = 0;

    if (hash1.length !== hash2.length) {
        throw new Error("Can't compare hashes with different length");
    }

    for (let i = 0; i < hash1.length; i++) {
        let n1 = parseInt(hash1[i], 16);
        let n2 = parseInt(hash2[i], 16);
        d += one_bits[n1 ^ n2];
    }
    return d;
};