// import * as cryptoMpc from 'js-crypto-mpc';

// // Instead of using FHE, you can use other methods to achieve zero-knowledge 
// // sharing, such as secure multi-party computation (MPC) or secure enclaves (SGX). 
// // These methods allow a group of parties to compute on encrypted data without 
// // revealing the plaintext to any of the parties.

// const fileInput = document.getElementById('fileInput') as HTMLInputElement;
// const file = fileInput.files[0];
// const reader = new FileReader();

// reader.onload = async (event) => {
//     // read in the file to be encrypted
//     const fileData = event.target.result as ArrayBuffer;
//     // Encrypt the file
//     const [secretKey, ciphertext] = await cryptoMpc.encrypt(fileData);
//     // Share the encrypted file and the secret key with the person you want to share the file with
//     // The person can perform computations on the ciphertext without being able to see the plaintext
// };

// reader.readAsArrayBuffer(file);
