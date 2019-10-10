var b = document.getElementById('b');

b.onclick = function(element) {
  console.log('a');
  chrome.downloads.show(111);
};
