(function () {
  'use strict';

  var config = window.MY_SUPSUN_ANALYTICS || {};
  var ga4Id = config.ga4Id || 'G-2JYN478JNT';
  var yandexId = String(config.yandexId || '').trim();

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (ga4Id) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4Id);
    document.head.appendChild(gaScript);
    window.gtag('js', new Date());
    window.gtag('config', ga4Id, { anonymize_ip: true });
  }

  if (/^\d+$/.test(yandexId)) {
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    var ymScript = document.createElement('script');
    ymScript.async = true;
    ymScript.src = 'https://mc.yandex.ru/metrika/tag.js';
    document.head.appendChild(ymScript);
    window.ym(Number(yandexId), 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }

  function track(name, params) {
    var details = params || {};
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, details);
    }
    if (/^\d+$/.test(yandexId) && typeof window.ym === 'function') {
      window.ym(Number(yandexId), 'reachGoal', name, details);
    }
  }

  window.trackSupEvent = track;

  document.addEventListener('click', function (event) {
    var target = event.target instanceof Element ? event.target.closest('a, button') : null;
    if (!target) return;

    var explicitEvent = target.getAttribute('data-analytics-event');
    var service = target.getAttribute('data-service');
    var href = target instanceof HTMLAnchorElement ? target.href : '';

    if (explicitEvent) {
      track(explicitEvent, service ? { service: service } : {});
      return;
    }
    if (href.indexOf('tel:+79636928378') === 0) track('phone_click', { contact: 'main' });
    else if (href.indexOf('tel:+79996558043') === 0) track('max_click', { contact: 'max' });
    else if (href.indexOf('t.me/') !== -1) track('telegram_click');
    else if (href.indexOf('vk.com/') !== -1) track('vk_click');
  });
})();
