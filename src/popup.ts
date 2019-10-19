/**
 * popup.ts
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-10-08 13:33:17
 * @last-modified 2019-10-19 17:54:05
 */

var b = document.getElementById('b');

b.onclick = function(element) {
  console.log('a');
  chrome.downloads.show(111);
};
