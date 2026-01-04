// JavaScript source code
const button = document.createElement('button');
button.textContent = "下一周";
const t = document.getElementById('tab');
const main = document.getElementById('main');
const space = document.createElement('a');
const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const chinese_numerals = "一二三四五六七";
var q = document.querySelectorAll('td[id="q"]');
var tables = [[]];
var val;
function refresh() {
    // 1. Properly initialize all variables to 0
    let ly = 0, deng = 0, yu = 0;

    // 2. Loop through every table in your global 'tables' array
    tables.forEach((table) => {
        // 3. Loop through the 7 days (the x index)
        for (let x = 0; x < 7; x++) {
            // Get the value from the input inside each cell
            // table[x] is the day, [0], [1], [2] are the rows
            ly += Number(table[x][0].querySelector('input').value) || 0;
            deng += Number(table[x][1].querySelector('input').value) || 0;
            yu += Number(table[x][2].querySelector('input').value) || 0;
        }
    });

    // 4. Update the display elements (q[0], q[1], q[2])
    if (q[0]) q[0].innerText = 60 - ly;
    if (q[1]) q[1].innerText = 60 - deng;
    if (q[2]) q[2].innerText = 60 - yu;
}   
for (let i = 0; i < 7; i++) {
    tables[0].push(t.querySelectorAll(`td[headers="${weekdays[i]}"]`));
}
tables[0].forEach((weekday) => {
    weekday.forEach((cell) => {
        cell.addEventListener("input", () => {
            val = 0;
            for (let j = 0; j < 3; j++) {
                val += Number((weekday[j].querySelector("input").value));
            }
            weekday[3].innerText = 7.5 - val;
            refresh();
        });
    });
});

space.innerHTML = "<br>";
//var ns = 8;
//var textNode = document.createTextNode(ns);

//main.append(textNode);

//function change(num) {
//    textNode.remove();
//    ns = num;
//    textNode = document.createTextNode(ns);
//    main.append(textNode);
//}


main.append(button);

function createNewTable() {
    let s = space.cloneNode(true);
    let dup = t.cloneNode(true);    
    tables.push([]);
    var header = dup.querySelector("caption");
    header.innerText = `第${chinese_numerals[tables.length-1]}周`;
    for (let k = 0; k < 7; k++) {
        tables[tables.length-1].push(dup.querySelectorAll(`td[headers="${weekdays[k]}"]`));
    }
    tables[tables.length - 1].forEach((weekday) => {
        weekday.forEach((cell) => {
            cell.addEventListener("input", () => {
                val = 0;
                for (let j = 0; j < 3; j++) {
                    val += Number((weekday[j].querySelector("input").value));
                }
                weekday[3].innerText = 7.5 - val;
                refresh();
            });
        });
    });
    main.append(s,dup);
}
button.addEventListener('click', () => {
    button.remove();
    createNewTable();
    main.append(button);
})