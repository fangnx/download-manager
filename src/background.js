/**
 * background.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-10-08 11:59:47
 * @last-modified 2019-10-19 16:30:11
 */

chrome.runtime.onInstalled.addListener(function(details) {});

// TEMP.
const ruleUnsplash = {
  ruleName: 'Unsplash',
  matchURL: 'unsplash.com',
  matchURLMode: 'contains',
  matchExtensions: ['jpg', 'jpeg', 'png'],
  prefix: '[unsplash]-',
  suffix: ''
};

chrome.storage.sync.set({ rules: [] });
chrome.storage.sync.set({ username: 'alf' });

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  chrome.storage.sync.get('rules', res => {
    const allRules = res.rules;

    for (const rule of allRules) {
      // if (rule.matchURLMode === 'contains') {
      const re = new RegExp(rule.matchURL, 'i');
      if (re.test(downloadItem.url)) {
        const newFilename = `${rule.prefix}${downloadItem.filename}`;
        suggest({ filename: newFilename });
        return;
      }
      // }
    }
  });
  // According to Chrome dev documentation,
  // listener must return true if it calls suggest() asynchronously.
  return true;
});
