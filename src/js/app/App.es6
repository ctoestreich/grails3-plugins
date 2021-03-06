grailsplugins.App = class {

    constructor() {
        grailsplugins.Plugins.fetch().then(this.onPluginsFetch.bind(this));
    }

    onHashChange(e) {
        e.preventDefault();
        e.stopPropagation();
        this.route();
    }

    route() {
        var hashId = window.location.hash;

        if (hashId && hashId.indexOf('#plugin/') === 0) {
            this.showPlugin(hashId.substring('#plugin/'.length));
        } else {
            let q = hashId && hashId.indexOf('#q/') === 0 ? hashId.substring('#q/'.length) : '';
            this.showSearch(q);
        }
    }

    onPluginsFetch(plugins) {
        window.addEventListener('hashchange', this.onHashChange.bind(this), false);

        this.plugins = plugins;
        this.searchView = new grailsplugins.SearchView($('.search-page'), this.plugins);
        this.pluginView = new grailsplugins.PluginView($('.plugin-page'));

        this.route();
    }

    showSearch(q = '') {
        this.searchView.$el.removeClass('hide');
        this.pluginView.$el.addClass('hide');
        this.searchView.search(q);
    }

    showPlugin(pluginName) {
        this.searchView.$el.addClass('hide');
        this.pluginView.$el.removeClass('hide');
        let plugin = this.plugins.findByName(pluginName);
        this.pluginView.showPlugin(plugin);
    }
};
