/**
 * background.ts
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-10-08 11:59:47
 * @last-modified 2019-10-19 17:53:59
 */

chrome.runtime.onInstalled.addListener(function(details) {});

chrome.storage.sync.set({ rules: [] });

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  chrome.storage.sync.get('rules', res => {
    const allRules = res.rules;

    for (const rule of allRules) {
      if (rule.matchURLMode === 'contains') {
        const re = new RegExp(rule.matchURL, 'i');
        if (re.test(downloadItem.url)) {
          const newFilename = `${rule.prefix}${downloadItem.filename}`;
          suggest({ filename: newFilename });
          return;
        }
      }
    }
  });
  // According to Chrome dev documentation,
  // listener must return true if it calls suggest() asynchronously.
  return true;
});
