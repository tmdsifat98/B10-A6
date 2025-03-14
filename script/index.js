// custom tailwind code
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#0E7A81",
      },
    },
  },
};

// main js code

// loadcategory function
const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  showCategory(data.categories);
};
// category create function and append
const showCategory = (categories) => {
  categories.forEach((element) => {
    const categoryContainer = document.getElementById("category-container");
    const div = document.createElement("div");
    div.innerHTML = `

    <div onclick="categoryData('${element.category}')" class="flex gap-7 btn btn-lg px-12 bg-white rounded-lg hover:rounded-full border-primary">
    <img src="${element.category_icon}" alt=""> <span class="font-bold text-xl">${element.category}</span></div>
        `;

    categoryContainer.appendChild(div);
    // console.log();
  });
};

const categoryData = async (element) => {
  const response = await fetch(`
    https://openapi.programming-hero.com/api/peddy/category/${element}`);
  const data = await response.json();

  if (data.data) {
    showData(data.data);
  }
};
categoryData("cat");

const showData = async (elements) => {
  const dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = "";
  if (elements.length < 1) {
    const div = document.createElement("div");
    div.classList.add("col-span-3");
    div.innerHTML = `<div class="flex flex-col justify-center items-center">
        <img src="./images/error.webp" alt="">
        <h1 class="text-4xl font-bold mb-5">No Information Available</h1>
        <p class="w-2/3 text-xl text-gray-700 text-center mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>`;
    dataContainer.append(div);
  }
  elements.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
         <div class="card bg-base-100 p-3 border-2 shadow-xl">
      <img
        class="rounded-md"
        src="${element.image}"
        alt="Shoes"
      />
      <div class="flex flex-col gap-2">
        <h2 class="card-title my-3 text-3xl">${element.pet_name}</h2>
        <p class="flex gap-2 items-center text-xl"><i class="fas fa-qrcode"></i> <span>Breed: ${element.breed}</span></p>
        <p class="flex gap-2 items-center text-xl"><i class="fas fa-calendar"></i> <span>Birth: 2024</span></p>
        <p class="flex gap-2 items-center text-xl"><i class="fas fa-mercury"></i> <span>Gender: ${element.gender}</span></p>
        <p class="flex gap-2 items-center text-xl"><i class="fas fa-dollar-sign"></i> <span>Price : ${element.price}$</span></p>
        <div class="flex justify-between border-t-2">
            <div class="px-6 rounded-xl py-2 border-2 mt-2"><i class="fas fa-thumbs-up"></i></div>
            <div class="px-6 rounded-xl py-2 border-2 mt-2 text-primary font-bold">Adopt</div>
            <button class="modal-btn px-6 rounded-xl py-2 border-2 mt-2 text-primary font-bold">Details</i></button>
        </div>
      </div>
    </div>
    `;
    dataContainer.append(div);
  });
  const allbtn = document.querySelectorAll(".modal-btn");
  for (let btn of allbtn) {
    btn.addEventListener("click", (event) => {
      const parent = event.target.parentNode.parentNode.parentNode;
      const parent2 = event.target.parentNode.parentNode;
      const modalShow = document.getElementById("modal-show");
      modalShow.innerHTML = "";
      const div = document.createElement("div");
      console.log();
      div.innerHTML = `
              <div class="card bg-base-100 w-96 p-3 border-2 shadow-xl"> 
                <img  class="rounded-md" src="${parent.childNodes[1].src}" alt="Shoes" />
                  <div class="flex flex-col  flex-wrap gap-2">
                    <h2 class="card-title my-3 text-3xl">${parent2.childNodes[1].innerText}</h2>
                    <p class="flex gap-2 items-center text-xl"><i class="fas fa-qrcode"></i> <span>${parent2.childNodes[2].textContent}</span></p>
                    <p class="flex gap-2 items-center text-xl"><i class="fas fa-calendar"></i> <span>Birth: 2024</span></p>
                    <p class="flex gap-2 items-center text-xl"><i class="fas fa-mercury"></i> <span>Gender: gender</span></p>
                    <p class="flex gap-2 items-center text-xl"><i class="fas fa-dollar-sign"></i> <span>Price : price$</span></p>
                    <div>
                      <div>
                          <h3>Details Information</h3>
                          <p></p>
                      </div>
                    </div>
                  </div>
                </div>
        `;
      modalShow.appendChild(div);
    });
  }
};

// {
//     "status": true,
//     "message": "successfully fetched pet data using id 6",
//     "petData": {
//         "petId": 6,
//         "breed": "Bengal",
//         "category": "Cat",
//         "price": 950,
//         "image": "https://i.ibb.co.com/PFbWMGk/pet-6.jpg",
//         "gender": "Male",
//         "pet_details": "This playful male Bengal cat, born on November 10, 2022, is full of energy and loves to climb and engage with toys. Fully vaccinated and priced at $950, he's ideal for active households looking for a curious and adventurous feline friend.",
//         "vaccinated_status": "Fully",
//         "pet_name": "Leo"
//     }
// }
loadCategories();
