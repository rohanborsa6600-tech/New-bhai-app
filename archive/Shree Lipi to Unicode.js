function convert_to_unicode() {
  var array_one = new Array(
    "~",
    "u",
    "ª",
    "}",
    "n",
    "p",

    "H",
    "·",
    "I",
    "»",
    "J",
    "½",
    "K",

    "M",
    "À",
    "N",
    "µO",
    "O",
    "µÁ",
    "Á",
    "P",

    "Q",
    "R",
    "¶S",
    "S",
    "¶T",
    "T",
    "U",
    "Ê",

    "W",
    "Ï",
    "V",
    "Ë",
    "Y",
    "Ü",
    "X",
    "Z",
    "Ý",

    "\\",
    "â",
    "[",
    "ß",
    "^",
    "ä",
    "]",
    "ã",
    "_",
    "å",

    "`",
    "a",
    "c",
    "ë",
    "d",
    "ì",

    "e",
    "û",
    "í",
    "f",
    "î",
    "g",
    "ñ",
    "h",
    "j",
    "ú",
    "k",

    "Ô",
    "Û",
    "Ú",
    "à",
    "Þ",
    "Q­",
    "º$",
    "Ì",
    "Ð",
    "Õ",
    "l",
    "Îm",
    "¸",
    "„",
    "ˆ",
    "œ",
    "Å",
    "È",

    "Am¡",
    "Am{",
    "Am|",
    "Am",
    "A",
    "B©",
    "B",
    "C",
    "D",
    "E{",
    "E",
    "F",

    "§m",
    "§w",
    "§p",
    "§y",
    "±m",
    "±w",
    "±p",
    "±y", // for  changing the order  of anuswaar & chandrabindu with other maatraas

    "m°",
    "m{",
    "m|",
    "{",
    "|",
    "m¡",
    "m¢",
    "¡",
    "¢",

    "m",
    "r",
    "s",
    "t",
    "w",
    "þ",
    "y",
    "§",
    "¨",
    "±",
    "•",
    "¥",
    "²",

    "Ñ",
    "«",
    "é",
    "ê",
    "&",
    "$",
    ">",
    "µ",
    "°",
    "¶"
  );

  var array_two = new Array(
    "©",
    "©",
    "©ं",
    "{©",
    "o",
    "o",

    "क",
    "क्",
    "ख",
    "ख्",
    "ग",
    "ग्",
    "घ",

    "च",
    "च्",
    "छ",
    "ज़",
    "ज",
    "ज़्‌",
    "ज्",
    "झ",

    "ट",
    "ठ",
    "ड़",
    "ड",
    "ढ़",
    "ढ",
    "ण",
    "ण्",

    "थ",
    "थ्",
    "त",
    "त्",
    "ध",
    "ध्",
    "द",
    "न",
    "न्",

    "फ",
    "फ्",
    "प",
    "प्",
    "भ",
    "भ्",
    "ब",
    "ब्",
    "म",
    "म्",

    "य",
    "र",
    "ल",
    "ल्",
    "व",
    "व्",

    "श",
    "श्",
    "श्",
    "ष",
    "ष्",
    "स",
    "स्",
    "ह",
    "क्ष",
    "क्ष्",
    "ज्ञ",

    "द्द",
    "द्व",
    "द्य",
    "प्र",
    "न्न",
    "ट्र",
    "क्त",
    "त्र",
    "द्र",
    "द्ध",
    "श्र",
    "त्त",
    "क्क",
    "ल्ल",
    "ह्व",
    "श्व",
    "ट्ट",
    "ड्ड",

    "औ",
    "ओ",
    "ओं",
    "आ",
    "अ",
    "ई",
    "इ",
    "उ",
    "ऊ",
    "ऐ",
    "ए",
    "ऋ",

    "ां",
    "ुं",
    "ुं",
    "ूं",
    "ाँ",
    "ुँ",
    "ुँ",
    "ूँ",

    "ॉ",
    "ो",
    "ों",
    "े",
    "ें",
    "ौ",
    "ौं",
    "ै",
    "ैं",

    "ा",
    "ी",
    "ी",
    "ीं",
    "ु",
    "ु",
    "ू",
    "ं",
    "ं",
    "ँ",
    "ः",
    "ृ",
    "्",

    "दृ",
    "्र",
    "रु",
    "रू",
    "।",
    "",
    "",
    "",
    "",
    ""
  );

  var array_one_length = array_one.length;

  // if ( (document.getElementById("text_or_html")).selectedIndex == 0 )  // if the input is plain text

  // {

  document.getElementById("unicode_text").value =
    "You have chosen SIMPLE TEXT  in ShreeLipi font to convert into Unicode. Conversion in progress..";

  var modified_substring = document.getElementById("legacy_text").value;

  //****************************************************************************************
  //  Break the long text into small bunches of max. max_text_size  characters each.
  //****************************************************************************************
  var text_size = document.getElementById("legacy_text").value.length;

  var processed_text = ""; //blank

  var sthiti1 = 0;
  var sthiti2 = 0;
  var chale_chalo = 1;

  var max_text_size = 10000;

  while (chale_chalo == 1) {
    sthiti1 = sthiti2;

    if (sthiti2 < text_size - max_text_size) {
      sthiti2 += max_text_size;
      while (
        document.getElementById("legacy_text").value.charAt(sthiti2) != " "
      ) {
        sthiti2--;
      }
    } else {
      sthiti2 = text_size;
      chale_chalo = 0;
    }

    modified_substring = document
      .getElementById("legacy_text")
      .value.substring(sthiti1, sthiti2);

    Replace_Symbols();

    var processed_text = processed_text + modified_substring;

    //  Breaking part code over

    document.getElementById("unicode_text").value = processed_text;
  }
  // }

  // else    // if input is HTML then
  // {

  //   Can be copied from other converters and pasted here

  //  } // end of else loop for HTML case

  //--------------------------------------------------

  function Replace_Symbols() {
    //substitute array_two elements in place of corresponding array_one elements

    if (modified_substring != "") {
      // if string to be converted is non-blank then no need of any processing.
      for (
        input_symbol_idx = 0;
        input_symbol_idx < array_one_length;
        input_symbol_idx++
      ) {
        indx = 0; // index of the symbol being searched for replacement

        while (indx != -1) {
          //whie-00
          modified_substring = modified_substring.replace(
            array_one[input_symbol_idx],
            array_two[input_symbol_idx]
          );
          indx = modified_substring.indexOf(array_one[input_symbol_idx]);
        } // end of while-00 loop
      } // end of for loop

      //**********************************************************************************
      // Code for Replacing  Special glyphs
      //**********************************************************************************

      //  chhotii 'i' kii maatraa  and its position  correction

      var position_of_i = modified_substring.indexOf("o");

      while (position_of_i != -1) {
        //while-02
        var charecter_next_to_i = modified_substring.charAt(position_of_i + 1);
        var charecter_to_be_replaced = "o" + charecter_next_to_i;
        modified_substring = modified_substring.replace(
          charecter_to_be_replaced,
          charecter_next_to_i + "ि"
        );
        position_of_i = modified_substring.search(/o/, position_of_i + 1); // search for  'o' ahead of the current position.
      } // end of while-02 loop

      // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

      var position_of_wrong_ee = modified_substring.indexOf("ि्");

      while (position_of_wrong_ee != -1) {
        //while-03

        var consonent_next_to_wrong_ee = modified_substring.charAt(
          position_of_wrong_ee + 2
        );
        var charecter_to_be_replaced = "ि्" + consonent_next_to_wrong_ee;
        modified_substring = modified_substring.replace(
          charecter_to_be_replaced,
          "्" + consonent_next_to_wrong_ee + "ि"
        );
        position_of_wrong_ee = modified_substring.search(
          /ि्/,
          position_of_wrong_ee + 2
        ); // search for 'wrong ee' ahead of the current position.
      } // end of while-03 loop

      //**********************************************************************************
      // Code for Replacing  'q'  which is   chhotii 'i' kii maatraa  with anuswaar
      //**********************************************************************************

      var position_of_i = modified_substring.indexOf("q");

      while (position_of_i != -1) {
        //while-02
        var charecter_next_to_i = modified_substring.charAt(position_of_i + 1);
        var charecter_to_be_replaced = "q" + charecter_next_to_i;
        modified_substring = modified_substring.replace(
          charecter_to_be_replaced,
          charecter_next_to_i + "o"
        );
        position_of_i = modified_substring.search(/q/, position_of_i + 1); // search for  'q' ahead of the current position.
      } // end of while-02 loop

      // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

      var position_of_wrong_ee = modified_substring.indexOf("o्");

      while (position_of_wrong_ee != -1) {
        //while-03

        var consonent_next_to_wrong_ee = modified_substring.charAt(
          position_of_wrong_ee + 2
        );
        var charecter_to_be_replaced = "o्" + consonent_next_to_wrong_ee;
        modified_substring = modified_substring.replace(
          charecter_to_be_replaced,
          "्" + consonent_next_to_wrong_ee + "िं"
        );
        position_of_wrong_ee = modified_substring.search(
          /o्/,
          position_of_wrong_ee + 3
        ); // search for 'wrong ee' ahead of the current position.
      } // end of while-03 loop

      //  those 'o'  which do not come with halanta  should also be replaced now
      modified_substring = modified_substring.replace(/o/g, "िं");

      //**********************************************************************************
      //Eliminating reph "©" and putting 'half - r' at proper position for this.
      //**********************************************************************************
      set_of_matras = "ािीुूृेैोौंःँॅ";
      var position_of_reph = modified_substring.indexOf("©");

      while (position_of_reph > 0) {
        // while-04
        probable_position_of_half_r = position_of_reph - 1;
        var charecter_at_probable_position_of_half_r =
          modified_substring.charAt(probable_position_of_half_r);

        // trying to find non-maatra position left to current O (ie, half -r).

        while (
          set_of_matras.match(charecter_at_probable_position_of_half_r) != null
        ) {
          // while-05
          probable_position_of_half_r = probable_position_of_half_r - 1;
          charecter_at_probable_position_of_half_r = modified_substring.charAt(
            probable_position_of_half_r
          );
        } // end of while-05

        charecter_to_be_replaced = modified_substring.substr(
          probable_position_of_half_r,
          position_of_reph - probable_position_of_half_r
        );
        new_replacement_string = "र्" + charecter_to_be_replaced;
        charecter_to_be_replaced = charecter_to_be_replaced + "©";
        modified_substring = modified_substring.replace(
          charecter_to_be_replaced,
          new_replacement_string
        );
        position_of_reph = modified_substring.indexOf("©");
      } // end of while-04
    } //end of IF  statement  meant to  supress processing of  blank  string.
  } // end of the function  Replace_Symbols
} // end of legacy_to_unicode function
