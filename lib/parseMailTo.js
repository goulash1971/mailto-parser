// parseMailTo (based upon parseUri 1.2.2)
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseMailTo (str, mode) {
	var	o   = parseMailTo.options;
	if (mode === undefined) mode = (o.strictMode ? "strict" : "loose");
	var	m   = o.parser[mode].exec(str),
	    k   = o.keys[mode],
	    mailTo = {protocol: "urn"},
        i   = k.length;
	
	while (i--) mailTo[k[i]] = m[i] || "";

	mailTo[o.t.name] = [];
	mailTo[k[(mode === "strict" ? 1 : 2)]].replace(o.t.parser, function ($0, $1) {
		if ($1) {
			mailTo[o.t.name].push($1)
		}
	});

	mailTo[o.a.name] = {};
	mailTo[k[(mode === "strict" ? 3 : 4)]].replace(o.a.parser, function ($0, $1, $2) {
		if ($1) {
			if (mailTo[o.a.name][$1] === undefined) {
				mailTo[o.a.name][$1] = $2;
			} else if (typeof mailTo[o.a.name][$1] === '[object Array]') {
				mailTo[o.a.name][$1].push($2);
			} else if (typeof uri[o.q.name][$1] === 'string') {
				mailTo[o.a.name][$1] = [ mailTo[o.a.name][$1], $2];
			}
		}
	});
	
	return mailTo;
};

parseMailTo.options = {
	strictMode: false,
	keys: {
		strict: ["source","to","specification","attributes"],
		loose:  ["source","protocol","to","specification","attributes"]
	},
	a:   {
		name:   "attributeKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	t:   {
		name:   "addresses",
		parser: /(?:^|,)([^,]*)?/g
	},
	parser: {
		strict: /^mailto:((?:(?:(?:[^:@]*)@)(?:[^:?]*)))?((?:[^?]*)(?:\?([^]*))?)/i,
		loose: /^((?:[a-z][a-z]+)):((?:(?:(?:[^:@]*)@)(?:[^:?]*)))?((?:[^?]*)(?:\?([^]*))?)/i
	}
};

module.exports = parseMailTo;