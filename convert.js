// converter.js

// DATA MAPPINGS (Sourced from uploaded ShreeLipi.js logic)
const array_shreelipi = [
  'u', 'ª', '}', 'n', 'p', 'H', '·', 'I', '»', 'J', '½', 'K',
  'M', 'À', 'N', 'µO', 'O', 'µÁ', 'Á', 'P', 'Q', 'R', '¶S', 'S',
  '¶T', 'T', 'U', 'Ê', 'W', 'Ï', 'V', 'Ë', 'Y', 'Ü', 'X', 'Z',
  'Ý', '\\', 'â', '[', 'ß', '^', 'ä', ']', 'ã', '_', 'å', '`',
  'a', 'c', 'ë', 'd', 'ì', 'e', 'û', 'í', 'f', 'î', 'g', 'ñ',
  'h', 'j', 'ú', 'k', 'Ô', 'Û', 'Ú', 'à', 'Þ', 'Q­', 'º$', 'Ì',
  'Ð', 'Õ', 'l', 'Îm', '¸', '„', 'ˆ', 'œ', 'Å', 'Am¡', 'Am{',
  'Am|', 'Am', 'A', 'B©', 'B', 'C', 'D', 'E{', 'E', 'F', 'm°',
  'm{', 'm|', '{', '|', 'm¡', 'm¢', '¡', '¢', 'm', 'r', 's',
  't', 'w', 'þ', 'y', '§', '±', '•', '¥', '²', 'Ñ', '«', 'é',
  'ê', '&', '$', '>', 'µ'
];

const array_unicode = [
  '©', '©ं', '{©', 'o', 'o', "क", 'क्‌', "ख", 'ख्‌', "ग", 'ग्', "घ",
  'च', 'च्‌', 'छ', 'ज़', 'ज', 'ज़्‌', 'ज्‌', 'झ', "ट", "ठ", 'ड़', "ड",
  'ढ़', 'ढ', "ण", 'ण्', "थ", 'थ्', "त", 'त्', "ध", 'ध्', "द", "न",
  'न्', "फ", 'फ्‌', "प", 'प्‌', "भ", 'भ्', "ब", 'ब्‌', "म", 'म्',
  "य", "र", "ल", 'ल्‌', "व", 'व्‌', "श", 'श्', 'श्', 'ष', 'ष्‌',
  "स", 'स्', "ह", 'क्ष', 'क्ष्', 'ज्ञ', 'द्द', 'द्व', 'द्य', 'प्र',
  'न्न', 'ट्र', 'क्त', 'त्र', 'द्र', 'द्ध', 'श्र', 'त्त', 'क्क',
  'ल्ल', 'ह्व', 'श्व', 'ट्ट', 'औ', 'ओ', 'ओं', 'आ', 'अ', 'ई', 'इ',
  'उ', 'ऊ', 'ऐ', 'ए', 'ऋ', 'ॉ', "ो", "ों", "े", "ें", "ौ", "ौं",
  "ै", 'ैं', "ा", "ी", "ी", "ीं", "ु", 'ु', "ू", 'ं', 'ँ', 'ः',
  'ृ', '्‌', 'दृ', '्र', 'रु', 'रू', '।', '', '', ''
];

/**
 * Converts ShreeLipi text to Unicode
 */
export function convertToUnicode(text) {
  if (!text) return "";
  let modified_substring = text;
  const array_length = array_shreelipi.length;

  // 1. Basic Substitution
  for (let i = 0; i < array_length; i++) {
    if (array_shreelipi[i] && array_unicode[i]) {
       modified_substring = modified_substring.split(array_shreelipi[i]).join(array_unicode[i]);
    }
  }

  // 2. Special Glyph Corrections (Logic from convert.js/ShreeLipi.js)

  // Fix: Chhoti 'i' matra (swapping position)
  let position_of_i = modified_substring.indexOf("o");
  while (position_of_i !== -1) {
    let char_next = modified_substring.charAt(position_of_i + 1);
    let to_replace = "o" + char_next;
    modified_substring = modified_substring.replace(to_replace, char_next + "ि");
    position_of_i = modified_substring.indexOf("o", position_of_i + 1);
  }

  // Fix: Chhoti 'i' on half-letters
  let position_wrong_ee = modified_substring.indexOf("ि्");
  while (position_wrong_ee !== -1) {
    let cons_next = modified_substring.charAt(position_wrong_ee + 2);
    let replace_str = "ि्" + cons_next;
    modified_substring = modified_substring.replace(replace_str, "्" + cons_next + "ि");
    position_wrong_ee = modified_substring.indexOf("ि्", position_wrong_ee + 2);
  }

  // Fix: 'q' replacement
  position_of_i = modified_substring.indexOf("q");
  while (position_of_i !== -1) {
    let char_next = modified_substring.charAt(position_of_i + 1);
    let to_replace = "q" + char_next;
    modified_substring = modified_substring.replace(to_replace, char_next + "o");
    position_of_i = modified_substring.indexOf("q", position_of_i + 1);
  }

  // Fix: 'o' + Halant correction
  position_wrong_ee = modified_substring.indexOf("o्");
  while (position_wrong_ee !== -1) {
    let cons_next = modified_substring.charAt(position_wrong_ee + 2);
    let replace_str = "o्" + cons_next;
    modified_substring = modified_substring.replace(replace_str, "्" + cons_next + "िं");
    position_wrong_ee = modified_substring.indexOf("o्", position_wrong_ee + 3);
  }

  // Cleanup leftover 'o'
  modified_substring = modified_substring.replace(/o/g, "िं");

  // 3. Reph Correction (The flying 'r')
  const set_of_matras = "ािीुूृेैोौंःँॅ";
  let position_of_reph = modified_substring.indexOf("©");

  while (position_of_reph > 0) {
    let prob_pos = position_of_reph - 1;
    let char_at_pos = modified_substring.charAt(prob_pos);

    while (set_of_matras.includes(char_at_pos)) {
      prob_pos--;
      char_at_pos = modified_substring.charAt(prob_pos);
    }

    let chunk = modified_substring.substring(prob_pos, position_of_reph);
    let new_chunk = "र्" + chunk;
    
    let before = modified_substring.substring(0, prob_pos);
    let after = modified_substring.substring(position_of_reph + 1);
    modified_substring = before + new_chunk + after;
    
    position_of_reph = modified_substring.indexOf("©", prob_pos + new_chunk.length);
  }

  return modified_substring;
}

/**
 * Converts Unicode text back to ShreeLipi
 */
export function convertToShreeLipi(text) {
  if (!text) return "";
  let modified_substring = "  " + text; // Padding for safety
  
  // 1. Logic for 'िं' -> 'q'
  let pos_f = modified_substring.indexOf('िं');
  while (pos_f !== -1) {
      modified_substring = modified_substring.replace('िं', 'q');
      let char_left = modified_substring.charAt(pos_f - 1);
      modified_substring = modified_substring.replace(char_left + "q", "q" + char_left);
      
      pos_f = pos_f - 1;
      while (modified_substring.charAt(pos_f - 1) === "्" && pos_f !== 0) {
         let str_replace = modified_substring.charAt(pos_f - 2) + "्";
         modified_substring = modified_substring.replace(str_replace + "q", "q" + str_replace);
         pos_f -= 2;
      }
      pos_f = modified_substring.indexOf('िं', pos_f + 1);
  }

  // 2. Logic for 'ि' -> 'o'
  pos_f = modified_substring.indexOf("ि");
  while (pos_f !== -1) {
      let char_left = modified_substring.charAt(pos_f - 1);
      modified_substring = modified_substring.replace(char_left + "ि", "o" + char_left);
      
      pos_f = pos_f - 1;
      while (modified_substring.charAt(pos_f - 1) === "्" && pos_f !== 0) {
          let str_replace = modified_substring.charAt(pos_f - 2) + "्";
          modified_substring = modified_substring.replace(str_replace + "o", "o" + str_replace);
          pos_f -= 2;
      }
      pos_f = modified_substring.indexOf("ि", pos_f + 1);
  }

  // 3. Reph 'र्' -> '©'
  const set_of_matras = "ािीुूृेैोौं:ँॅ";
  
  let pos_half_R = modified_substring.indexOf("र्");
  while (pos_half_R > 0) {
      let prob_pos_Z;
      if (modified_substring.charAt(pos_half_R + 3) !== '्') {
          prob_pos_Z = pos_half_R + 2;
      } else {
          prob_pos_Z = pos_half_R + 4;
      }

      let char_right = modified_substring.charAt(prob_pos_Z + 1);
      while(set_of_matras.includes(char_right)) {
          prob_pos_Z++;
          char_right = modified_substring.charAt(prob_pos_Z + 1);
      }

      let str_replace = modified_substring.substring(pos_half_R + 2, prob_pos_Z + 1);
      modified_substring = modified_substring.replace("र्" + str_replace, str_replace + "©");
      pos_half_R = modified_substring.indexOf("र्");
  }

  modified_substring = modified_substring.trim();

  // 4. Basic Reverse Substitution
  for (let i = array_unicode.length - 1; i >= 0; i--) {
      if (array_unicode[i] && array_shreelipi[i]) {
         modified_substring = modified_substring.split(array_unicode[i]).join(array_shreelipi[i]);
      }
  }

  return modified_substring;
}
