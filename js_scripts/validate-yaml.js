import YAML from 'yaml';

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

/* test values */
const yamlString = `
section: "wrong section"
type: fix
summary: "asdasdas"
impact: "test"
impact_level: high
---
section: 'sdasd'
type: feature
summary: fe<ONE-LINE of what effectively changes for a user>
impact_level: default
---
section: example-section
type: feature
summary: Added new feature for performance improvement.
impact_level: high
impact: This change improves application speed.
---
section: another wrong section
type: fix
summary: Fixed a bug in the login module.
impact_level: low
---
section: "wrong section"
type: chore
summary: sum
impact_level: 5
`;

let changesBlocks = yamlString.split('---');
try {
  changesBlocks.forEach((changeBlock, idx) => validateYaml(YAML.parse(changeBlock.trim()), idx + 1));
} catch (error) {
  console.error(error);
}
