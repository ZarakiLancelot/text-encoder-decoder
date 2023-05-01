// <=================================== CONSTANTES ===================================>
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');
const inputTextArea = document.getElementById('input-text');
const resultTextArea = document.getElementById('result-text');
const emptyResultTextArea = document.getElementById('initial');
const fillResultTextArea = document.getElementById('final-result');
const copyButton = document.getElementById('copy');
const imageContainer = document.getElementById('animation');

const RULES_ENCRYPT = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat'
};

emptyResultTextArea.style.display = 'block';
fillResultTextArea.style.display = 'none';
// <=================================== CONSTANTES ===================================>

// Función para encriptar el texto que se encuentre en el TextArea de ingreso
function encrypt(text, rules) {
  let result = '';

  text.split('').forEach(char => {
    if (rules[char]) {
      result += rules[char];
    } else {
      result += char;
    }
  });

  return result;
}

// Función para desencriptar el texto que se encuentre en el TextArea de ingreso
function decrypt(text) {
  let result = '';

  result = text.replace(/(ai|enter|imes|ober|ufat)/g, (letra) => {
    switch (letra) {
      case 'ai':
        return 'a';
        break;
      case 'enter':
        return 'e';
        break;
      case 'imes':
        return 'i';
        break;
      case 'ober':
        return 'o';
        break;
      case 'ufat':
        return 'u';
        break;
      default:
        break;
    }
  });

  return result;
}

// Función para verificar que no existan caracteres no permitidos (mayúsculas, especiales y números)
function checkText(inputTextArea) {
  // Expresión regular para permitir solamente letras minúsculas
  const REGEX = /^[a-z]+$/;

  // Se valida si el texto contiene caracteres especiales, de ser así
  // se muestra una alerta, se elimina el texto y por ende no se encripta.
  if (!REGEX.test(inputTextArea.value)) {
    swal({
      title: 'Error',
      text: 'El texto no debe incluir mayúsculas, caracteres especiales ni números.',
      icon: 'error'
    });

    inputTextArea.value = '';

    return false;
  }

  return true;
}

// Función para habilitar/deshabilitar los botones en función si el inputTextArea tiene data.
function disableEnableButtons() {
  if (inputTextArea.value) {
    encryptButton.disabled = false;
    decryptButton.disabled = false;
  } else {
    encryptButton.disabled = true;
    decryptButton.disabled = true;
  }
}

function showImage() {
  emptyResultTextArea.style.display = 'none';
  const IMG = document.createElement('img');

  IMG.src = './assets/img/transfer_data.gif';
  IMG.alt = 'Passing data';
  imageContainer.appendChild(IMG);
}

function removeImage() {
  imageContainer.innerHTML = '';
}

// <=================================== EVENTOS ===================================>
encryptButton.addEventListener('click', () => {
  const TEXT = inputTextArea.value;
  showImage();
  setTimeout(() => {
    const ENCRYPTED_TEXT = encrypt(TEXT, RULES_ENCRYPT);
    resultTextArea.value = ENCRYPTED_TEXT;
    removeImage();
    fillResultTextArea.style.display = 'block';
  }, 3000);
});

decryptButton.addEventListener('click', () => {
  const TEXT = inputTextArea.value;
  showImage();
  setTimeout(() => {
    const DECRYPTED_TEXT = decrypt(TEXT);
    resultTextArea.value = DECRYPTED_TEXT;
    removeImage();
  }, 3000);
});

inputTextArea.addEventListener('keyup', () => {
  disableEnableButtons();
  checkText(inputTextArea);
});

copyButton.addEventListener('click', () => {
  swal({
    title: 'Copiado',
    text: 'El texto se ha copiado al portapapeles.',
    icon: 'success'
  }).then(() => {
    inputTextArea.value = resultTextArea.value;
    resultTextArea.value = '';
    disableEnableButtons();
  })
});
// <=================================== EVENTOS ===================================>
