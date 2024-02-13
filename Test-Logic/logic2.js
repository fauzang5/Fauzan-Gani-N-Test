function countWords(sentence) {
    // Menghilangkan karakter khusus dari kalimat
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|<>\/~]/;
    
    // Memisahkan kalimat menjadi array kata-kata
    const splittedArr = sentence.split(' ');
    
    // gunakan fungsi filter dan test untuk memfilter kata-kata yang mengandung karakter khusus
    const filteredArr = splittedArr.filter((item) => !specialChars.test(item));

    return filteredArr.length;
}

const word1 = 'Saat meng*ecat tembok, Agung dib_antu oleh Raihan.';
const word2 = 'Berapa u(mur minimal[ untuk !mengurus ktp?';
const word3 = 'Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.';

console.log(countWords(word1)); // Output: 5
console.log(countWords(word2)); // Output: 3
console.log(countWords(word3)); // Output: 4
