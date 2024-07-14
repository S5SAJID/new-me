const hourEle = document.querySelector('.hour');
const secEle = document.querySelector('.sec');
const minEle = document.querySelector('.min');
const timeEle = document.querySelector('#time');
const dateEle = document.querySelector('p');
const newBookMarkBtn = document.querySelector('.new-bookmark');
const bookMarksContainer = document.querySelector('.links');

async function addNewBootmark() {
    let url = prompt("Enter URL")
    if (url && validURL(url)) {
        let origin = new URL(url).origin;
        const favicon = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=40`;
        createNewBootMark(favicon, url)
    } else {
        alert("Enter Valid URL !")
        return;
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}




function updateTime() {
    let date = new Date()
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let timeString = date.toLocaleTimeString('en-US', { timeStyle: "short", hour12: true });

    let dateString = date.toLocaleDateString('en-US', { day: "2-digit", month: "long", weekday: "long" })

    timeEle.innerText = timeString.replace(" PM", "").replace(" AM", "")
    dateEle.innerText = dateString

    let hoursRotation = 30 * hours + minutes / 2;
    let minutesRotation = 6 * minutes;
    let secRotation = 6 * seconds;

    hourEle.style.transform = `rotate(${hoursRotation}deg)`
    minEle.style.transform = `rotate(${minutesRotation}deg)`
    secEle.style.transform = `rotate(${secRotation}deg)`
}
updateTime()
setInterval(() => {
    updateTime()
}, 1000);

window.addEventListener("load", () => {
    let oldBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [{url: "#", favicon: ""}];
    oldBookmarks.map(bk => {
        const newBookmarkEle = document.createElement("a");
        newBookmarkEle.classList.add('link');
        newBookmarkEle.href = bk.url;
        newBookmarkEle.innerHTML = `<img width=20 style="border-radius: 50%;" height=20 src="${bk.favicon}" alt=${bk.url} />`;
        
        bookMarksContainer.append(newBookmarkEle)
    })

    let newBookmarkEle = document.createElement("a");
    newBookmarkEle.href = "#";
    newBookmarkEle.classList.add("link", "new-bookmark");
    newBookmarkEle.innerHTML = `
    <svg
          style="fill: #666"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="lni_lni-plus"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          style="enable-background: new 0 0 64 64"
          xml:space="preserve"
        >
          <path
            d="M60,29.8H34.3V4c0-1.2-1-2.3-2.3-2.3c-1.2,0-2.3,1-2.3,2.3v25.8H4c-1.2,0-2.3,1-2.3,2.3c0,1.2,1,2.3,2.3,2.3h25.8V60  c0,1.2,1,2.3,2.3,2.3c1.2,0,2.3-1,2.3-2.3V34.3H60c1.2,0,2.3-1,2.3-2.3C62.3,30.8,61.2,29.8,60,29.8z"
          />
        </svg>`
    bookMarksContainer.appendChild(newBookmarkEle)
    newBookmarkEle.addEventListener("click", () => {
        addNewBootmark()
    })
})

function createNewBootMark(favicon, url) {
    const bookmarkEle = document.createElement("a");
    bookmarkEle.classList.add('link');
    bookmarkEle.href = url;
    bookmarkEle.innerHTML = `<img width=20 style="border-radius: 50%;" height=20 src="${favicon}" alt=${url} />`;
    // Retrieve bookmarks from localStorage and parse them into an array
    const oldOne = JSON.parse(localStorage.getItem("bookmarks")) || [];
    console.log(oldOne)

    // Add the new bookmark to the array
    const newBookmark = {
        url: url,
        favicon: favicon
    };

    // Update the bookmarks array with the new bookmark
    oldOne.push(newBookmark);

    // Save the updated bookmarks array back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(oldOne));
    bookMarksContainer.appendChild(bookmarkEle)
}