var input = document.createElement("input");
input.setAttribute("type", "text");
input.style.width = "30%";
input.style.marginTop = "50px";
input.id = "countryname";

var button=document.createElement("button");
button.setAttribute("type","button");
button.innerHTML="click me";
button.style.margin="5px";
button.addEventListener("click",getdata);

var resultDiv = document.createElement("div"); // Create a new div to hold the result
resultDiv.id = "result"; // Set an ID for the div 

var div = document.createElement("div");
div.style.display = "flex"; // Set the display property to flex
div.style.flexDirection = "column"; // Align child elements vertically
div.style.justifyContent = "center"; // Center child elements horizontally
div.style.alignItems = "center"; // Center child elements vertically

div.append(input,button, resultDiv); // Adding the result div to the container

document.body.append(div);

async function getdata() {
  let res = document.getElementById("countryname").value;
  console.log(res);
  try {
    let res1 = await fetch(`https://api.covid19api.com/total/dayone/country/${res}`);
    let res2 = await res1.json();
    console.log(res2);
    let index = res2.length - 1;
    if ("Active" in res2[index]) {
      console.log(`active: ${res2[index].Active}`);
      console.log(`deaths: ${res2[index].Deaths}`);
      console.log(`recovered: ${res2[index].Recovered}`);
resultDiv.innerHTML = `active: ${res2[index].Active} &nbsp;&nbsp;&nbsp;  deaths: ${res2[index].Deaths} &nbsp;&nbsp;&nbsp;  recovered: ${res2[index].Recovered}`;

    } else {
      console.log("Active cases not found");
      resultDiv.innerHTML = "Active cases not found"; // Updating the result div with an error message
    }
  } catch (error) {
    console.log(error);
    resultDiv.innerHTML = "Error fetching data"; // Updating the result div with an error message
  }
}

