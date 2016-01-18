'use strict';

Handlebars.registerHelper('fromNow', function (string) {
    return string ? moment(string).fromNow() : '';
});

Handlebars.registerHelper('quoteIfWhitespace', function (string) {
    return (/\s/.test(string) ? '"' + string + '"' : string
    );
});

/*
 * Grab metadata from repo attributes to create build.gradle syntax.
 * Example metadata:
 * "attribute_names": [
 *  {"name": "pluginScope", "values" : ["compile"], "type": "string"}
 * ]
 */
Handlebars.registerHelper('gradleFormat', function (plugin) {
    var pluginScope = "";
    // TODO: implement these
    var buildScript = "";
    var applyPlugin = "";
    var sourceSets = "";

    plugin.attribute_names.forEach(function (attributes) {
        if (attributes.name == "pluginScope" && plugin.dependency) {
            pluginScope += "\ndependencies {\n";
            pluginScope += "    " + attributes.values + " '" + plugin.dependency + "'\n";
            pluginScope += "}\n";
        }
    });

    if (pluginScope == "" && plugin.dependency) {
        pluginScope += "\ndependencies {\n";
        pluginScope += "    compile '" + plugin.dependency + "'\n";
        pluginScope += "}\n";
    }

    return buildScript + applyPlugin + pluginScope + sourceSets;
});

var grailsplugins = {};

window.onload = function () {
    window.app = new grailsplugins.App();
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

grailsplugins.App = function () {
    function _class() {
        _classCallCheck(this, _class);

        grailsplugins.Plugins.fetch().then(this.onPluginsFetch.bind(this));
    }

    _createClass(_class, [{
        key: 'onHashChange',
        value: function onHashChange(e) {
            e.preventDefault();
            e.stopPropagation();
            this.route();
        }
    }, {
        key: 'route',
        value: function route() {
            var hashId = window.location.hash;

            if (hashId && hashId.indexOf('#plugin/') === 0) {
                this.showPlugin(hashId.substring('#plugin/'.length));
            } else {
                var q = hashId && hashId.indexOf('#q/') === 0 ? hashId.substring('#q/'.length) : '';
                this.showSearch(q);
            }
        }
    }, {
        key: 'onPluginsFetch',
        value: function onPluginsFetch(plugins) {
            window.addEventListener('hashchange', this.onHashChange.bind(this), false);

            this.plugins = plugins;
            this.searchView = new grailsplugins.SearchView($('.search-page'), this.plugins);
            this.pluginView = new grailsplugins.PluginView($('.plugin-page'));

            this.route();
        }
    }, {
        key: 'showSearch',
        value: function showSearch() {
            var q = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            this.searchView.$el.removeClass('hide');
            this.pluginView.$el.addClass('hide');
            this.searchView.search(q);
        }
    }, {
        key: 'showPlugin',
        value: function showPlugin(pluginName) {
            this.searchView.$el.addClass('hide');
            this.pluginView.$el.removeClass('hide');
            var plugin = this.plugins.findByName(pluginName);
            this.pluginView.showPlugin(plugin);
        }
    }]);

    return _class;
}();
this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["labels"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "        <a href=\"#q/label:"
    + escapeExpression(((helpers.quoteIfWhitespace || (depth0 && depth0.quoteIfWhitespace) || helperMissing).call(depth0, depth0, {"name":"quoteIfWhitespace","hash":{},"data":data})))
    + "\" class=\"searchby-label\"><span class=\"label\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</span></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"plugin-labels\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.labels : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"useData":true});
this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["plugin"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <div class=\"input-group dependency-clip\">\n                <input type=\"text\" class=\"form-control\" value=\""
    + escapeExpression(((helper = (helper = helpers.dependency || (depth0 != null ? depth0.dependency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dependency","hash":{},"data":data}) : helper)))
    + "\" readonly>\n                <div class=\"input-group-addon btn clippy\"><span class=\"glyphicon glyphicon-copy\" aria-hidden=\"true\"></span></div>\n            </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <a href=\""
    + escapeExpression(((helper = (helper = helpers.githubHref || (depth0 != null ? depth0.githubHref : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"githubHref","hash":{},"data":data}) : helper)))
    + "\"><img src=\"src/img/plainicon.com-50224-svg.svg\"></a>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <div class=\"plugin-labels\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.labels : depth0), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n";
},"6":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "                <a href=\"#q/label:"
    + escapeExpression(((helpers.quoteIfWhitespace || (depth0 && depth0.quoteIfWhitespace) || helperMissing).call(depth0, depth0, {"name":"quoteIfWhitespace","hash":{},"data":data})))
    + "\" class=\"searchby-label\"><span class=\"label\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</span></a>\n";
},"8":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <div class=\"gradle-format\">\n            <pre>"
    + escapeExpression(((helpers.gradleFormat || (depth0 && depth0.gradleFormat) || helperMissing).call(depth0, depth0, {"name":"gradleFormat","hash":{},"data":data})))
    + "</pre>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"plugin-info\">\n    <div>\n        <a class=\"plugin-name\" href=\"#plugin/"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.dependency : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <span class=\"external-links\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.githubHref : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            <a href=\""
    + escapeExpression(((helper = (helper = helpers.bintrayHref || (depth0 != null ? depth0.bintrayHref : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bintrayHref","hash":{},"data":data}) : helper)))
    + "\"><img src=\"src/img/bintray-black.png\"></a>\n        </span>\n    </div>\n    <span class=\"plugin-description\">"
    + escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"desc","hash":{},"data":data}) : helper)))
    + "</span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.labels : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <div>\n        <label>version</label>\n        <span class=\"\">"
    + escapeExpression(((helper = (helper = helpers.latest_version || (depth0 != null ? depth0.latest_version : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"latest_version","hash":{},"data":data}) : helper)))
    + "</span>\n        <label>updated</label>\n        <span class=\"plugin-updated\">"
    + escapeExpression(((helpers.fromNow || (depth0 && depth0.fromNow) || helperMissing).call(depth0, (depth0 != null ? depth0.updated : depth0), {"name":"fromNow","hash":{},"data":data})))
    + "</span>\n        <label>owner</label>\n        <a href=\"#q/owner:"
    + escapeExpression(((helpers.quoteIfWhitespace || (depth0 && depth0.quoteIfWhitespace) || helperMissing).call(depth0, (depth0 != null ? depth0.owner : depth0), {"name":"quoteIfWhitespace","hash":{},"data":data})))
    + "\" class=\"searchby-owner\"><span class=\"owner\">"
    + escapeExpression(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"owner","hash":{},"data":data}) : helper)))
    + "</span></a>\n    </div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.dependency : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n<div class=\"readme\"></div>\n";
},"useData":true});
this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["plugins"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "        <li>\n            <div>\n                <a class=\"plugin-name\" href=\"#plugin/"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n                <!--<span class=\"plugin-dependency pull-right\"><code>"
    + escapeExpression(((helper = (helper = helpers.dependency || (depth0 != null ? depth0.dependency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dependency","hash":{},"data":data}) : helper)))
    + "</code></span>-->\n                <span class=\"external-links \">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.githubHref : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.bintrayHref || (depth0 != null ? depth0.bintrayHref : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bintrayHref","hash":{},"data":data}) : helper)))
    + "\"><img src=\"src/img/bintray-black.png\"></a>\n                </span>\n            </div>\n            <span class=\"plugin-description\">"
    + escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"desc","hash":{},"data":data}) : helper)))
    + "</span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.labels : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            <div>\n                <label>version</label>\n                <span class=\"\">"
    + escapeExpression(((helper = (helper = helpers.latest_version || (depth0 != null ? depth0.latest_version : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"latest_version","hash":{},"data":data}) : helper)))
    + "</span>\n                <label>updated</label>\n                <span class=\"plugin-updated\">"
    + escapeExpression(((helpers.fromNow || (depth0 && depth0.fromNow) || helperMissing).call(depth0, (depth0 != null ? depth0.updated : depth0), {"name":"fromNow","hash":{},"data":data})))
    + "</span>\n                <label>owner</label>\n                <a href=\"#q/owner:"
    + escapeExpression(((helpers.quoteIfWhitespace || (depth0 && depth0.quoteIfWhitespace) || helperMissing).call(depth0, (depth0 != null ? depth0.owner : depth0), {"name":"quoteIfWhitespace","hash":{},"data":data})))
    + "\" class=\"searchby-owner\"><span class=\"owner\">"
    + escapeExpression(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"owner","hash":{},"data":data}) : helper)))
    + "</span></a>\n            </div>\n        </li>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <a href=\""
    + escapeExpression(((helper = (helper = helpers.githubHref || (depth0 != null ? depth0.githubHref : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"githubHref","hash":{},"data":data}) : helper)))
    + "\"><img src=\"src/img/plainicon.com-50224-svg.svg\"></a>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "                <div class=\"plugin-labels\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.labels : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "                        <a href=\"#q/label:"
    + escapeExpression(((helpers.quoteIfWhitespace || (depth0 && depth0.quoteIfWhitespace) || helperMissing).call(depth0, depth0, {"name":"quoteIfWhitespace","hash":{},"data":data})))
    + "\" class=\"searchby-label\"><span class=\"label\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</span></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"search-count\">\n    <span>"
    + escapeExpression(((helper = (helper = helpers.searchCount || (depth0 != null ? depth0.searchCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"searchCount","hash":{},"data":data}) : helper)))
    + "</span>\n    <div class=\"dropdown pull-right search-select\">\n        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            Sort\n            <span class=\"caret\"></span>\n        </a>\n        <ul class=\"dropdown-menu\">\n            <li>\n                <a href=\"#\" data-sort=\"name\">\n                    <span class=\"glyphicon glyphicon-ok checkmark\" aria-hidden=\"true\"></span>\n                    Name\n                </a>\n            </li>\n            <li>\n                <a href=\"#\" data-sort=\"date\">\n                    <span class=\"glyphicon glyphicon-ok checkmark\" aria-hidden=\"true\"></span>\n                    Date\n                </a>\n            </li>\n        </ul>\n    </div>\n</div>\n<ul class=\"plugins-list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.plugins : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n";
},"useData":true});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

grailsplugins.PluginView = function () {
    function _class($el) {
        _classCallCheck(this, _class);

        this.$el = $el;
    }

    _createClass(_class, [{
        key: 'showPlugin',
        value: function showPlugin(plugin) {
            var _this = this;

            this.clipboard && this.clipboard.destroy();

            this.$el.html(Handlebars.templates['plugin'](plugin));
            if (plugin.githubRepo) {
                $.ajax({
                    url: 'https://api.github.com/repos/' + plugin.githubRepo + '/readme',
                    headers: { 'Accept': 'application/vnd.github.VERSION.html' },
                    type: 'GET'
                }).done(function (html) {
                    _this.$el.find('.readme').html(html);
                }).fail(function (jqXhr) {
                    if (jqXhr.status === 404) {
                        _this.$el.find('.readme').html('<span class="not-found">Readme not available.</span>');
                    }
                });
            }

            if (plugin.dependency) {
                (function () {
                    _this.clipboard = new Clipboard('.plugin-page .dependency-clip .clippy', {
                        text: function text(trigger) {
                            return $(trigger).closest('.input-group').find('input').val();
                        }
                    });

                    var $clippy = _this.$el.find('.clippy');
                    $clippy.tooltip({
                        title: 'Copied!',
                        trigger: 'manual'
                    });

                    $clippy.click(function (e) {
                        e.preventDefault();
                        $clippy.tooltip('show');
                        _.delay(function () {
                            return $clippy.tooltip('hide');
                        }, 2000);
                    });
                })();
            }
        }
    }]);

    return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

grailsplugins.Plugins = function () {
    _createClass(_class, null, [{
        key: 'fetch',
        value: function fetch() {
            return $.get('build/dist/data/plugins.json').then(function (data) {
                return new grailsplugins.Plugins(data);
            });
        }
    }]);

    function _class(data) {
        _classCallCheck(this, _class);

        this._plugins = _.sortBy(data, function (pluginData) {
            return pluginData.name.toLowerCase();
        });

        var labelsToIgnore = ['grails plugin', 'grails', 'plugin', 'plugins'];

        this._plugins.forEach(function (pluginData) {
            var _$chain;

            if (pluginData.system_ids.length) {
                pluginData.dependency = pluginData.system_ids[0] + ':' + pluginData.latest_version;
            }
            pluginData.labels = (_$chain = _.chain(pluginData.labels)).without.apply(_$chain, labelsToIgnore).sortBy(function (it) {
                return it.toLowerCase();
            }).value();

            pluginData.bintrayHref = 'https://bintray.com/' + pluginData.owner + '/' + pluginData.repo + '/' + pluginData.name;
            if (pluginData.vcs_url.indexOf('github') !== -1) {
                pluginData.githubHref = pluginData.vcs_url;

                var matchResult = pluginData.vcs_url.match(/.*github\.com\/([^\/]+\/[^\/]+)/);
                if (matchResult) {
                    pluginData.githubRepo = matchResult[1];
                }
            }
        });

        this._allLabels = _.chain(this._plugins).pluck('labels').flatten().unique().sortBy(function (it) {
            return it.toLowerCase();
        }).value();
    }

    _createClass(_class, [{
        key: 'search',
        value: function search(val) {
            var _this = this;

            var sort = arguments.length <= 1 || arguments[1] === undefined ? 'name' : arguments[1];

            var matches = this._plugins;

            if (val) {
                (function () {
                    var labelMatch = val.match(/label:"?([^"]*)"?/);
                    var ownerMatch = val.match(/owner:"?([^"]*)"?/);

                    if (labelMatch) {
                        matches = _this._plugins.filter(function (pluginData) {
                            return _.contains(pluginData.labels, labelMatch[1]);
                        });
                    } else if (ownerMatch) {
                        matches = _this._plugins.filter(function (pluginData) {
                            return pluginData.owner === ownerMatch[1];
                        });
                    } else {
                        matches = _this._plugins.filter(function (pluginData) {
                            return pluginData.name.toLowerCase().indexOf(val.toLowerCase()) !== -1;
                        });
                    }
                })();
            }

            if (sort === 'name') {
                matches = _.sortBy(matches, function (it) {
                    return it.name.toLowerCase();
                });
            } else if (sort === 'date') {
                matches = _.sortBy(matches, function (it) {
                    return it.updated ? new Date(it.updated) : undefined;
                }).reverse();
            }

            return matches;
        }
    }, {
        key: 'findByName',
        value: function findByName(name) {
            return _.findWhere(this._plugins, { name: name });
        }
    }, {
        key: 'getLabels',
        value: function getLabels() {
            return this._allLabels;
        }
    }]);

    return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

grailsplugins.SearchView = function () {
    function _class($el, plugins) {
        var _this = this;

        _classCallCheck(this, _class);

        this.$el = $el;
        this.plugins = plugins;
        this.sort = 'name';

        $el.find('.labels-section').html(Handlebars.templates['labels']({ labels: this.plugins.getLabels() }));

        $el.find('.search-input').keyup(this.doSearch.bind(this));
        $el.find('.clear-search').click(function (event) {
            event.preventDefault();
            if (window.location.hash) {
                window.location.href = '#';
            } else {
                _this.search('');
            }
        });

        $el.delegate('.search-select .dropdown-menu a', 'click', function (e) {
            e.preventDefault();
            _this.sort = $(e.currentTarget).data('sort');
            _this.doSearch();
        });

        this.doSearch();
    }

    _createClass(_class, [{
        key: 'search',
        value: function search(value) {
            this.$el.find('.search-input').val(value);
            this.doSearch();
        }
    }, {
        key: 'doSearch',
        value: function doSearch() {
            var val = this.$el.find('.search-input').val();
            this.$el.find('.clear-search').toggleClass('hide', !val);

            var matches = this.plugins.search(val, this.sort);

            var searchCount = undefined;
            if (!val) {
                searchCount = 'Showing all ' + matches.length + ' plugins';
            } else if (!matches.length) {
                searchCount = 'No matching plugins';
            } else {
                searchCount = 'Showing ' + matches.length + ' matching ' + (matches.length === 1 ? 'plugin' : 'plugins');
            }

            this.$el.find('.search-results').html(Handlebars.templates['plugins']({
                plugins: matches,
                searchCount: searchCount
            }));
            this.$el.find('.search-select .dropdown-menu a[data-sort="' + this.sort + '"]').addClass('selected');
        }
    }]);

    return _class;
}();