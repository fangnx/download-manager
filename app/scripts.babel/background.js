/**
 * background.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-10-08 12:02:57
 * @last-modified 2019-10-10 00:03:00
 */

chrome.runtime.onInstalled.addListener(function(details) {});

// TEMP.
const rules = [];
const ruleUnsplash = {
  ruleName: 'Unsplash',
  matchURL: 'unsplash.com',
  matchURLMode: 'contains',
  matchExtensions: ['jpg', 'jpeg', 'png'],
  prefix: '[unsplash]-',
  suffix: ''
};
rules.push(ruleUnsplash);

const ruleMatched = (url, filename) => {
  const rule = rules.find(rule => {
    if (rule.matchURLMode === 'contains') {
      const re = new RegExp(rule.matchURL, 'i');
      if (re.test(url)) {
        return true;
      }
    }
  });
  return { prefix: rule.prefix, suffix: rule.suffix };
};

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  const matched = ruleMatched(downloadItem.url, downloadItem.filename);
  alert(matched);
  if (!!matched) {
    alert('Rule matched!');
    const newFilename = `${matched.prefix}${downloadItem.filename}`;
    suggest({ filename: newFilename, conflictAction: 'uniquify' });
  }
});
