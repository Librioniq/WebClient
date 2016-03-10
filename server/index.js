
var fs = require("fs");
var path = require("path");
var html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"), "utf-8");
var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var config = require('./config');

module.exports = function(options) {
    function SimpleRenderer(options) {
        this.html = html
            .replace("STYLE_URL", options.styleUrl)
            .replace("SCRIPT_URL", options.scriptUrl);
    }

    SimpleRenderer.prototype.render = function(_path, callback) {
        callback(null, this.html);
    };
    // load bundle information from stats
    var stats = require("../webpack-assets.json")

    var publicPath = stats.publicPath;

    var renderer = new SimpleRenderer({
        styleUrl: "_assets" + stats.styles.main,
        scriptUrl: "_assets" + stats.javascript.main
    });

    var app = express();

    // serve the static assets
    app.use("/_assets/dist", express.static(path.join(__dirname, "..", "static", "dist"), {
        maxAge: "200d" // We can cache them as they include hashes
    }));
    app.use("/", express.static(path.join(__dirname, ".."), {
    }));

    app.get("/*", function(req, res) {
        renderer.render(
            req.path,
            function(err, html) {
                if (err) {
                    res.statusCode = 500;
                    res.contentType = "text; charset=utf8";
                    res.end(err.message);
                    return;
                }
                res.contentType = "text/html; charset=utf8";
                res.end(html);
            }
        );
    });

    //app.use(serveStatic(config.publicPath, {'index': ['index.html']}));

    var server = http.createServer(app);

    server.listen(config.port, function() {
        console.log('listening on http://localhost:' + config.port);
        console.log(__dirname);
    });
};
