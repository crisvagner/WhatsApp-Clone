class WhatsAppController {

    constructor() {
        console.log('eeeeeeeeeeeeeeeeeeeeeee')

        this.loadElements();
        this.elementsPrototype();
        this.initEvents();
    }

    loadElements() {
        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        })


    }

    elementsPrototype() {
        Element.prototype.hide = function () {
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        Element.prototype.on = function (events, fn) {

            events.split(' ').forEach(event => {

                this.addEventListener(event, fn);

            });
            return this;

        }

        Element.prototype.css = function (styles) {

            for (let name in styles) {

                this.style[name] = styles[name];

            }
            return this;

        }

        Element.prototype.addClass = function (name) {

            this.classList.add(name);
            return this;

        }

        Element.prototype.removeClass = function (name) {

            this.classList.remove(name);
            return this;

        }

        Element.prototype.toggleClass = function (name) {

            this.classList.toggle(name);
            return this;

        }

        Element.prototype.hasClass = function (name) {

            return this.classList.contains(name);

        }

        Element.prototype.sleep = function (duration, fn) {

            setTimeout(fn, duration);
            return this;

        }

        HTMLFormElement.prototype.getForm = function () {

            return new FormData(this);

        }

        HTMLFormElement.prototype.toJSON = function () {

            let json = {};

            this.getForm().forEach((value, key) => {
                json[key] = value;
            });

            return json;

        }
    }

    initEvents() {

        this.el.myPhoto.on('click', event => {

            this.el.panelAddContact.hide();
            this.el.panelEditProfile.show().sleep(1, () => {
                this.el.panelEditProfile.addClass('open');
            });

        });

        this.el.btnClosePanelEditProfile.on('click', event => {

            this.el.panelEditProfile.removeClass('open').sleep(300, () => {
                this.el.panelEditProfile.hide();
            });

        });

        this.el.btnNewContact.on('click', event => {

            this.el.panelEditProfile.hide()
            this.el.panelAddContact.show().sleep(1, () => {
                this.el.panelAddContact.addClass('open');
            });

        });

        this.el.btnClosePanelAddContact.on('click', event => {

            this.el.panelAddContact.removeClass('open').sleep(300, () => {
                this.el.panelAddContact.hide();
            });

        });

        this.el.photoContainerEditProfile.on('click', event => {

            this.el.inputProfilePhoto.click();

        });

        this.el.inputNamePanelEditProfile.on('keypress', event => {

            if (event.key === 'Enter') {
                event.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }

        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', () => {
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });
            })
        })

        this.el.btnAttach.on('click', event => {

            event.stopPropagation();

            this.el.menuAttach.toggleClass('open');

            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        this.el.btnAttachCamera.on('click', () => {

            console.log('camera')

        });

        this.el.btnAttachDocument.on('click', () => {

            console.log('document')

        });

        this.el.btnAttachPhoto.on('click', () => {

            console.log('photo')

        });

        this.el.btnAttachContact.on('click', () => {

            console.log('contact')

        });

    }

    closeMenuAttach() {

        this.el.menuAttach.removeClass('open');
        document.removeEventListener('click', this.closeMenuAttach);

    }

}