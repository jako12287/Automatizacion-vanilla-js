const btnAdd = document.querySelector("#add");
const list = document.querySelector("#list")

const putIdForLi = () => {
  const list = document.querySelectorAll("#list li");
  list.forEach((li, idx) => {
    li.lastChild.setAttribute("id", idx)
    li.setAttribute("id", idx);
  });

  return list
};

list.addEventListener("click", (el)=>{
    el.preventDefault()

    const target = el.target

    if(target.matches(".remove")){
        const currentList = putIdForLi()
		console.log("TCL: currentList", currentList)
currentList.forEach((el)=>{
    
})
        console.log("target", target.id)

    }

    // console.log("elemento desde el addeventlistener de list",el.target)

})

putIdForLi();
