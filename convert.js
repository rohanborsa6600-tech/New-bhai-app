import { shreelipi_list, unicode_list } from "./mapping.js";

// Adapted from: https://github.com/sanskrit-coders/tech_hindi_font_converters

export function convert_to_unicode(modified_substring) {
  var shreelipi_length = shreelipi_list.length;

  //****************************************************************************************
  //  Break the long text into small bunches of max. max_text_size  characters each.
  //****************************************************************************************
  var text_size = document.getElementById("legacy_text").value.length;

  var processed_text = ""; //blank

  var sthiti1 = 0;
  var sthiti2 = 0;
  var chale_chalo = 1;

  var max_text_size = 6000;

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

    return processed_text;
  }

  //--------------------------------------------------

  function Replace_Symbols() {
    //substitute unicode elements in place of corresponding shreelipi elements

    if (modified_substring != "") {
      // if string to be converted is non-blank then no need of any processing.
      for (
        let input_symbol_idx = 0;
        input_symbol_idx < shreelipi_length;
        input_symbol_idx++
      ) {
        let indx = 0; // index of the symbol being searched for replacement

        while (indx != -1) {
          //whie-00
          modified_substring = modified_substring.replace(
            shreelipi_list[input_symbol_idx],
            unicode_list[input_symbol_idx]
          );
          indx = modified_substring.indexOf(shreelipi_list[input_symbol_idx]);
        } // end of while-00 loop
      } // end of for loop

      //**********************************************************************************
      // Code for Replacing  Special glyphs
      //**********************************************************************************

      //  chhotii 'i' kii maatraa  and its position  correction

      var position_of_i = modified_substring.indexOf("{");

      while (position_of_i != -1) {
        //while-02
        var charecter_next_to_i = modified_substring.charAt(position_of_i + 1);
        var charecter_to_be_replaced = "{" + charecter_next_to_i;
        modified_substring = modified_substring.replace(
          charecter_to_be_replaced,
          charecter_next_to_i + "ि"
        );
        position_of_i = modified_substring.search(/{/, position_of_i + 1); // search for  '{' ahead of the current position.
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
      let set_of_matras = "ािीुूृेैोौंःँॅ";
      var position_of_reph = modified_substring.indexOf("©");

      while (position_of_reph > 0) {
        // while-04
        let probable_position_of_half_r = position_of_reph - 1;
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
        let new_replacement_string = "र्" + charecter_to_be_replaced;
        charecter_to_be_replaced = charecter_to_be_replaced + "©";
        modified_substring = modified_substring.replace(
          charecter_to_be_replaced,
          new_replacement_string
        );
        position_of_reph = modified_substring.indexOf("©");
      } // end of while-04
    } //end of IF  statement  meant to  supress processing of  blank  string.
  } // end of the function  Replace_Symbols
}
