import Octokit from '@octokit/rest'

type GithubClientOptions = {
    owner: string
    repo: string
    ref: string
}

export class GithubClient {
    private octokit: Octokit
    private options: GithubClientOptions

    public static create() {
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN,
        })

        return new GithubClient(octokit, {
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            ref: 'heads/master',
        })
    }

    constructor(octokit: Octokit, options: GithubClientOptions) {
        this.octokit = octokit
        this.options = options
    }

    public async updateFile(path: string, content: string, commitMessage: string): Promise<boolean> {
        // Get a reference to HEAD
        const refResponse = await this.octokit.git.getRef({
            owner: this.options.owner,
            repo: this.options.repo,
            ref: this.options.ref,
        })
        const headCommitSha = refResponse.data.object.sha

        // Grab the commit that HEAD points to
        const headCommit = await this.octokit.git.getCommit({
            owner: this.options.owner,
            repo: this.options.repo,
            commit_sha: headCommitSha,
        })
        const headCommitTreeSha = headCommit.data.tree.sha

        // Create blob
        const blob = await this.octokit.git.createBlob({
            owner: this.options.owner,
            repo: this.options.repo,
            content,
            encoding: 'utf-8',
        })
        const blobSha = blob.data.sha

        // Create tree
        const tree = await this.octokit.git.createTree({
            owner: this.options.owner,
            repo: this.options.repo,
            base_tree: headCommitTreeSha,
            tree: [
                {
                    path,
                    mode: '100644',
                    type: 'blob',
                    sha: blobSha,
                },
            ],
        })
        const newTreeSha = tree.data.sha

        // Create commit
        const newCommit = await this.octokit.git.createCommit({
            owner: this.options.owner,
            repo: this.options.repo,
            message: commitMessage,
            tree: newTreeSha,
            parents: [
                headCommitSha,
            ],
        })
        const newCommitSha = newCommit.data.sha

        // Update a reference
        const newHeadRef = await this.octokit.git.updateRef({
            owner: this.options.owner,
            repo: this.options.repo,
            ref: this.options.ref,
            sha: newCommitSha,
        })

        return true

        //     // const commit = await octokit.git.getCommit({
        //     //     owner,
        //     //     repo,
        //     //     // commit_sha
        //     // })
        //     //     .then(({ data }) => {
        //     //     // handle data
        //     // })

        //     // const {
        //     //     query: { pid }
        //     // } = req;
        //     // const pid = 1

        //     res.json({
        //         // refResponse,
        //         // headCommit,
        //         newHeadRef,
        //     })
        // };
    }

    public async exec<T>(fn: (octokit: Octokit) => Promise<T>): Promise<T> {
        return fn(this.octokit)
    }

    public async getFileContent(path: string): Promise<string> {
        const content = await this.octokit.repos.getContents({
            owner: this.options.owner,
            repo: this.options.repo,
            path,
        })
        const buffer = Buffer.from(content.data.content, 'base64')

        return buffer.toString('utf-8')
    }

    public async getFileBlob(path: string): Promise<string> {
        const refResponse = await this.octokit.git.getRef({
            owner: this.options.owner,
            repo: this.options.repo,
            ref: this.options.ref,
        })
        const headCommitSha = refResponse.data.object.sha

        const headCommit = await this.octokit.git.getCommit({
            owner: this.options.owner,
            repo: this.options.repo,
            commit_sha: headCommitSha,
        })
        const treeSha = headCommit.data.tree.sha

        const tree = await this.octokit.git.getTree({
            owner: this.options.owner,
            repo: this.options.repo,
            tree_sha: treeSha,
        })
        const file = tree.data.tree.find(f => f.path === path)
        if (!file) {
            return null
        }

        const blob = await this.octokit.git.getBlob({
            owner: this.options.owner,
            repo: this.options.repo,
            file_sha: file.sha,
        })
        const buffer = Buffer.from(blob.data.content, 'base64')

        return buffer.toString('utf-8')
    }
}
