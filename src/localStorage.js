
export function setLocalStorage (key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage (key){
    return localStorage.getItem(key) !== null ? 
                   JSON.parse(localStorage.getItem(key)) : [];
}


