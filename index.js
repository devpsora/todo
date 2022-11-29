const input = document.querySelector('.input');
const itemList = document.querySelector('.list');
const footer = document.querySelector('.footer');
const leftCount = document.querySelector('.count');
const btnState = document.querySelector('.state');
const btnAll = document.querySelector('.btnAll');
const btnActive = document.querySelector('.btnActive');
const btnCompleted = document.querySelector('.btnCompleted');
const btnConfirm = document.querySelector('.btnConfirm');
const modal = document.querySelector('.modal-bg');

btnAll.addEventListener('click', (e) => {
  updateListItem(e);
});
btnActive.addEventListener('click', (e) => {
  updateListItem(e, 'active');
});
btnCompleted.addEventListener('click', (e) => {
  updateListItem(e, 'completed');
});
btnConfirm.addEventListener('click', (e) => {
  modal.style.display = 'none';
  input.focus();
});
// 입력창에서 'Enter' 이벤트 시, 할 일 목록 추가
input.addEventListener('keydown', (e) => {
  if(e.keyCode == '13') {
    const newItem = addItem(e);
    if(newItem) {
      itemList.appendChild(newItem);
      input.value = '';
      updateItemList();
    }
  }
});
/**
 * 할 일 추가
 * @param {*} e 
 * @returns 
 */
function addItem(e) {
  if(!isValid(e)) return;

  const li = document.createElement('li');
  li.setAttribute('class', 'active');

  const chkBox = document.createElement('input');
  chkBox.setAttribute('type', 'checkbox');
  chkBox.setAttribute('class', 'checkbox');

  const span = document.createElement('span');
  const text = document.createTextNode(e.target.value);
  span.appendChild(text);

  const del = document.createElement('i');
  del.setAttribute('class', 'delete fa-solid fa-xmark');

  li.appendChild(chkBox);
  li.appendChild(span);
  li.append(del);

  // 생성된 요소에 동적 이벤트 추가하기
  del.addEventListener('click', (e) => {
    li.remove();
    updateItemList();
  });
  chkBox.addEventListener('click', (e) => {
    if(e.target.checked) {
      span.setAttribute('class', 'completed');
      li.setAttribute('class', 'completed');
    } else {
      span.setAttribute('class', 'active');
      li.setAttribute('class', 'active');
    }
    updateItemList();
  });
  
  return li;
}
/**
 * 목록 업데이트
 */
function updateItemList() {
  const itemListCnt = itemList.querySelectorAll('li').length;
  const activeItemsCnt = itemList.querySelectorAll('li.active').length;

  if(itemListCnt > 0) {
    footer.style.display = '';
  } else {
    footer.style.display = 'none';
  }
  leftCount.innerHTML = `${activeItemsCnt} items left`;
}
/**
 * footer에서 선택한 버튼에 따라 목록 업데이트
 * @param {*} e 
 * @param {*} key 
 */
 function updateListItem(e, key = 'all') {
  const btns = btnState.querySelectorAll('li');
  btns.forEach((item) => item.classList.remove('active'));
  e.target.parentElement.classList.toggle('active');

  itemList.querySelectorAll('li').forEach((item) => {
    if(key === 'all') {
      item.style.display = '';
    } else {
      if(item.classList.contains(key)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    }
  });
}
/**
 * 유효성 체크
 * @returns 
 */
function isValid(e) {
  if(!e.target.value) {
    modal.style.display = '';
    setTimeout(() => {
      btnConfirm.focus();
    }, 0);
    return;
  }
  return true;
}