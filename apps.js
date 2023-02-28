const loadPhone = async (searchText, dataLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try {
        const res = await fetch(URL);
        const data = await res.json();
        displayPhone(data.data, dataLimit);
    }
    catch(error){
        console.log(error);
    }
}
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = "";

    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        const { image, phone_name, slug } = phone
        // console.log(phone_name)
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-90 p-3">
                <img src="${phone ? image : "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                     Details
                    </button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div);

    });
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchFieldValue = document.getElementById('search-field').value;
    loadPhone(searchFieldValue, dataLimit);
}
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(9);
})
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        processSearch(9);
    }
})
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch()
    document.getElementById('search-field').value = "";
})
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
loadPhone('apple', 10);
const loadPhoneDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showPhoneDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
}
const showPhoneDetails = phone => {
    console.log(phone);
    document.getElementById('exampleModalLabel').innerText = phone.slug;
    document.getElementById('modal-body').innerHTML = `
    <p>ReleaseDate: ${phone ? phone.releaseDate : "No releaseDate"}</p>
    <p>storage: ${phone.mainFeatures.storage}</p>
    `
}