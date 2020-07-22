const listInput = document.querySelectorAll(".static .form input");
const listSmall = document.querySelectorAll(".static .form small");
const buttonForm = document.querySelector(".submit-button");

const handleValidate = (e) => {
  const index = e.target.dataset.index;
  const val = e.target.value;
  let error = document.querySelector(".border-red");
  if (val === "") {
    listSmall[index].innerHTML = "Trường này không được để trống";
    listInput[index].classList.add("border-red");
  } else {
    if (index == 0) {
      if (val.length < 6) {
        listSmall[index].innerHTML = "Độ dài tối thiểu là 6";
        listInput[index].classList.add("border-red");
      }
    }
    if (index == 1) {
      if (val.indexOf("@") === -1) {
        listSmall[index].innerHTML = "Email không hợp lệ";
        listInput[index].classList.add("border-red");
      }
      if (val.indexOf(".") === -1) {
        listSmall[index].innerHTML = "Email không hợp lệ";
        listInput[index].classList.add("border-red");
      }
    }
    if (
      listInput[0].value !== "" &&
      listInput[1].value !== "" &&
      listInput[2].value !== "" &&
      listInput[3].value !== "" &&
      error == null &&
      listInput[4].checked
    ) {
      console.log("really");
      buttonForm.disabled = false;
    } else {
      buttonForm.disabled = true;
    }
  }
};

const handleRemoveWarning = (e) => {
  let error = document.querySelector(".border-red");
  if (e.keyCode !== 9 && e.keyCode !== 18) {
    const index = e.target.dataset.index;
    listSmall[index].innerHTML = "";
    listInput[index].classList.remove("border-red");
  }
  if (
    listInput[2].value !== "" &&
    listInput[3].value !== "" &&
    listInput[2].value !== listInput[3].value
  ) {
    listSmall[4].innerHTML = "Password không trùng khớp";
    listInput[2].classList.add("border-red");
    listInput[3].classList.add("border-red");
  }
  if (
    listInput[2].value !== "" &&
    listInput[3].value !== "" &&
    listInput[2].value === listInput[3].value
  ) {
    listSmall[4].innerHTML = "";
    listInput[2].classList.remove("border-red");
    listInput[3].classList.remove("border-red");
  }
  if (
    listInput[0].value !== "" &&
    listInput[1].value !== "" &&
    listInput[2].value !== "" &&
    listInput[3].value !== "" &&
    error == null &&
    listInput[4].checked
  ) {
    console.log("really");
    buttonForm.disabled = false;
  } else {
    buttonForm.disabled = true;
  }
};

const handleButton = () => {
  let error = document.querySelector(".border-red");
  if (listInput[4].checked) {
    if (
      error == null &&
      listInput[0].value !== "" &&
      listInput[1].value !== "" &&
      listInput[2].value !== "" &&
      listInput[3].value !== ""
    ) {
      buttonForm.disabled = false;
    }
  } else {
    buttonForm.disabled = true;
  }
};

listInput.forEach((input) => {
  input.addEventListener("blur", handleValidate);
  input.addEventListener("keyup", handleRemoveWarning);
});
listInput[4].addEventListener("click", handleButton);
