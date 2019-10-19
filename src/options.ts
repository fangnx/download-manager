/**
 * options.ts
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-10-18 23:26:37
 * @last-modified 2019-10-19 17:54:02
 */

const ruleFields = ['ruleName', 'matchURL', 'matchURLMode', 'prefix', 'suffix'];

const rules = document.getElementById('rules');

chrome.storage.sync.get('rules', res => {
  res.rules.map(rule => {
    appendRule(rule);
  });
});

const addRuleButton = document.getElementById('add-rule-button');

addRuleButton.addEventListener('click', () => {
  const urlMatchModeSelection = document.getElementById('match-url-mode');
  const newRule = {
    ruleName: document.getElementById('rule-name').value,
    matchURL: document.getElementById('match-url').value,
    matchURLMode:
      urlMatchModeSelection.options[urlMatchModeSelection.selectedIndex].value,
    prefix: document.getElementById('prefix').value,
    suffix: document.getElementById('suffix').value
  };
  chrome.storage.sync.get('rules', res => {
    res.rules.push(newRule);
    chrome.storage.sync.set({ rules: res.rules }, () => {
      appendRule(newRule);
    });
  });
});

/**
 * Append new rule element to DOM.
 */
const appendRule = rule => {
  const li = document.createElement('li');
  ruleFields.forEach(field => {
    const ele = document.createElement('input');
    ele.value = rule[field];
    li.appendChild(ele);
  });
  const button = document.createElement('button');
  button.id = 'edit-rule-button';
  button.innerHTML = 'Edit Rule';
  li.appendChild(button);
  rules.appendChild(li);
};
