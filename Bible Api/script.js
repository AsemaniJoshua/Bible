async function getVerse(){
    
    const book = document.getElementById("book").value.toLowerCase();
    const chapter = document.getElementById("chapter").value;
    const verse = document.getElementById("verse").value;
    const translation = document.getElementById("translation").value;

    const br = document.createElement("br").innerHTML = "\n";
    

    const result = document.getElementById("result");

    if(!book &&!chapter){
        result.textContent = "Please enter at least a book and a chapter";
        return;
    }

    if(translation){
        translation = translation.toLowerCase();
        translation = "en-"+translation;
    }

    try{

        let apiUrl = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${book}/chapters/${chapter}`;

        // if(translation){
        //   apiUrl += `${translation}`;
        // }

        // if(book){
        //     console.log(book);
        //     apiUrl += `/books/${book}`;
        // }

        // if(chapter){
        //     apiUrl += `/chapters/${chapter}`;
        // }

        if(verse){
            apiUrl += `/verses/${verse}`;
        }

        apiUrl += `.json`;

        

        console.log(apiUrl);
        const response = await fetch(apiUrl);
        console.log(response);
        const data = await response.json();
        console.log(data);

        if(data.error){
            console.log(data.error);
            result.textContent = "The request quotation was not found";
            return;
        }

        //Handle single verse or multiple verses 
        // if ( data.every(item => typeof item === 'object' && item !== null) && Array.isArray(data) ) {
        //     // Multiple verses case 
        //     let versesText = ""; 
        //     data.forEach(verse => { 
        //         versesText += `${verse.verse}: ${verse.text}\n`; 
        //     }); 
        //     result.textContent = versesText;
        // }

        if (Array.isArray(data.data)) {
            // Multiple verses case 
            let versesText = ""; 
            data.data.forEach(verse => { versesText += `${verse.verse}: \n ${verse.text}\n`; });
            result.textContent = versesText; 
        }
            
        else { 
            // Single verse case 
            result.textContent = data.text || "The requested quotation was not found"; 
        }
        
        // else { 
        //     // Single verse case 
        //     result.textContent = data.verse + ":" + "\n"+ data.text;
        // }


        // result.textContent = data.text;
    }

    
    catch(error){
        console.log(error);
        result.textContent = `An error occurred while fetching the verse. ${br} ${br} This can also be that the request quotation was not found`;
    }
    
}
