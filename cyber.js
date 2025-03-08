//***SHOW HIDDEN FIELD***
		document.getElementById("cipher").addEventListener("click", show);

		function show(){
			var d = document.getElementById("cipher").value;                	
			if(d == "Affine"){
				document.getElementById("aff").style.display = "block";
			}
			else{
				document.getElementById("aff").style.display = "none";
			}
		}

		//***KEY LENGTH***
		document.getElementById("cipher").addEventListener("click", change);

		function change(){
			var d = document.getElementById("cipher").value;                	
			if(d == "Vigenere"){
				document.getElementById("key").setAttribute("maxlength",200);
			}
			else{
				document.getElementById("key").setAttribute("maxlength",1);
			}
		}


        //***DECLARATION***
        var cipher;
        var operation;
        var key;
        var text;
        var result="";



        function output(){
        	additive();
        	multiplicative();
        	affine();
        	autokey();
        	vigenere();
        	railfence();
        }



        function additive(){

        	key = document.getElementById('key').value;
        	text = document.getElementById('text').value;
        	cipher = document.getElementById('cipher').value;
        	operation = document.getElementById('operation').value;

			//***ADDITIVE ENCRYPTION***
			if(cipher == "Additive" && operation == "Encryption"){

				for(let i=0; i<text.length; i++){

					let char = text[i];

					let final = String.fromCharCode((char.charCodeAt(0) + (key.charCodeAt(0) - 97) - 97) % 26 + 97);
					result += final;
				}
				document.getElementById('out').value = result;
			} 

			//***ADDITIVE DECRYPTION***
			if(cipher == "Additive" && operation == "Decryption"){

				for(let i=0; i<text.length; i++){

					let char = text[i];

					let final = String.fromCharCode((char.charCodeAt(0) - (key.charCodeAt(0) - 97) - 97 + 26) % 26 + 97);
					result += final;
				}
				document.getElementById('out').value = result;
			}
		}



		function multiplicative(){

			key = document.getElementById('key').value;
			text = document.getElementById('text').value;
			cipher = document.getElementById('cipher').value;
			operation = document.getElementById('operation').value;

			//***MULTIPLICATIVE ENCRYPTION***
			if(cipher == "Multiplicative" && operation == "Encryption"){

				let arr = [1,3,5,7,9,11,15,17,19,21,23,25];
				let mod = (key.charCodeAt(0) - 97);
				let k = arr.includes(mod);
				if(k==false){
					document.getElementById('out').value = "key1 =" + " " + key + "(" + mod + ")" + " " + "is not co-prime with 26!!!\nPlease enter another Key!!!";
				}

				if(k==true){

					for(let i=0; i<text.length; i++){

						let char = text[i];

						let final = String.fromCharCode((char.charCodeAt(0) - 97) * (key.charCodeAt(0) - 97) % 26 + 97);
						result += final;
					}
					document.getElementById('out').value = result;
				}
			}

			//***MULTIPLICATIVE MOD INVERSE***
			if(cipher == "Multiplicative" && operation == "Decryption"){

				let arr = [1,3,5,7,9,11,15,17,19,21,23,25];
				let mod = (key.charCodeAt(0) - 97);
				let k = arr.includes(mod);
				if(k==false){
					document.getElementById('out').value = "key1 =" + " " + key + "(" + mod + ")" + " " + "is not co-prime with 26!!!\nPlease enter another Key!!!";
				}

				if(k==true){

					let q;
					let r1=26;
					let r2=(key.charCodeAt(0) - 97);
					let r=0;
					let c=0;

					let t1=0;
					let t2=1;
					let t=1;

					while(r2!=0)
					{
						q=Math.floor(r1/r2);
						r=r1%r2;
						t=t1-t2*q;
						t1=t2;
						t2=t;
						r1=r2;
						r2=r;
					}

					if(t1<0)
					{
						t1=t1+t2;
					}

				//***MULTIPLICATIVE DECRYPTION***	
				for(let i=0; i<text.length; i++){

					let char = text[i];

					let final = String.fromCharCode(((char.charCodeAt(0) - 97 + 26) * t1) % 26 + 97);
					result += final;
				}
				document.getElementById('out').value = result;
			}
		}
	}



	function affine(){

		key = document.getElementById('key').value;
		text = document.getElementById('text').value;
		cipher = document.getElementById('cipher').value;
		operation = document.getElementById('operation').value;

			//***AFFINE ENCRYPTION***
			if(cipher == "Affine" && operation == "Encryption"){

				var	key0 = document.getElementById('key1').value;
				var key1 = (key0.charCodeAt(0) - 97);


				let arr = [1,3,5,7,9,11,15,17,19,21,23,25];
				let mod = (key.charCodeAt(0) - 97);
				let k = arr.includes(mod);
				if(k==false){
					document.getElementById('out').value = "key1 =" + " " + key + "(" + mod + ")" + " " + "is not co-prime with 26!!!\nPlease enter another Key!!!";
				}

				if(k==true){

					for(let i=0; i<text.length; i++){

						let char = text[i];

						let final = String.fromCharCode(((char.charCodeAt(0) - 97) * (key.charCodeAt(0) - 97) + key1) % 26 + 97);
						result += final;
					}
					document.getElementById('out').value = result;
				}
			}


			//***AFFINE MOD INVERSE***
			if(cipher == "Affine" && operation == "Decryption"){

				var	key0 = document.getElementById('key1').value;
				var key1 = (key0.charCodeAt(0) - 97);

				let arr = [1,3,5,7,9,11,15,17,19,21,23,25];
				let mod = (key.charCodeAt(0) - 97);
				let k = arr.includes(mod);
				if(k==false){
					document.getElementById('out').value = "key1 =" + " " + key + "(" + mod + ")" + " " + "is not co-prime with 26!!!\nPlease enter another Key!!!";
				}

				if(k==true){

					let q;
					let r1=26;
					let r2=(key.charCodeAt(0) - 97);
					let r=0;
					let c=0;

					let t1=0;
					let t2=1;
					let t=1;

					while(r2!=0)
					{
						q=Math.floor(r1/r2);
						r=r1%r2;
						t=t1-t2*q;
						t1=t2;
						t2=t;
						r1=r2;
						r2=r;
					}

					if(t1<0)
					{
						t1=t1+t2;
					}

				//***AFFINE DECRYPTION***	
				for(let i=0; i<text.length; i++){

					let char = text[i];

					let final = String.fromCharCode(((char.charCodeAt(0) - 97 - key1 + 26) * t1) % 26 + 97);
					result += final;
				}
				document.getElementById('out').value = result;
			} 
		}
	}



	function autokey(){

		key = document.getElementById('key').value;
		text = document.getElementById('text').value;
		cipher = document.getElementById('cipher').value;
		operation = document.getElementById('operation').value;

			//***AUTOKEY ENCRYPTION***
			if(cipher == "Autokey" && operation == "Encryption"){

				var k = (key.charCodeAt(0)-97);
				var first = text.slice(1);
				var len = text.length;
				var last = text.slice(0, len-1);
				var temp = text.slice(0,1);

				result = String.fromCharCode((temp.charCodeAt(0) - 97 + k) % 26 + 97);

				for(let i=0; i<first.length; i++){
					var char1=first[i];
					var char2=last[i];
					let final = String.fromCharCode(((char1.charCodeAt(0)-97)+(char2.charCodeAt(0)-97))%26+97);
					result += final;
				}
				document.getElementById('out').value = result;
			}


			//***AUTOKEY DECRYPTION***
			if(cipher == "Autokey" && operation == "Decryption"){

				var k = (key.charCodeAt(0)-97);
				var last = text.slice(1);
				var first = text.slice(0, 1);

				var result = String.fromCharCode(((first.charCodeAt(0)-97-k+26)%26+97));

				var out;
				var  msg0 = "";

				msg0 = result;

				for(let i=0; i<last.length; i++)
				{
					var char = last[i];

					out = result;
					out = String.fromCharCode((char.charCodeAt(0) - (out.charCodeAt(0) - 97) - 97 + 26) % 26 + 97);
					result = out;
					msg0 += result; 
				}
				document.getElementById('out').value = msg0;					
			}				
		}



		function vigenere(){

			key = document.getElementById('key').value;
			text = document.getElementById('text').value;
			cipher = document.getElementById('cipher').value;
			operation = document.getElementById('operation').value;

		//***VIGENERE ENCRYPTION***
		if(cipher == "Vigenere" && operation == "Encryption"){

			var j;
			var temp = "";
			var len = key.length;

			for(let i=0, j=0; i<text.length; i++, j++){
				if(i == len){
					j = 0;
				}
				temp += key;
			}

			var mainkey = temp.slice(0, text.length);

			for(let i=0; i<text.length; i++){
				
				let char = text[i];
				var char0 = mainkey[i];
				
				let final = String.fromCharCode(((char.charCodeAt(0)-97)+(char0.charCodeAt(0)-97))%26+97);
				result += final;
			}
			document.getElementById('out').value = result;
		}


		//***VIGENERE DECRYPTION***
		if(cipher == "Vigenere" && operation == "Decryption"){

			var j;
			var temp = "";
			var len = key.length;

			for(let i=0, j=0; i<text.length; i++, j++){
				if(i == len){
					j = 0;
				}
				temp += key;
			}

			var mainkey = temp.slice(0, text.length);

			for(i=0; i<text.length; i++){
				
				char = text[i];
				var char0 = mainkey[i];
				
				final = String.fromCharCode((char.charCodeAt(0) - (char0.charCodeAt(0) - 97) - 97 + 26) % 26 + 97);
				result += final;
			}
			document.getElementById('out').value = result;
		}
	}


	function railfence(){

		key = document.getElementById('key').value;
		text = document.getElementById('text').value;
		cipher = document.getElementById('cipher').value;
		operation = document.getElementById('operation').value;

			//***RAILFENCE ENCRYPTION***
			if(cipher == "RailFence" && operation == "Encryption"){

				var k = (key.charCodeAt(0)-97);

				let rail = new Array(k).fill().map(() => new Array(text.length).fill('.'));

				let direction = false;
				let row = 0, col = 0;

				for(let i = 0; i < text.length; i++) {

					if (row == 0 || row == k - 1){
						direction = !direction;
					}

					rail[row][col++] = text[i];

					if(direction){
						row = row+1;
					}
					else{
						row = row-1;
					}
				}

				let result = '';
				for(let i = 0; i < k; i++){
					for(let j = 0; j < text.length; j++){
						if (rail[i][j] != '.'){
							result += rail[i][j];
						}
					}
				}
				document.getElementById('out').value = result;
			}


			//***RAILFENCE DECRYPTION***
			if(cipher == "RailFence" && operation == "Decryption"){

				var k = (key.charCodeAt(0)-97);

				let rail = new Array(k).fill().map(() => new Array(text.length).fill('\n'));

				let direction = false;
				let row = 0, col = 0;

				for (let i = 0; i < text.length; i++){

					if (row == 0){
						direction = true;
					}
					if (row == k - 1){
						direction = false;
					}

					rail[row][col++] = '*';

					if(direction){
						row = row+1;
					}
					else{
						row = row-1;
					}
				}

				let index = 0;
  				for (let i = 0; i < k; i++){
    				for (let j = 0; j < text.length; j++){
      					if(rail[i][j] == '*' && index < text.length){
      						rail[i][j] = text[index++];
      					}
    				}
  				}

  				let result = '';
  				row = 0, col = 0;
  				for (let i = 0; i < text.length; i++){
    				if(row == 0){
    					direction = true;
    				}
    				if(row == k - 1){
    					direction = false;
 					}

    				if(rail[row][col] != '*'){
    					result += rail[row][col++];
 					}

					if(direction){
						row = row+1;
					}
					else{
						row = row-1;
					}
  				}
  				document.getElementById('out').value = result;
			}
	
		}
