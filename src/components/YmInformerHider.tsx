"use client";

import { useEffect } from "react";

function removeYmInformer() {
  const selectors = [
    'a[href*="metrika.yandex"]',
    'a[href*="informer"]',
    'img[src*="informer.yandex"]',
    'img[src*="mc.yandex.ru/informer"]',
    'iframe[src*="informer"]',
    '[class*="ym-informer"]',
    '[id*="ym-informer"]',
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const node = el.closest("a") ?? el;
      node.remove();
    });
  });

  document.querySelectorAll("body > a, html > body ~ a").forEach((anchor) => {
    const style = window.getComputedStyle(anchor);
    const rect = anchor.getBoundingClientRect();
    const isBottomRight =
      style.position === "fixed" &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth &&
      rect.width > 0 &&
      rect.width < 200 &&
      rect.bottom > window.innerHeight - 120;

    const hasYandexChild =
      anchor.querySelector('img[src*="yandex"], img[src*="informer"]') !== null ||
      (anchor.getAttribute("href") ?? "").includes("yandex");

    if (isBottomRight && hasYandexChild) {
      anchor.remove();
    }
  });
}

export default function YmInformerHider() {
  useEffect(() => {
    removeYmInformer();

    const observer = new MutationObserver(removeYmInformer);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const interval = window.setInterval(removeYmInformer, 200);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
