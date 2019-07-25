const withCss = require('@zeit/next-css')
const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
    // path: '.env',
    public: [
        'MAPBOX_TOKEN',
        'DATASET_URL',   
    ],
    server: [
        'GITHUB_TOKEN',
    ]
})

module.exports = withConfig(withCss({
    env: {
        GITHUB_OWNER: 'designunit',
        GITHUB_REPO: 'oymyakon-data',
    }
}))
