document.addEventListener('DOMContentLoaded', () => {
  const showRetweetsCheckbox = document.getElementById('showRetweets');

  // 保存された設定を読み込み、チェックボックスに反映
  chrome.storage.local.get({ showRetweets: true }, (data) => {
    showRetweetsCheckbox.checked = data.showRetweets;
  });

  // チェックボックスの変更を監視し、設定を保存
  showRetweetsCheckbox.addEventListener('change', (event) => {
    chrome.storage.local.set({ showRetweets: event.target.checked });
  });
});