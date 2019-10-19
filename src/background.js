import config from './config.json';

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
  if (!!matched) {
    alert('Rule matched!');
    const newFilename = `${matched.prefix}${downloadItem.filename}`;
    suggest({ filename: newFilename, conflictAction: config.conflictAction });
  }
});
