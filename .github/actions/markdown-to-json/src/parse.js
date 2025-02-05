// const marked = require('marked');
import marked from 'marked'

import { Octokit } from '@octokit/rest';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repository = process.env.REPO;
const [owner, repo] = repository.split('/');
const pullRequestID = process.env.PULL_REQUEST_ID;

/**
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullRequestID
 */
async function getPR(owner, repo, pullRequestID) {
  const { data } = await octokit.rest.pulls.get({
    owner,
    repo,
    pullRequestID,
  });

  return data[0].body;
}

/**
 *
 * @param {string} markdownString
 * @param {string} header
 * @returns {string}
 */
function findSectionInMarkdown(markdownString, header) {
  const tokens = marked.lexer(markdownString);
  const headerIndex = tokens.findIndex(
    (token) => token.type === 'heading' && token.text.toLowerCase() === header.toLowerCase()
  );

  if (headerIndex === -1) return null;

  let result;
  for (let i = headerIndex + 1; i < tokens.length; i++) {
    if (tokens[i].lang === 'changes') {
      result = tokens[i].text;
      break;
    }
  }

  return result;
}

const prBody = await getPR(owner, repo, pullRequestID);

const r = parseMarkdown(prBody)
console.log(r)

// const changelogEntries = findSectionInMarkdown(prBody, 'Changelog entries');

//           try {
//             validatePullRequestChangelog(changelogEntries, allowedSections);
//           } catch(error) {
//             throw(error);
//           }
