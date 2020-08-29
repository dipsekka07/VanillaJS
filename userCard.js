const template = document.createElement('template');
template.innerHTML = `
<style>        
h3 {
    color: coral;
}
</style>

<link rel="stylesheet" href="userCard.css"></link>
<div class="user-card">
    <img></img>
    <div>
    <h3></h3>
    <div class="info" >
    <slot name="email"></slot>
    <slot name="phone"></slot>
    </div>
    <button id="toggle-info">Show info</button>
    </div>
    
    
</div>


`;



class UserCard extends HTMLElement {
    displayInfo= false;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');

        this.shadowRoot.querySelector('img').src = this.getAttribute('picture');

    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').
        addEventListener('click',()=> this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').
        removeEventListener();
    }

    toggleInfo() {
        let infoElem = this.shadowRoot.querySelector(".info");
        let buttonElem = this.shadowRoot.querySelector("#toggle-info");
        if(this.displayInfo){
            infoElem.classList.remove("show-info");
            buttonElem.innerText = "Show Info";
            this.displayInfo = false;
        }else{
            infoElem.classList.add("show-info");
            buttonElem.innerText = "Hide Info";
            this.displayInfo = true;
        }
    }

}

window.customElements.define('user-card', UserCard);