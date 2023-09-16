export default function getHostFromUrl(url) {
  // https://stackoverflow.com/questions/25703360/regular-expression-extract-subdomain-domain
  const getDomainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/;

  const matches = url.match(getDomainRegex);

  return matches.length > 1 ? matches[1] : "";
}
