"use strict";
/**
 * Compile po to json
 * @author zuojiazi@vip.qq.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
var PO = require("pofile");
var glob = require("glob");
var fs = require("fs");
var path_1 = require("path");
var references_1 = require("../references");
var Compiler = /** @class */ (function () {
    function Compiler(options) {
        this.options = {
            sourcePath: 'i18n',
            tragetPath: 'i18n',
        };
        if (options) {
            Object.assign(this.options, options);
        }
    }
    Compiler.prototype.run = function () {
        var _this = this;
        var cwd = this.options.sourcePath;
        if (!fs.existsSync(this.options.tragetPath)) {
            fs.mkdirSync(this.options.tragetPath);
        }
        var _loop_1 = function (filename) {
            PO.load(path_1.join(cwd, filename), function (error, po) {
                var data = new Package(po.headers.Language, {});
                for (var _i = 0, _a = po.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var id = item.msgid;
                    var ctx = item.msgctxt || references_1.DEFAULT_CTX;
                    if (item.msgstr[0].length > 0 && !item.flags.fuzzy) {
                        if (!data.contexts[ctx]) {
                            data.contexts[ctx] = {};
                        }
                        data.contexts[ctx][id] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                    }
                }
                fs.writeFileSync(path_1.join(_this.options.tragetPath, filename.replace('.po', '.json')), JSON.stringify(data));
            });
        };
        for (var _i = 0, _a = glob.sync('*.po', { cwd: cwd }); _i < _a.length; _i++) {
            var filename = _a[_i];
            _loop_1(filename);
        }
    };
    return Compiler;
}());
exports.Compiler = Compiler;
var Package = /** @class */ (function () {
    function Package(language, contexts) {
        this.language = language;
        this.contexts = contexts;
    }
    return Package;
}());
