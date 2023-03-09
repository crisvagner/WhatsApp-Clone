import { Format } from '../utils/Format';
import { CameraController } from './CameraController';
import { DocumentPreviewController } from './DocumentPreviewController';

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
            });

            this._cameraController = new CameraController(this.el.videoCamera);

        });

        this.el.btnClosePanelCamera.on('click', () => {
            this.el.panelCamera.removeClass('open');
            this.el.panelMessagesContainer.show();

            this.el.btnReshootPanelCamera.click()

            this._cameraController.stop();
        })

        this.el.btnTakePicture.on('click', () => {
            let dataURL = this._cameraController.takePicture();

            this.el.pictureCamera.src = dataURL;
            this.el.pictureCamera.show();
            this.el.videoCamera.hide();
            this.el.btnReshootPanelCamera.show();
            this.el.containerSendPicture.show();
            this.el.containerTakePicture.hide();

        });

        this.el.btnReshootPanelCamera.on('click', event => {

            this.el.btnReshootPanelCamera.hide();
            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.containerSendPicture.hide();
            this.el.containerTakePicture.show();

        });

        this.el.btnSendPicture.on('click', event => {
            console.log(this.el.pictureCamera.src);
        });


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
        });

        this.el.btnSendDocument.on('click', () => {
            this.el.inputDocument.click();
        });

        this.el.btnAttachPhoto.on('click', () => {

            this.el.inputPhoto.click();

        });

        this.el.inputDocument.on('change', event => {

            if (this.el.inputDocument.files.length) {

                let file = this.el.inputDocument.files[0];

                this.closeAllMainPanel();
                this.el.panelMessagesContainer.hide();
                this.el.panelDocumentPreview.addClass('open');
                this.el.panelDocumentPreview.sleep(500, () => {
                    this.el.panelDocumentPreview.style.height = 'calc(100%)';
                });


                this._documentPreview = new DocumentPreviewController(file);

                this._documentPreview.getPriviewData().then(data => {

                    this.el.filePanelDocumentPreview.hide();
                    this.el.imagePanelDocumentPreview.show();
                    this.el.imgPanelDocumentPreview.src = data.src;
                    this.el.imgPanelDocumentPreview.show();

                    this.el.infoPanelDocumentPreview.innerHTML = data.info;

                }).catch(event => {

                    if (event.error) {
                        console.error(event.event);
                    } else {

                        switch (file.type) {
                            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            case 'application/msword':
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-doc';
                                break;

                            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            case 'application/vnd.ms-excel':
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-xls';
                                break;

                            case 'application/vnd.ms-powerpoint':
                            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-ppt';
                                break;

                            default:
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-generic';
                        }

                        this.el.filePanelDocumentPreview.show();
                        this.el.imagePanelDocumentPreview.hide();

                        this.el.filenamePanelDocumentPreview.innerHTML = file.name;

                    }

                });

            }

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

        this.el.inputText.on('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSend.click();
            }
        })

        this.el.inputText.on('keyup', e => {

            if (this.el.inputText.innerHTML.length) {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        })

        this.el.btnSend.on('click', e => {
            console.log(this.el.inputText.innerHTML)
        })

        this.el.btnEmojis.on('click', event => {

            this.el.panelEmojis.toggleClass('open');

            if (this.el.panelEmojis.hasClass('open')) {
                this.el.iconEmojisOpen.hide();
                this.el.iconEmojisClose.show();
            } else {
                this.el.iconEmojisOpen.show();
                this.el.iconEmojisClose.hide();
            }

        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            emoji.on('click', event => {

                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(cls => {

                    img.classList.add(cls);


                });

                //Retorna parte do texto selecionada pelo usuário ou a posição atual do cursor.
                let cursor = window.getSelection();

                //Se o cursor não estiver focado no campo de input, forçamos o focus
                if (!cursor.focusNode || cursor.focusNode.id !== 'input-text') {
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                //Cria um novo objeto de controle de intervalos
                let range = document.createRange();
                //Retorna o intervalo atual do cursor
                range = cursor.getRangeAt(0);
                //Remove o conteúdo selecionado
                range.deleteContents();
                //Cria um fragmento de Documento
                let frag = document.createDocumentFragment();
                //Adiciona a imagem no fragmento
                frag.appendChild(img);
                //inserir o fragmento no intervalo
                range.insertNode(frag);
                //coloca o cursor após a imagem                    
                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'));

            })
        })

    }

    startRecordMicrophoneTime() {

        this._microphoneController = new MicrophoneController();

        this._microphoneController.on('ready', event => {

            this._microphoneController.startRecorder();

        });

        this._microphoneController.on('timer', (data, event) => {

            this.el.recordMicrophoneTimer.innerHTML = data.displayTimer;

        });

    }
    }

    closeMenuAttach() {

        this.el.menuAttach.removeClass('open');
        document.removeEventListener('click', this.closeMenuAttach);

    }

}