const headerRegex = /#{1,}(.*)/g;
const linkLabelRegex = /\[([^\]]*?)\][[(].*?[\])]/g;
const linkRegex = /~(.*?)~/g;

export function prepareDescription(input) {
  if (!input || input.length === 0) return '';
  const tmp = input
    .replace(headerRegex, '')
    .trim()
    .replaceAll('*', '')
    .replace(linkLabelRegex, '$1')
    .replace(linkRegex, '$1');

  const maxLength = 200;
  let trimmedString = tmp.substr(0, maxLength);

  // re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );
  if (trimmedString.substr(trimmedString.length - 1) != '.') {
    trimmedString += '...';
  }

  return trimmedString;
}
