console.log("Hi MOM");

let count = 0;
const arr = ["2016.json", "2017.json", "2018.json", "2019.json", "2020.json", "2021.json"];

const data = [];

async function fun(file) {
    try {
        const res = await fetch(`${file}`)
        const content = await res.json();
        data.push(content);
        count++;
        if (count == 4) {
            func();
        }
        // console.log(data[0].data[0][3])
    }
    catch (err) {
        console.error(err);
    }
}

arr.map((file, index) => {
    fun(file);
})

console.log(data);



function func() {

    const category = document.querySelector('#category');

    const option = document.createElement('option');
    option.value = 0;
    option.textContent = "Select a category";
    category.appendChild(option);
    for (let i = 0; i < data[0].data.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = data[0].data[i][2];
        category.appendChild(option);
    }


}

document.querySelector('.butt').addEventListener('click', () => {
    console.log(category.value);

    const xArray = [2016, 2017, 2018, 2019, 2020, 2021];
    const yArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (i < 3)
            yArray.push(data[i].data[category.value][3]);
        else
            yArray.push(data[i].data[category.value][2]);
    }
    // temp.textContent = data[0].data[0][3];
    // console.log(data[0].data);


    // Define Data
    const data1 = [{
        x: xArray,
        y: yArray,
        mode: "marks",
        type: "scatter"
    }];

    // Define Layout
    const layout = {
        xaxis: { range: [2015, 2022], title: "Years" },
        yaxis: { range: [Math.min(...yArray), Math.max(...yArray)], title: `${data[0].data[category.value][2]}` },
        // yaxis: { range: [0, 50], title: "Price in Millions" },
        title: "Crime Data "
    };

    // Display using Plotly
    Plotly.newPlot("myPlot", data1, layout);
});