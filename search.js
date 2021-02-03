function levDist(x, y) {
	const dp = new Array(x.length + 1);
	for (let i = 0; i <= x.length; i++) {
		dp[i] = Array(y.length + 1).fill(0);
		for (let j = 0; j <= y.length; j++) {
			if (i == 0) {
				dp[i][j] = j;
			} else if (j == 0) {
				dp[i][j] = i;
			} else {
				dp[i][j] = Math.min(dp[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1),
							Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1));
			}
		}
	}
	
	return dp[x.length][y.length];
}

class LevComparator {
	constructor(compareTo) {
		this.compareTo = compareTo.toUpperCase();
		this.map = {};
	}
	
	compare(s1, s2) {
		let val1, val2;
		if (this.map[s1 = s1.toUpperCase()]) {
			val1 = this.map[s1];
		} else {
			val1 = levDist(this.compareTo, s1);
			this.map[s1] = val1;
		}
		if (this.map[s2 = s2.toUpperCase()]) {
			val2 = this.map[s2];
		} else {
			val2 = levDist(this.compareTo, s2);
			this.map[s2] = val2;
		}
		
		return val1 - val2;
	}
}