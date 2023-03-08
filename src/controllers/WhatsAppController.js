import { Format } from '../utils/Format';
import { CameraController } from './CameraController';

export class WhatsAppController {

    constructor() {
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

            this.el.menuAttach.addClass('open');

            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        this.el.btnAttachCamera.on('click', () => {

            this.el.panelMessagesContainer.hide();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100%)'
            })

        });

        this.el.btnClosePanelCamera.on('click', () => {
            this.el.panelCamera.removeClass('open');
            this.el.panelMessagesContainer.show();
        })

        this.el.btnTakePicture.on('click', () => {
            console.log('btnTakePicture')
        })

        this.el.btnAttachDocument.on('click', () => {

            this.el.panelMessagesContainer.hide();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': 'calc(100%)'
            })

        });

        this.el.btnClosePanelDocumentPreview.on('click', () => {
            this.el.panelDocumentPreview.removeClass('open');
            this.el.panelMessagesContainer.show();
        })

        this.el.btnSendDocument.on('click', () => {
            this.el.inputDocument.click();
        })

        this.el.btnAttachPhoto.on('click', () => {

            this.el.inputPhoto.click();

        });

        this.el.inputPhoto.on('change', () => {

            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file)
            })
        })

        this.el.btnAttachContact.on('click', () => {
            this.el.modalContacts.show();
        });

        this.el.btnCloseModalContacts.on('click', () => {
            this.el.modalContacts.hide();
        })

        this.el.contactList.on('click', () => {
            console.log('contactList')
        })

    }

    closeMenuAttach() {

        this.el.menuAttach.removeClass('open');
        document.removeEventListener('click', this.closeMenuAttach);

    }

}