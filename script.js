const uploadImage = document.querySelector(".upload-image"),
previewImage = uploadImage.querySelector("img"),
fileInput = uploadImage.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
imageInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let originalImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        widthInput.value = previewImage.naturalWidth;
        heightInput.value = previewImage.naturalHeight;
        originalImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
    console.log(file)
}

widthInput.addEventListener("keyup", () => {
    let height = ratioInput.checked ? widthInput.value / originalImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener("keyup", () => {
    let width = ratioInput.checked ? heightInput.value * originalImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    let context = canvas.getContext("2d");

    const imageQuality  = imageInput.checked ? 0.7 : 1.0;
    canvas.height = heightInput.value;
    canvas.width = widthInput.value;

    context.drawImage(previewImage, 0, 0, canvas.height, canvas.width);

    // document.body.appendChild(canvas);
    a.href = canvas.toDataURL("image/jpeg", imageQuality);
    a.download = new Date().getTime();
    a.click();
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadImage.addEventListener("click", () => fileInput.click());