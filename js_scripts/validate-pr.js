import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * @type {string}
 */
const repository = process.env.REPO;
const [owner, repo] = repository.split('/');
const pullRequestID = process.env.PULL_REQUEST_ID;

/* ---------------------------------------------------------------------------- */

import { marked } from 'marked';
import YAML from 'yaml';

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
            result = tokens[i].text
            break
        }
    }
    
    return result;
}



/**
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullRequestID
 */
async function getPR(owner, repo, pullRequestID) {
  try {
    const { data } = await octokit.rest.pulls.get({
      owner,
      repo,
      pullRequestID,
    });

    return data[0].body
  } catch (error) {
    console.error(error);
  }
}

const prBody = await getPR(owner, repo, pullRequestID);
const changelogEntries = findSectionInMarkdown(prBody, 'Changelog entries');

// console.log(changelogEntries)
/**
 *
 * @param {object} block
 * @param {number} index
 * @returns
 */
function validateYaml(block, index) {
  if (
    block.section === undefined ||
    block.section === null ||
    block.section.length === 0 ||
    block.section === '<kebab-case of a module name> | <1st level dir in the repo>'
  ) {
    throw new Error(`'section' is required and must be a non-empty string in block ${index}`);
  }

  if (
    block.type === undefined ||
    block.type === null ||
    block.type.length === 0 ||
    !['fix', 'feature', 'chore'].includes(block.type)
  ) {
    throw new Error(`'type' must be one of type: fix, feature, chore. In block ${index}`);
  }

  if (
    block.summary === undefined ||
    block.summary === null ||
    block.summary.length === 0 ||
    block.summary === '<ONE-LINE of what effectively changes for a user>'
  ) {
    throw new Error(`'summary' is required and must be a non-empty string in block ${index}`);
  }

  if (
    typeof block.impact === 'string' &&
    block.impact.length > 0 &&
    block.impact === '<what to expect for users, possibly MULTI-LINE>, required if impact_level is high ↓'
  ) {
    throw new Error(`'impact' is required and must be a non-empty string in block ${index}`);
  }

  if (block.impact_level.length > 0 && !['default', 'high', 'low'].includes(block.impact_level)) {
    throw new Error(`'impact_level' must be one of levels: default, high, low. In block ${index}`);
  }

  return true;
}

let changesBlocks = changelogEntries.split('---');
try {
  changesBlocks.forEach((changeBlock, idx) => validateYaml(YAML.parse(changeBlock.trim()), idx + 1));
  console.log("Changes is valid")
} catch (error) {
  console.error(error);
}
