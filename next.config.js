const withCss = require('@zeit/next-css')

module.exports = withCss({
    env: {
        mapboxToken: 'pk.eyJ1IjoidG1zaHYiLCJhIjoiM3BMLVc2MCJ9.PM9ukwAm-YUGlrBqt4V6vw',
        datasetUrl: 'https://www.dl.dropboxusercontent.com/s/nvd7d0b9jyp6roh/20190719-oymyakon-vk.geojson?dl=0',
    }
})
