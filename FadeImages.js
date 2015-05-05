/*Taken from http://www.whitewatercottageleavenworth.com with permissions from original authors Scott and David Parkman*/

var opacity;
var fadingImageIndex;
var currentCycle;
var FadeIntervalId;
var FadeOutIntervalId;
var opacityIncriment;
var obj;

function fade( objArray, dwellTime, fadeTime, fadeInterval, cycles )
{
  if ( document.getElementById == null )
	return;
  var i=0;
  for ( i=0; i<objArray.length; i++ ) {
    obj = document.getElementById( objArray[i] );
    var N = objArray.length * 3;
    var Z = 3 * i;
    opacity = 100;
    setOpacity( obj, opacity );
    obj.style.zIndex = N-Z;
  }
  fadingImageIndex = 0;
  currentCycle = 0;

  var netTime = dwellTime + fadeTime;
  FadeIntervalId = setInterval(function() {schedFade(objArray, fadeTime, fadeInterval); } , netTime);
}


function schedFade( objArray, fadeTime, fadeInterval )
{
  if ( fadingImageIndex < objArray.length-1 ) {
    //alert( fadingImageIndex );
    opacityIncriment = -fadeTime/fadeInterval;
    var nextObjIndex = fadingImageIndex + 1;
    obj = document.getElementById( objArray[ nextObjIndex ] );
    opacity = 100;
    setOpacity ( obj, opacity );

    obj = document.getElementById( objArray[ fadingImageIndex ] );
    setOpacity ( obj, opacity );

    FadeOutIntervalId = setInterval(function() {doFade( obj, opacityIncriment ); },fadeTime );
    fadingImageIndex++;

  }
  else {
    //obj = document.getElementById( objArray[ fadingImageIndex ] );
    //opacity = 100;
    //setOpacity ( obj, opacity );
    opacityIncriment = fadeTime/fadeInterval;
    fadingImageIndex = 0;
    //alert( fadingImageIndex );
    opacity = 0;
    obj = document.getElementById( objArray[ fadingImageIndex ] );

    FadeOutIntervalId = setInterval(function() {doFade( obj, opacityIncriment ); },fadeTime );
  }
  //alert( fadingImageIndex );
  currentCycle++;
  if ( currentCycle == cycles && cycles > 0 )
    {clearInterval ( FadeIntervalId );}
}

function setOpacity(obj, opacity) 
{
  opacity = (opacity == 100)?99.999:opacity;
  
  // IE/Win
  obj.style.filter = "alpha(opacity:"+opacity+")";
  
  // Safari<1.2, Konqueror
  obj.style.KHTMLOpacity = opacity/100;
  
  // Older Mozilla and Firefox
  obj.style.MozOpacity = opacity/100;
  
  // Safari 1.2, newer Firefox and Mozilla, CSS3
  obj.style.opacity = opacity/100;
}

function doFade( obj,incriment ) 
{
    //alert("incriment = " + incriment + "; Opacity = " + opacity);
    if ( incriment > 0 ) { 
          if ( opacity <= 100-incriment ) {
            opacity = opacity + incriment;
            setOpacity( obj, opacity );
            }
           else {
             setOpacity( obj, 100 );
             clearInterval ( FadeOutIntervalId );
           }
        }
    else if (incriment < 0){
        //alert( incriment);
        if ( opacity >= -incriment ) {
            opacity = opacity + incriment;
            setOpacity( obj, opacity );
            }
           else {
             setOpacity( obj, 0 );
             clearInterval ( FadeOutIntervalId );
           }
        }
    else
        //alert( "clear FadeOutIntervalId ");
        clearInterval ( FadeOutIntervalId );
}
