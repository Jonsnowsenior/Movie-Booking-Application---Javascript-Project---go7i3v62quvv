const movieID = localStorage.getItem("title");
const runtime = localStorage.getItem("runtime");
const heading = document.getElementById('movie-name')
const price = document.getElementById('price')
const subtotal = document.getElementById('subtotal')
const convenienceFee = document.getElementById('convenienceFee'); 

subtotal.textContent = (runtime *2 * 1 * 1.03).toFixed(2);
convenienceFee.textContent = (runtime *2 * 1 * 0.03).toFixed(2); 
heading.textContent =  ` ${movieID}` ; 
price.textContent= `Cost of a Ticket: ${runtime * 2}`

const ticketQuantityHandler = (e) => {
   const  ticketQuantity =e.target.value;
subtotal.textContent = (runtime *2 * ticketQuantity * 1.03).toFixed(2);
convenienceFee.textContent = (runtime *2 * ticketQuantity * 0.03).toFixed(2);
}


  

 



