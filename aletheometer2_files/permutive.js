!function (n, e, o, r, i) { if (!e) { e = e || {}, window.permutive = e, e.q = [], e.config = i || {}, e.config.projectId = o, e.config.apiKey = r, e.config.environment = e.config.environment || "production"; for (var t = ["addon", "identify", "track", "trigger", "query", "segment", "segments", "ready", "on", "once", "user", "consent"], c = 0; c < t.length; c++) { var f = t[c]; e[f] = function (n) { return function () { var o = Array.prototype.slice.call(arguments, 0); e.q.push({ functionName: n, arguments: o }) } }(f) } } }(document, window.permutive, `${crbTracker.permutive.workspaceID}`, `${crbTracker.permutive.publicAPIKey}`, {});
window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.cmd.push(function () { if (0 === window.googletag.pubads().getTargeting("permutive").length) { var g = window.localStorage.getItem("_pdfps"); window.googletag.pubads().setTargeting("permutive", g ? JSON.parse(g) : []) } });
{
    let data = {
        page: {
            article: {
                id: `${crbTracker.permutive.postID}`,
                title: `${crbTracker.permutive.postTitle}`
            }
        }
    }
    if ('undefined' != typeof crbTracker.permutive.pageViewEvent && crbTracker.permutive.pageViewEvent) {
        data.page = { ...data.page, ...crbTracker.permutive.pageViewEvent };
    }
    if ('undefined' != typeof localStorage['clusterData']) {
        let clusterData = JSON.parse(localStorage['clusterData']);
        for (el of ['PID', 'cluster', 'cluster_predicted']) {
            delete clusterData[el];
        }
        data.page = { ...data.page, ...clusterData };
    }
    if (typeof localStorage['cluster'] != 'undefined') {
        data.page['cluster'] = {
            cluster: Number(localStorage['cluster']),
            domain: localStorage['domain']
        }
    }

    permutive.addon('web', data);
}