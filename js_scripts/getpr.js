/**
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullRequestID
 */
async function getPR(owner, repo, pullRequestID) {
  const { data } = await github.rest.pulls.get({
    owner: owner,
    repo: repo,
    pull_number: pullRequestID,
  });
  return data.body;
}