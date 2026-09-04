/* OEM Filter — interaction layer
   Header state, mobile navigation, industry slider, segment tabs,
   catalog search hand-off and RFQ validation. */
(function () {
  'use strict';

  var qs = function (sel, root) { return (root || document).querySelector(sel); };
  var qsa = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  /* --- Header: transparent over the hero, yellow pill once scrolled ------ */
  var header = qs('#site-header');
  if (header && !header.classList.contains('site-header--solid')) {
    var setHeaderState = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });
  }

  /* --- Mobile navigation -------------------------------------------------- */
  var toggle = qs('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* On narrow screens the dropdown parents expand in place instead of
     opening on hover. */
  qsa('.has-menu > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (window.matchMedia('(min-width: 1081px)').matches) return;
      event.preventDefault();
      link.parentElement.classList.toggle('is-open');
    });
  });

  qsa('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (link.parentElement.classList.contains('has-menu')) return;
      document.body.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- Industry slider ---------------------------------------------------- */
  var slides = [
    {
      eyebrow: 'Off-road & heavy equipment',
      title: 'Agriculture & Construction',
      text: 'Engine, hydraulic, fuel and cabin air filters for tractors, harvesters and excavators operating in extreme dust and debris environments.'
    },
    {
      eyebrow: 'On-road & fleet',
      title: 'Commercial Vehicles',
      text: 'Oil, fuel, air dryer and separator programmes for trucks, buses and trailer fleets running long duty cycles between service intervals.'
    },
    {
      eyebrow: 'Passenger mobility',
      title: 'Cars & Light Commercial',
      text: 'Spin-on and cartridge oil, panel air and activated-carbon cabin filters covering the references your service network sells most.'
    },
    {
      eyebrow: 'Industrial & stationary',
      title: 'Industrial Equipment',
      text: 'Hydraulic, air-oil separation and compressor filtration for gensets, process plant and stationary power installations.'
    }
  ];

  var sliderRoot = qs('#industry-slider');
  if (sliderRoot) {
    var scene = qs('[data-slide-scene]', sliderRoot);
    var indexEl = qs('[data-slide-index]', sliderRoot);
    var eyebrowEl = qs('[data-slide-eyebrow]', sliderRoot);
    var titleEl = qs('[data-slide-title]', sliderRoot);
    var textEl = qs('[data-slide-text]', sliderRoot);
    var dots = qsa('[data-slide-to]');
    var current = 0;

    var render = function (next) {
      current = (next + slides.length) % slides.length;
      var slide = slides[current];
      eyebrowEl.textContent = slide.eyebrow;
      titleEl.textContent = slide.title;
      textEl.textContent = slide.text;
      indexEl.textContent = String(current + 1).padStart(2, '0');
      scene.setAttribute('data-scene', String(current + 1));
      dots.forEach(function (dot, i) {
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        render(Number(dot.getAttribute('data-slide-to')));
      });
    });
    var prev = qs('[data-slide-prev]');
    var next = qs('[data-slide-next]');
    if (prev) prev.addEventListener('click', function () { render(current - 1); });
    if (next) next.addEventListener('click', function () { render(current + 1); });

    render(0);
  }

  /* --- Segment tabs ------------------------------------------------------- */
  var tabs = qsa('.tab');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (other) {
          var selected = other === tab;
          other.setAttribute('aria-selected', String(selected));
          var panel = document.getElementById(other.getAttribute('aria-controls'));
          if (panel) panel.hidden = !selected;
        });
      });
    });
  }

  /* --- Catalog search hands the query to the RFQ form --------------------- */
  var search = qs('#catalog-search');
  if (search) {
    search.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = qs('#catalog-query').value.trim();
      var reference = qs('#part-reference');
      if (query && reference) reference.value = query;
      var rfq = qs('#rfq');
      if (rfq) rfq.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (reference) window.setTimeout(function () { reference.focus(); }, 600);
    });
  }

  /* --- RFQ form ----------------------------------------------------------- */
  var form = qs('#rfq-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var status = qs('#form-status');
      if (!form.checkValidity()) {
        status.textContent = 'Please complete the required fields before submitting.';
        status.setAttribute('data-state', 'error');
        form.reportValidity();
        return;
      }
      status.textContent = 'Thank you. Your RFQ is ready to be reviewed by our sourcing team.';
      status.setAttribute('data-state', 'ok');
      form.reset();
    });
  }
})();
