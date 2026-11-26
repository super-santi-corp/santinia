const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const registerDynamicPages = require('./scripts/dynamic');

const website = express();
const port = process.env.PORT ?? 3000;

website.disable('x-powered-by');
website.set('view engine', 'ejs');
website.set('views', './views'); // Or wherever your views/pages are stored

// 1. Explicit dynamic pages (like your admin reset counter)
registerDynamicPages(website);

// 2. Automatic EJS page router
website.get('/:page(*)?', (req, res, next) => {
	// Default to 'index' if no page is specified (root URL '/')
	let page = req.params.page || 'index';

	// Strip trailing slashes using a clean while-loop and string methods
	while (page.endsWith('/')) {
		page = page.slice(0, -1);
	}
	if (page === '') page = 'index';

	// Security check: prevent directory traversal attacks (e.g. /../secret)
	if (page.includes('..') || path.isAbsolute(page)) {
		return next();
	}

	const viewPath = path.join(website.get('views'), `${page}.ejs`);

	// Check if a corresponding .ejs file exists before rendering
	if (fs.existsSync(viewPath)) {
		res.render(page, (err, html) => {
			if (err) return next(err);
			res.send(html);
		});
	} else {
		// If the template doesn't exist, move to the next middleware (static files / 404)
		next();
	}
});

// 3. Fallback for true static assets (CSS, images, favicons) in 'www/'
website.use(express.static(path.join(__dirname, 'www')));

// 4. Final 404 catch-all
website.all('*', (req, res) => {
	res.status(404).sendFile(path.join(process.cwd(), '404.html'));
});

website.listen(port, () => console.log(`Listo en: http://localhost:${port}/`));
