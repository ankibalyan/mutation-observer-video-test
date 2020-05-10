import videos from "./videos.js";
const videoNode = document.querySelector("#vid");
const changeButton = document.querySelector("#changeButton");
const srcText = document.querySelector("#vidSrc");
let counter = 0;

const updateVideoSrc = () => {
  counter++;
  videoNode.pause(); // pause previous one
  videoNode.src = videos && videos[counter] && videos[counter].sources[0];
  srcText.textContent = `Src: ${videoNode.src}`;
  videoNode.play();
  // uncomment for setIntrval test
  // if (counter === 9) clearInterval(setInvervalID);
  if (counter === 9) counter = -1;
};
updateVideoSrc();

changeButton.addEventListener("click", updateVideoSrc);

// uncomment for setIntrval test
// let setInvervalID =  setInterval(updateVideoSrc, 5000);

// observer
function callback(mutationList, observer) {
  mutationList.forEach(mutation => {
    console.log(mutation.type);
    switch (mutation.type) {
      case "childList":
        break;
      case "attributes":
        srcText.textContent = `Src: ${videoNode.src}`;
        console.log({ message: "changed", element: mutation.target });
        break;
      default:
        break;
    }
  });
}

const observer = new MutationObserver(callback);
observer.observe(videoNode, { attributes: true });
