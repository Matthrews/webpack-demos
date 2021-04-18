import a from "./a";

console.log(a)

import("./b").then(function(b) {
	console.log("b loaded", b);
})

function loadC(name) {
	return import("./templates/" + name);
}

Promise.all([loadC("1"), loadC("2")]).then(function(arr) {
	console.log("templates/1 and templates/2 loaded", arr);
});

async function getTemplate(templateName) {
	try {
		let template = await import(`./templates/${templateName}`);
		console.log(template);
	} catch(err) {
		console.error("template error");
		return new Error(err);
	}
}

getTemplate("foo");
getTemplate("bar");
getTemplate("baz");
