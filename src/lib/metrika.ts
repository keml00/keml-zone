import { YM_COUNTER_ID } from "@/lib/site";

export const YANDEX_METRIKA_SCRIPT = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${YM_COUNTER_ID}', 'ym');

ym(${YM_COUNTER_ID}, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: "dataLayer",
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce: true,
  trackLinks: true
});

function removeYmInformer() {
  var selectors = [
    'a[href*="metrika.yandex"]',
    'a[href*="informer"]',
    'img[src*="informer.yandex"]',
    'img[src*="mc.yandex.ru/informer"]',
    'iframe[src*="informer"]',
    '[class*="ym-informer"]',
    '[id*="ym-informer"]'
  ];

  selectors.forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      var node = el.closest('a') || el;
      if (node && node.parentNode) node.parentNode.removeChild(node);
    });
  });

  document.querySelectorAll('body > a').forEach(function(anchor) {
    var style = window.getComputedStyle(anchor);
    var rect = anchor.getBoundingClientRect();
    var href = anchor.getAttribute('href') || '';
    var img = anchor.querySelector('img');
    var imgSrc = img ? img.getAttribute('src') || '' : '';

    if (
      style.position === 'fixed' &&
      rect.bottom > window.innerHeight - 120 &&
      rect.right > window.innerWidth - 120 &&
      (href.indexOf('yandex') !== -1 || imgSrc.indexOf('yandex') !== -1 || imgSrc.indexOf('informer') !== -1)
    ) {
      anchor.parentNode && anchor.parentNode.removeChild(anchor);
    }
  });
}

removeYmInformer();
new MutationObserver(removeYmInformer).observe(document.documentElement, { childList: true, subtree: true });
window.setInterval(removeYmInformer, 200);
`;
