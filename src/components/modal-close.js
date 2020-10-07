export function modalClBtn(instance){
    const modalBox = document.querySelector('.basicLightbox');
    modalBox.insertAdjacentHTML('afterbegin', `<button
    type="button"
    class="lightbox__button"
    data-action="close-lightbox"
    ></button>`);
    const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
    modalCloseBtn.addEventListener('click', ()=> instance.close())
  
  }
  export function modalClBtTrailer(instance){
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML('afterbegin', `<button
    type="button"
    class="lightbox__button"
    data-action="close-lightbox2"
    ></button>`);
    const modalCloseBtn = document.querySelector('[data-action="close-lightbox2"]');
    modalCloseBtn.addEventListener('click', ()=> instance.close())
  }
  export function modalClBtCast(instance){
    const modalBox = document.querySelector('.basicLightbox').nextSibling;
    modalBox.insertAdjacentHTML('afterbegin', `<button
    type="button"
    class="lightbox__button"
    data-action="close-lightbox3"
    ></button>`);
    const modalCloseBtn = document.querySelector('[data-action="close-lightbox3"]');
    modalCloseBtn.addEventListener('click', ()=> instance.close())
  }