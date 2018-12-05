
var cardCount = 4;

(function() {
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

function createElementAddContent(element,content) {
    var node = document.createElement(element);                    
    var textnode = document.createTextNode(content);         
    return node.appendChild(textnode);
}

function insertHtmlContent(data) {    
    var templateContent = document.querySelector('#content');
    var target = document.querySelector("#target");
    var clone = document.importNode(templateContent.content, true);

    lawFirmName = clone.querySelectorAll('card-title');
    var cardTitle = '<span>'+data.items[0].lawFirmName+'</span> <span>∖</span><span data-task-plaintiff-count="10">'+data.items[0].plaintiffCount+'</span> <a href="javascript:void(0);" data-details=""><svg viewBox="0 0 24 24"><use xlink:href="#expandIcon"></use>Icon</svg>';
    // lawFirmName[0].setAttribute('data-task-title',data.items[0].lawFirmName);   
    lawFirmName[0].children[2].setAttribute('data-task-plaintiff-count',data.items[0].plaintiffCount);
    lawFirmName[0].textContent = '';
    lawFirmName[0].insertAdjacentHTML('afterbegin',cardTitle);

    message = clone.querySelectorAll('card-short-message');
    message[0].setAttribute('data-task-description',data.items[0].description);
    message[0].textContent = data.items[0].description;

    receivedDate = clone.querySelectorAll('rec-date'); 
    var rDate = 'Received date: <span data-task-received-data="'+ data.items[0].receivedDate  +'" >'+ data.items[0].receivedDate  +' </span>';    
    receivedDate[0].textContent = '';
    receivedDate[0].insertAdjacentHTML('afterbegin',rDate);

    expectedDate = clone.querySelectorAll('ed-date'); 
    var eDate = 'Expected date: <span data-task-expected-data="'+ data.items[0].expectedDate  +'" >'+ data.items[0].expectedDate  +' </span>';    
    expectedDate[0].textContent = '';
    receivedDate[0].insertAdjacentHTML('afterbegin',eDate);
    
    target.appendChild(clone);
} 

loadJSON(function(data) {   
    data = JSON.parse(data); 
    for (let index = 1; index <= cardCount; index++) { 
        insertHtmlContent(data);
    }
});


 


 
