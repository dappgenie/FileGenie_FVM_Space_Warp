// 1. The user's client application generates a unique encryption key, such as an RSA key pair, when the user first creates an account.
// 2. When the user uploads a file to the platform, the client application encrypts the file using the encryption key.
// 3. The encrypted file is then broken into chunks and stored on different storage nodes in the Filecoin network, along with the corresponding encryption key
// 4. When a user wants to download a file, the client application retrieves the encrypted chunks of the file and the encryption key from the storage nodes.
// 5. The client application then uses the encryption key to decrypt the file, allowing the user to access the original file.

// import * as rsa from 'node-rsa';

// Generate a new RSA key pair
// const fileInput = document.getElementById('fileInput') as HTMLInputElement;
// const file = fileInput.files[0];

// const reader = new FileReader();

// reader.onload = (event) => {
//     // read in the file to be encrypted
//     const fileData = event.target.result as ArrayBuffer;
//     // encrypt the file using the public key
//     const encryptedData = key.encrypt(fileData, 'base64');
// };

// reader.readAsArrayBuffer(file);


// And for writing the encrypted file, you can use saveAs() method from file-saver library.
// import * as fileSaver from 'file-saver';

// const blob = new Blob([encryptedData], { type: 'application/octet-stream' });
// fileSaver.saveAs(blob, 'file.txt.encrypted');

// const key = new rsa();
// const privateKey = key.exportKey('pkcs1-private-pem');
// const publicKey = key.exportKey('pkcs1-public-pem');

// // read in the file to be encrypted
// const fileData = fs.readFileSync("file.txt");

// // encrypt the file using the public key
// const encryptedData = key.encrypt(fileData, 'base64');

// // write the encrypted data to a new file
// fs.writeFileSync("file.txt.encrypted", encryptedData);
