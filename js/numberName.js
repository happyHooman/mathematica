dayNames = {
	1: 'unu',
	2: 'doi',
	3: 'trei',
	4: 'patru',
	5: 'cinci',
	6: 'șase',
	7: 'șapte',
	8: 'opt',
	9: 'nouă',
	10: 'zece',
	11: 'unsprezece',
	14: 'paisprezece',
	16: 'șaisprezece',
	20: 'douăzeci',
	60: 'șaizeci',
	100: 'o sută',
	200: 'două sute'
};

function numberName(number) {
	if (dayNames[number]) return dayNames[number];
	else {
		if (number <= 20) {
			return dayNames[number - 10] + 'sprezece';
		} else if (number < 100) {
			const zeci = Math.floor(number / 10);
			const unitati = number % 10;
			if (unitati > 0) return numberName(zeci * 10) + ' și ' + dayNames[unitati];
			else return numberName(zeci) + 'zeci';
		} else if (number < 1000) {
			const sute = Math.floor(number / 100);
			const rest = number % 100;
			if (rest > 0) return numberName(sute * 100) + ' ' + numberName(rest);
			else return numberName(sute) + ' sute';
		} else {
			return 'nu stiu';
		}
	}
}