{
    let waitForPermutive = setInterval(function () {
        let permutiveValues = {};
        if (null == (localStorage.getItem('permutiveValues'))) {
            if ('undefined' == typeof permutive.context || 'undefined' == typeof permutive.context.user_id) {
                return;
            }
            permutiveValues = { continent: permutive.context.continent, referrer: permutive.context.referrer, user_agent: navigator.userAgent, user_id: permutive.context.user_id };
            localStorage.setItem('permutiveValues', JSON.stringify(permutiveValues))
        }
        permutiveValues = JSON.parse(localStorage.getItem('permutiveValues'));
        jQuery.ajax({
            type: 'post',
            dataType: 'json',
            cache: true,
            url: crbSiteData.ajaxURL,
            data: {
                action: 'crb_pmi_cluster',
                data: permutiveValues
            },
            success: function (response) {
                localStorage.setItem('cluster', response.data.int);
                localStorage.setItem('domain', response.data.domain);
                localStorage.setItem('clusterData', JSON.stringify(response.data.raw));
            }
        });

        clearInterval(waitForPermutive);
    }, 200);
}