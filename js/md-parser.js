import { marked } from 'marked'

/**
 *
 * @param {string} markdownString
 * @returns {string}
 */
function parseMarkdown(markdownString) {
  const tokens = marked.lexer(markdownString);

  return tokens;
}



const md = parseMarkdown()