let uploadButton = document.getElementById("imageUpload");
let chosenImage = document.getElementById("chosenppic");

uploadButton.onchange = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadButton.files[0]);

  console.log(uploadButton.files[0]);
  reader.onload = () => {
    chosenImage.setAttribute("src", reader.result);
  };
};
