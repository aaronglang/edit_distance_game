/**
 * Calculate edit distance between two strings. Strings can be a series of letters or words
 * @param a {string} Human input
 * @param b {string} Transcribed output
 * @param debug {boolean} prints the table used to calculate distance
 * @return {number} Return number
 */

const edit_distance = function(a, b, debug) {
    if(!a || !b) {
        console.log('\n\tPlease provide input and transcribed strings\n\tExample: node index.js \'abcdef\' \'abodfg\'\n');
        return 0;
    }
	let m = [];
	// split string according to number of words -> if one word in each -> split into individual characters for comparison
	a = a.split(/\s/);
	b = b.split(/\s/);

	// if input is single string -> split characters to compare
	if(a.length === 1 && 1 === b.length) {
		a = a[0].split('');
		b = b[0].split('');
	}

	// if either a or b do not exist the edit distance is equal to the existing string's length
    if(!a || !b) return (a || b).length;

    // if the strings exist -> build matrix of character (or word) comparisons
    for(let i = 0; i <= b.length; i++){
    	// initialize horizontal column 
        m[i] = [i];
        if(i === 0) {
        	continue; 
        }
        for(let j = 0; j <= a.length; j++){
        	// initialize vertical column
            m[0][j] = j;
            // skip first value in sub-array - always 0
            if(j === 0) {
            	continue;
            }
            // compare words in array
            if(b[i - 1] === a[j - 1]) {
            	// if words match -> make the distance equal to the last distance
            	m[i][j] = m[i - 1][j - 1]
            } else {
            	// if words do not match -> increment the distance by 1
            	m[i][j] = Math.min(m[i-1][j-1] + 1, m[i][j-1] + 1,m[i-1][j] + 1);
            }
        }
    }
    let distance = m[b.length][a.length];

    // log table if debug=true
    if(debug) {
        if(process.version.match(/(?<=v)\d{1,2}(?=\.)/)[0] >= 10) console.table(m);
        else console.log(m);
    }
    return distance;
};

module.exports = {
    edit_distance
};