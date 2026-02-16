export const builtInRawData = [
    {
      id: 1,
      itemType: "Lunchbox",
      condition: "good",
      description: "Large sized, slightly ripped at the handle",
      img: "../lost-and-found-tracker/images/img1.jpeg",
      isFound: false
    },
    {
      id: 3,
      itemType: "Water bottle",
      condition: "Near perfect",
      description: "Tempercraft black 22oz water bottle.",
      img: "./lost-and-found-tracker/images/img3.jpeg",
      isFound: false
    },
    {
      id: 4,
      itemType: "Pencil case",
      condition: "Good",
      description: "Black zipit zipup Pencilcase, full of school supplies.",
      img: "./lost-and-found-tracker/images/img4.jpeg",
      isFound: false
    },
    {
      id: 5,
      itemType: "backpack",
      condition: "not very good",
      description: "Black kinetics backpack, damaged zipper with 7th grader books inside.",
      img: "./lost-and-found-tracker/images/img5.jpeg",
      isFound: false
    }
  ];

export function rawData() {


  let savedRawData = null;
  try {
    savedRawData = JSON.parse(localStorage.getItem("savedRawData"));
  } catch (e) {
    savedRawData = null;
  }

  // If there's no saved data, or the built-in data differs from what's saved,
  // overwrite localStorage so code changes propagate to users on next load.
  if (!savedRawData || JSON.stringify(savedRawData) !== JSON.stringify(builtInRawData)) {
    localStorage.setItem("savedRawData", JSON.stringify(builtInRawData));
    return builtInRawData;
  }

  /*
  let count = 0
  if (count < 1) {
    setData(() => {return })
    count++
  } else {
    console.log("data already set once")
  }
    */
      

  return savedRawData;
}
/*
localStorage.setItem("savedRawData", JSON.stringify(rawData))
export const rawDataSaved = JSON.parse(localStorage.getItem("savedRawData"))*/