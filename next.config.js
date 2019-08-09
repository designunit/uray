const withCss = require('@zeit/next-css')

module.exports = withCss({
    env: {
        GITHUB_TOKEN: '@github-token',
        API_BASE_URL: isProduction
            ? 'https://oymyakon.unit4.io/api'
            : 'http://localhost:8000',

        GITHUB_OWNER: 'designunit',
        GITHUB_REPO: 'oymyakon-data',
        MAPBOX_TOKEN: 'pk.eyJ1IjoidG1zaHYiLCJhIjoiM3BMLVc2MCJ9.PM9ukwAm-YUGlrBqt4V6vw',
        DATASET_URL: 'https://www.dl.dropboxusercontent.com/s/nvd7d0b9jyp6roh/20190719-oymyakon-vk.geojson?dl=0',
    }
})
