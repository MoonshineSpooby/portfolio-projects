/*
Date: 05/15/24 Author: Thomas Alden
Summary: Basics of JavaScript
*/
const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");


const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};
const index = ""
const dndURL = "https://www.dnd5eapi.co/api"
fetch(dndURL, requestOptions)
  .then((response) => response.text())
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

  function toCsvText(array) {
    let csv = "" 
    for(let i = 0; i < array.length; i++){
       csv += `${array[i]}`
       let x = (i + 1) % 5
       console.log('x::  ' + x)
       if(x == 0) {csv += '\\n'}
       else csv += ','
    }
    return csv
  }
  const value = toCsvText(new Array([
    [ 0, 1, 2, 3, 45 ],
    [ 10,11,12,13,14 ],
    [ 20,21,22,23,24 ],
    [ 30,31,32,33,34 ]
   ] ))
   console.log(value)
   class Node(){
    
   }