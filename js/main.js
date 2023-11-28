document.addEventListener("DOMContentLoaded", function () {
  function setItemToStorage(task) {
    let data = JSON.parse(localStorage.getItem("contact-data")) || [];
    data.push(task);
    localStorage.setItem("contact-data", JSON.stringify(data));
  }

  let btn = document.querySelector(".btn-add-contact");
  let inp1 = document.querySelector(".name-inp");
  let inp2 = document.querySelector(".phone-inp");
  let inp3 = document.querySelector(".img-link-inp");
  let cardContainer = document.querySelector(".card-container");

  btn.addEventListener("click", () => {
    if (!inp1.value.trim() || !inp2.value.trim() || !inp3.value.trim()) {
      alert("Заполните все поля!");
      return;
    }

    let obj = {
      name: inp1.value,
      phoneNumber: inp2.value,
      img: inp3.value,
    };

    setItemToStorage(obj);
    createElement();

    inp1.value = "";
    inp2.value = "";
    inp3.value = "";
  });

  // Создаем карточки
  function createElement() {
    cardContainer.innerHTML = "";
    let newData = JSON.parse(localStorage.getItem("contact-data")) || [];

    newData.forEach((elem, index) => {
      let card = document.createElement("div");
      card.classList.add("card");

      let namePhoneInfo = document.createElement("div");

      let nameSpan = document.createElement("span");
      nameSpan.textContent = `Name: ${elem.name}`;
      nameSpan.classList.add("nameSpan");
      namePhoneInfo.appendChild(nameSpan);

      let phoneSpan = document.createElement("span");
      phoneSpan.textContent = `Phone: ${elem.phoneNumber}`;
      phoneSpan.classList.add("phoneSpan");
      namePhoneInfo.appendChild(phoneSpan);

      let img = document.createElement("img");
      img.src = elem.img;
      img.alt = "Image";
      img.classList.add("card-image");

      card.appendChild(namePhoneInfo);
      card.appendChild(img);

      let btnDelete = document.createElement("button");
      btnDelete.classList.add("btn-delete");
      btnDelete.innerText = "DELETE";
      card.appendChild(btnDelete);

      let btnEdit = document.createElement("button");
      btnEdit.classList.add("btn-edit");
      btnEdit.innerText = "EDIT";
      card.appendChild(btnEdit);

      btnDelete.addEventListener("click", () => {
        deleteElement(index);
      });

      btnEdit.addEventListener("click", () => {
        editElement(index);
      });

      cardContainer.appendChild(card);
    });
  }

  // Удаляем контакт
  function deleteElement(index) {
    let data = JSON.parse(localStorage.getItem("contact-data"));
    data.splice(index, 1);
    localStorage.setItem("contact-data", JSON.stringify(data));
    createElement();
  }
  let currentIndex;
  // Получаем ссылки на поля ввода в модальном окне для редактирования
  let btnSave = document.querySelector(".btn-save");
  let btnClose = document.querySelector(".btn-close");
  let mainModal = document.querySelector(".main-modal");

  let inpEditName = document.querySelector(".inp-edit-name");
  let inpEditPhone = document.querySelector(".inp-edit-phone");
  let inpEditImg = document.querySelector(".inp-edit-img");

  // Редактируем контакт
  function editElement(index) {
    mainModal.style.display = "flex";
    currentIndex = index;
    let data = JSON.parse(localStorage.getItem("contact-data"));
    let selectedContact = data[index];
    inpEditName.value = selectedContact.name;
    inpEditPhone.value = selectedContact.phoneNumber;
    inpEditImg.value = selectedContact.img;
    mainModal.style.justifyContent = "center";
    mainModal.style.alignItems = "center";
  }

  // Сохраняем отредактированный контакт
  btnSave.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("contact-data"));

    let updatedName = inpEditName.value;
    let updatedPhone = inpEditPhone.value;
    let updatedImg = inpEditImg.value;

    if (!updatedName.trim() || !updatedPhone.trim() || !updatedImg.trim()) {
      alert("Заполните все поля!");
      return;
    }

    let updatedTask = {
      name: updatedName,
      phoneNumber: updatedPhone,
      img: updatedImg,
    };

    data.splice(currentIndex, 1, updatedTask);
    localStorage.setItem("contact-data", JSON.stringify(data));
    mainModal.style.display = "none";
    createElement();
  });

  btnClose.addEventListener("click", () => {
    mainModal.style.display = "none";
  });

  createElement();
});
