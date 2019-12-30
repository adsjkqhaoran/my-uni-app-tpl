// 判断颜色深浅函数e
export const getContrastYIQ = function (hexcolor){
	if(hexcolor.indexOf('#')>=0) {
		hexcolor = hexcolor.replace('#','')
		
		var r = parseInt(hexcolor.substr(0,2),16);
		var g = parseInt(hexcolor.substr(2,2),16);
		var b = parseInt(hexcolor.substr(4,2),16);
		var yiq = ((r*299)+(g*587)+(b*114))/1000;
		return (yiq >= 128) ? 'black' : 'white';
	} else {
		return ''
	}
   
}