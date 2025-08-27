document.addEventListener('DOMContentLoaded', () => {
  const hideRepostsOnProfileCheckbox = document.getElementById('showRetweets'); // ID remains the same for now

  // 保存された設定を読み込み、チェックボックスに反映
  chrome.storage.local.get({ hideRepostsOnProfile: false }, (data) => {
    hideRepostsOnProfileCheckbox.checked = data.hideRepostsOnProfile;
  });

  // チェックボックスの変更を監視し、設定を保存
  hideRepostsOnProfileCheckbox.addEventListener('change', (event) => {
    chrome.storage.local.set({ hideRepostsOnProfile: event.target.checked });
  });
});