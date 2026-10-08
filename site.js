const mobileMenu = document.querySelector('.mobile-menu');
document.addEventListener('keydown', event => { if (event.key === 'Escape' && mobileMenu) mobileMenu.open = false; });
document.addEventListener('click', event => { if (mobileMenu?.open && !mobileMenu.contains(event.target)) mobileMenu.open = false; });
const dialog = document.querySelector('.gallery-dialog');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  // Keep the full-resolution viewer off the network until a photo is opened.
  const image = dialog.querySelector('img') || document.createElement('img');
  image.decoding = 'async';
  image.src = button.dataset.photo;
  image.alt = button.dataset.caption;
  if (!image.isConnected) dialog.append(image);
  dialog.querySelector('#image-caption').textContent = button.dataset.caption;
  dialog.showModal();
}));
dialog?.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
const contactBar = document.querySelector('.mobile-contact');
const opening = document.querySelector('.hero, .subhero');
if (opening && contactBar && 'IntersectionObserver' in window) new IntersectionObserver(([entry]) => contactBar.classList.toggle('visible', !entry.isIntersecting), {threshold:0}).observe(opening);
