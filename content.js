// 設定を保持する変数
let hideRepostsOnProfile = false;

// リツイートを非表示にする関数
const hideRetweets = () => {
  if (!hideRepostsOnProfile) {
    return; // 非表示設定ではない場合は何もしない
  }

  // リツイートを特定するためのセレクタ（注意：このセレクタは将来変更される可能性があります）
  const retweetSelector = '[data-testid="socialContext"]';

  document.querySelectorAll(retweetSelector).forEach(element => {
    // 投稿全体を囲む article 要素を探して非表示にする
    const article = element.closest('article');
    if (article) {
      // articleの3つ親の要素を削除する
      const grandGrandParent = article.parentElement?.parentElement?.parentElement;
      if (grandGrandParent) {
        grandGrandParent.style.display = 'none';
      }
    }
  });
};

// 初期設定をストレージから読み込む
chrome.storage.local.get({ hideRepostsOnProfile: false }, (data) => {
  hideRepostsOnProfile = data.hideRepostsOnProfile;
  hideRetweets();
});

// 設定の変更を監視する
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.hideRepostsOnProfile) {
    hideRepostsOnProfile = changes.hideRepostsOnProfile.newValue;
    // 設定が変更されたら、表示状態を再度反映させる
    // （一度非表示にしたものを再表示するにはリロードが必要）
    window.location.reload();
  }
});

// DOMの変更を監視して、動的に読み込まれるリツイートに対応する
const observer = new MutationObserver(hideRetweets);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
