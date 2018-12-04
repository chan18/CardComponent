(function(){
    console.log('js-loaded');
})();

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './data.json', true); 
        xobj.onreadystatechange = function () {
                                    if (xobj.readyState == 4 && xobj.status == "200") {                                        
                                        callback(xobj.responseText);
                                    }
                                  };
        xobj.send(null);  
}

function insertHtmlContent(data) {    
    var templateContent = document.querySelector('#content');
    var target = document.querySelector("#target");
    var clone = document.importNode(templateContent.content, true);

    // console.log(data['items'][0].description);  
    lawFirmName = clone.querySelectorAll('[data-task-title=""]');
    lawFirmName[0].setAttribute('data-task-title',data.items[0].lawFirmName);
    lawFirmName[0].textContent = data.items[0].lawFirmName;

    plaintiffCount = clone.querySelectorAll('[data-task-plaintiff-count=""]');
    plaintiffCount[0].setAttribute('data-task-plaintiff-count',data.items[0].plaintiffCount);    
    plaintiffCount[0].textContent = data.items[0].plaintiffCount;

    description = clone.querySelectorAll('[data-task-description=""]'); 
    description[0].setAttribute('data-task-plaintiff-count',data.items[0].plaintiffCount);
    description[0].textContent = data.items[0].description;

    receivedDate = clone.querySelectorAll('[data-task-received-data=""]'); 
    receivedDate[0].setAttribute('data-task-received-data',data.items[0].receivedDate);
    receivedDate[0].textContent = data.items[0].receivedDate;

    expectedDate = clone.querySelectorAll('[data-task-expected-data=""]'); 
    expectedDate[0].setAttribute('data-task-expected-data',data.items[0].expectedDate);
    expectedDate[0].textContent = data.items[0].expectedDate;
    
    target.appendChild(clone);
} 

loadJSON(function(data) {   
    data = JSON.parse(data); 
    for (let index = 1; index <= 4; index++) { 
        insertHtmlContent(data);
    }
});


 


 
