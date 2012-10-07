<?php
$fp = fopen("rgb.txt", "r");
$ln = 0;
$line = array();

$mode = $_GET['mode'];

$css = 'div {border:solid 1px #ccc;width:100px;height:50px;margin:20px;display:inline-block;text-align:center;line-height:50px}'."\n";
$html = '';

function convertAndPad($dec) {
  return str_pad(dechex($dec), 2, '0');
}

while (($buffer = fgets($fp, 4096)) !== false) {
  if ($ln > 0) {
    $str = preg_replace('/\s\s+/', ' ', $buffer);
    $line = explode(" ", trim($str));

    if ($mode == 'hex') {
      $red = convertAndPad($line[0]);
      $green = convertAndPad($line[1]);
      $blue = convertAndPad($line[2]);
      $value = '#'.$red.$green.$blue;
    } elseif ($mode == 'dec') {
      $value = 'rgb('.$line[0].','.$line[1].','.$line[2].')';
    } else {
      $value = $line[3];
    }

    $css.= '.'.$line[3].' { background:'.$value.' }'."\n";
    $html.= '<div class="'.$line[3].'">'.$line[3].'</div>';
  }
  $ln++;
}
if (!feof($fp)) {
  echo "Error: unexpected fgets() fail\n";
}

fclose($fp);

$cfp = fopen("colors.css", "w");
fwrite($cfp, $css);
fclose($cfp);
?>
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <style type="text/css">
    <?php echo $css ?>
    </style>
  </head>
  <body>
    <?php
    echo $html;
    ?>
  </body>
</html>