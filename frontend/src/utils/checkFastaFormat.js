// check if the input is in the .fasta format
function checkFastaFormat(input) {
  var regex = /^>/;
  return regex.test(input);
}
