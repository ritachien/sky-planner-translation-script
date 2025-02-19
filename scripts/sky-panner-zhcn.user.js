// ==UserScript==
// @name         sky-planner-zhcn
// @namespace    https://github.com/ritachien
// @version      1.0.0
// @description  Add zh-CN translation for my sky friends
// @author       RitaChien
// @match        https://sky-planner.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sky-planner.com
// @updateURL    https://github.com/ritachien/sky-planner-translation-script/raw/refs/heads/main/scripts/sky-panner-zhcn.user.js
// @downloadURL  https://github.com/ritachien/sky-planner-translation-script/raw/refs/heads/main/scripts/sky-panner-zhcn.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";


    let currentPath = window.location.pathname;
    window.addEventListener("click", (event) => {
      if (window.location.pathname !== currentPath) {
        loadContentByPath(window.location.pathname);
      }
      currentPath = window.location.pathname;
    });
  setTimeout(() => {
    initLeftMenu();
    loadContentByPath(window.location.pathname);
  }, 500);
})();

function initLeftMenu() {
  const translation = {
    Back: "回上一頁",
    "Close menu": "隱藏選單列",
    Currency: "貨幣",
    Items: "物品收集",
    Spirits: "先祖們",
    "Winged Light": "小金人",
    Realms: "地圖區域介紹",
    Seasons: "季節",
    Events: "節日活動",
    Shops: "商店",
    Tools: "小工具",
    Settings: "設定",
  };

  document.querySelectorAll("nav div span.name").forEach((x) => {
    x.innerHTML = translation[x.innerHTML] ?? x.innerHTML;
  });
}

function loadContentByPath(pathname) {
  switch (pathname.toLowerCase()) {
    case "/currency":
      loadCurrencyPageContent();
      break;
    case "/currency/spent":
      loadCurrencySpentPageContent()
      break
    default:
      break;
  }
}

function loadCurrencyPageContent() {
  const translation = {
    "In-game currency": "光遇貨幣",
    "Regular currency": "常駐貨幣",
    "Season currency": "季節貨幣",
    "Event currency": "活動票券",
    "Spent currencies": "累計已花費貨幣",
    "Spirit trees": "先祖兌換樹",
  };

  // card title
  document.querySelectorAll("div.sky-card-header").forEach((x) => {
    const text = x.children[0].innerText;
    x.children[0].innerText = translation[text] ?? text;
  });

  // link button
  document.querySelectorAll(".menu-label").forEach((x) => {
    const text = x.innerText;
    x.innerText = translation[text] ?? text;
  });
}

function loadCurrencySpentPageContent() {
  const translation = {
    "Total": "總計",
    "Regular": "常駐花費",
    "Seasons": "季節花費",
    "Events": "活動花費",
    "Spent currencies": "累計已花費貨幣",
    "Breakdown": "詳細花費",
  };

  // card title
  const pageTitle = document.querySelector(".sky-card-header h1")
  pageTitle.innerText = translation[pageTitle.innerText] ?? pageTitle.innerText

  // description
  const pageDescription = document.querySelector(".sky-card-body div.container")
  pageDescription.innerHTML = `
    <p>這個頁面會顯示你目前在光遇已花費的貨幣總計數量。</p>
    <br/>
    <p>來自季節嚮導和季節先祖的兌換物品，會顯示在季節花費區塊。</p>
    <p>不是來自季節的相關兌換物品(例如:築巢家具店)，會顯示在常駐花費區塊。</p>
    <br/>
    <p>詳細花費會使用下列縮寫: (c)代表白蠟、(h)代表白心、(ac)代表紅蠟、(ec)代表活動票券、(sc)代表季蠟、(sh)代表季心。</p>
  `
  
  const batchSelectors = [
    ".sky-card-header h2.h3", // sub title
    ".menu-label",  // breakdown buttton
  ]


  batchSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((x) => {
      const text = x.innerText;
      x.innerText = translation[text] ?? text;
    });
  });
}
