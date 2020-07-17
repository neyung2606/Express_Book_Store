const input = document.getElementById('qty');

const subQuan = () => {
    if(Number(input.value) <= 1 ) return;
    input.value -= 1;
}
const addQuan = () => {
    input.value = Number(input.value) + 1;
}

const validateNumber = e => {
    if (e.charCode < 48 || e.charCode > 57) return false;
    return true;
}