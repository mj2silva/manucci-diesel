import peruJson from "/peru.json" assert { type: "json" };

function constructDepartments(mapSize) {
  const projection = d3.geoEquirectangular().fitSize(mapSize, peruJson);
  const geoPathGenerator = d3.geoPath().projection(projection);

  const svgDepartments = peruJson.features.map((feature) => {
    const svgProps = {
      d: geoPathGenerator(feature) || "",
      stroke: "#fff",
      fill: "#606060",
    };
    const name = feature.properties.NOMBDEP.toLowerCase();
    return {
        name,
        svgProps,
    };
}, []);

return svgDepartments;
}

const createMap = () => {
    // console.log({svgCanvas})
    // peruElement.appendChild(svgCanvas);
    // svgCanvas.setAttribute("width", "600");
    // svgCanvas.setAttribute("height", "600");
    const departments = ["la libertad", "ancash", "huamachuco"];
    const departmentsSVG = constructDepartments([600, 600]);
    departmentsSVG.forEach((department) => {
        if (departments.includes(department.name)) {
            const newDepartment = document.getElementById(department.name.toLowerCase());
            newDepartment.style.fill = "gray";
        }
    })
}

createMap();

