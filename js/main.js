(function(){
  "use strict";

  /* Sticky header background */
  var header = document.querySelector('.site-header');
  var hasHero = document.querySelector('.hero, .product-hero');
  function onScroll(){
    if(!header) return;
    if(!hasHero){ header.classList.add('is-solid'); return; }
    if(window.scrollY > 40){ header.classList.add('is-solid'); }
    else { header.classList.remove('is-solid'); }
  }
  if(header){ onScroll(); window.addEventListener('scroll', onScroll, {passive:true}); }

  /* Mega menus (desktop, hover + keyboard) */
  var navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function(item){
    var trigger = item.querySelector('.nav-link');
    var mega = item.querySelector('.mega');
    if(!trigger || !mega) return;
    var closeTimer;
    function open(){ clearTimeout(closeTimer); navItems.forEach(function(i){ if(i!==item) i.classList.remove('open'); }); item.classList.add('open'); }
    function scheduleClose(){ closeTimer = setTimeout(function(){ item.classList.remove('open'); }, 160); }
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', scheduleClose);
    trigger.addEventListener('click', function(e){
      e.preventDefault();
      item.classList.contains('open') ? item.classList.remove('open') : open();
    });
    trigger.addEventListener('focus', open);
    mega.querySelectorAll('.mega-row').forEach(function(row){
      row.addEventListener('mouseenter', function(){ activateRow(mega, row); });
      row.addEventListener('focus', function(){ activateRow(mega, row); });
    });
  });
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav-item')){ navItems.forEach(function(i){ i.classList.remove('open'); }); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ navItems.forEach(function(i){ i.classList.remove('open'); }); }
  });

  function activateRow(mega, row){
    mega.querySelectorAll('.mega-row').forEach(function(r){ r.classList.remove('active'); });
    row.classList.add('active');
    var key = row.getAttribute('data-key');
    var panel = mega.querySelector('.mega-right');
    if(!panel || !key) return;
    var data = window.OEM_MEGA_DATA && window.OEM_MEGA_DATA[key];
    if(!data) return;
    panel.querySelector('.mega-eyebrow') && (panel.querySelector('.mega-eyebrow').textContent = 'EXPLORE');
    var h4 = panel.querySelector('h4'); if(h4) h4.textContent = data.title;
    var p = panel.querySelector('p'); if(p) p.textContent = data.copy;
    var chipsWrap = panel.querySelector('.mega-chips');
    if(chipsWrap){
      chipsWrap.innerHTML = '';
      (data.chips || []).forEach(function(c){
        var span = document.createElement('span');
        span.className = 'chip'; span.textContent = c;
        chipsWrap.appendChild(span);
      });
    }
    var link = panel.querySelector('.mega-link');
    if(link && data.href) link.setAttribute('href', data.href);
  }

  /* Mobile drawer */
  var hamburger = document.querySelector('.hamburger');
  var closeDrawer = document.querySelector('.close-drawer');
  hamburger && hamburger.addEventListener('click', function(){ document.body.classList.toggle('nav-open'); });
  closeDrawer && closeDrawer.addEventListener('click', function(){ document.body.classList.remove('nav-open'); });
  document.querySelectorAll('.mobile-acc-trigger').forEach(function(t){
    t.addEventListener('click', function(){ t.closest('.mobile-acc-item').classList.toggle('open'); });
  });

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add('in'); }); }

  /* Count-up metrics */
  var counters = document.querySelectorAll('[data-count-to]');
  if('IntersectionObserver' in window && counters.length){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, target = parseInt(el.getAttribute('data-count-to'), 10), suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now(), dur = 1200;
        function tick(now){
          var p = Math.min(1, (now - start) / dur);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, {threshold:.4});
    counters.forEach(function(el){ cio.observe(el); });
  }

  /* Industry slider */
  var slider = document.querySelector('[data-slider]');
  if(slider){
    var slides = JSON.parse(document.getElementById('slider-data').textContent);
    var idx = 0;
    var phLabel = slider.querySelector('.slide-image .visual-ph span');
    var tagEl = slider.querySelector('.tag');
    var titleEl = slider.querySelector('.slide-panel h3');
    var copyEl = slider.querySelector('.slide-panel p');
    var pagEl = slider.querySelector('.slider-pag');
    function renderSlide(){
      var s = slides[idx];
      phLabel.textContent = s.img;
      tagEl.textContent = s.tag;
      titleEl.textContent = s.title;
      copyEl.textContent = s.copy;
      pagEl.querySelectorAll('span').forEach(function(sp, i){ sp.classList.toggle('active', i === idx); });
    }
    pagEl.querySelectorAll('span').forEach(function(sp, i){
      sp.addEventListener('click', function(){ idx = i; renderSlide(); });
    });
    slider.querySelector('[data-slide-prev]').addEventListener('click', function(){ idx = (idx - 1 + slides.length) % slides.length; renderSlide(); });
    slider.querySelector('[data-slide-next]').addEventListener('click', function(){ idx = (idx + 1) % slides.length; renderSlide(); });
    renderSlide();
  }

  /* Product category split */
  var productSplit = document.querySelector('[data-product-split]');
  if(productSplit){
    var pData = JSON.parse(document.getElementById('product-split-data').textContent);
    var tabs = productSplit.querySelectorAll('.product-tab');
    var pTitle = productSplit.querySelector('.product-preview h3');
    var pCopy = productSplit.querySelector('.product-preview p');
    var pChips = productSplit.querySelector('.product-preview .mega-chips');
    var pImg = productSplit.querySelector('.product-visual .visual-ph span');
    var pLink = productSplit.querySelector('.product-preview .btn-text');
    function renderProduct(key){
      var d = pData[key]; if(!d) return;
      tabs.forEach(function(t){ t.classList.toggle('active', t.getAttribute('data-key') === key); });
      pTitle.textContent = d.title; pCopy.textContent = d.copy;
      pChips.innerHTML = '';
      d.chips.forEach(function(c){ var s = document.createElement('span'); s.className='chip'; s.textContent=c; pChips.appendChild(s); });
      pImg.textContent = d.img;
      pLink.setAttribute('href', d.href);
    }
    tabs.forEach(function(t){ t.addEventListener('click', function(){ renderProduct(t.getAttribute('data-key')); }); });
    renderProduct(tabs[0].getAttribute('data-key'));
  }

  /* Manufacturing process rail */
  var processRail = document.querySelector('[data-process-rail]');
  if(processRail){
    var procData = JSON.parse(document.getElementById('process-data').textContent);
    var steps = processRail.querySelectorAll('.process-step');
    var detail = document.querySelector('[data-process-detail]');
    function renderProcess(key){
      var d = procData[key]; if(!d) return;
      steps.forEach(function(s){ s.classList.toggle('active', s.getAttribute('data-key') === key); });
      detail.querySelector('h3').textContent = d.title;
      detail.querySelector('p').textContent = d.copy;
      detail.querySelector('.visual-ph span').textContent = d.img;
    }
    steps.forEach(function(s){ s.addEventListener('click', function(){ renderProcess(s.getAttribute('data-key')); }); });
    renderProcess(steps[0].getAttribute('data-key'));
  }

  /* Buyer proof filter pills */
  var pillRow = document.querySelector('[data-pill-filter]');
  if(pillRow){
    var cells = document.querySelectorAll('[data-proof-segment]');
    pillRow.querySelectorAll('.pill').forEach(function(pill){
      pill.addEventListener('click', function(){
        pillRow.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
        pill.classList.add('active');
        var seg = pill.getAttribute('data-segment');
        cells.forEach(function(c){
          var segs = c.getAttribute('data-proof-segment').split(',');
          c.style.display = (seg === 'all' || segs.indexOf(seg) > -1) ? '' : 'none';
        });
      });
    });
  }

  /* Cross reference search (client-side demo against static dataset) */
  var xrefForm = document.querySelector('[data-xref-form]');
  if(xrefForm){
    xrefForm.addEventListener('submit', function(e){
      e.preventDefault();
      var q = xrefForm.querySelector('input[name="q"]').value.trim();
      var resultEl = document.querySelector('[data-xref-result]');
      if(!resultEl) return;
      if(!q){ resultEl.textContent = 'Enter an OE number, competitor number, vehicle or filter type to search.'; return; }
      resultEl.innerHTML = 'No exact match found in the public catalogue for "<strong>' + q.replace(/</g,'&lt;') + '</strong>". Our applications team can confirm cross reference and lead time for this part &mdash; submit it with the RFQ form below.';
    });
  }

  /* RFQ form submission (client-side placeholder, replace with production endpoint) */
  document.querySelectorAll('.rfq-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if(status){ status.textContent = 'Thank you. Your request has been received and our sourcing team will respond within 1 business day.'; }
      form.reset();
    });
  });

  /* Set active breadcrumb / footer year if present */
  var yearEl = document.querySelector('[data-year]');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
