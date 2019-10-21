export const hideList = (callback, id) => {
  const elem = document.getElementsByClassName("check-list")[0];
  const elemTitle = document.getElementsByClassName("check-list-title")[0];

  setTimeout(() => {
    callback(id);
    elem.classList.remove("big");
    elem.classList.add("small");
    setTimeout(() => {
      elemTitle.classList.remove("hide");
    }, 200);
  }, 100);
};
export const showList = (callback, item) => {
  const elem = document.getElementsByClassName("check-list")[0];
  const elemTitle = document.getElementsByClassName("check-list-title")[0];

  elem.style.display = "block";
  setTimeout(() => {
    elem.classList.add("big");
    elem.classList.remove("small");
    elemTitle.classList.add("hide");
    setTimeout(() => {
      if (item.length) callback(item);
    }, 200);
  }, 100);
};
