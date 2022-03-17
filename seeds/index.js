const mongoose = require("mongoose");
// const axios = require("axios");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error!"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62095ea970fe2c218bf88bf1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus totam natus unde possimus dolores exercitationem consequuntur odio quis! Sed, nulla. Eligendi voluptatum dolores numquam, tenetur quaerat impedit porro earum nihil",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/alcabb/image/upload/v1646240692/YelpCamp/ntfertfthfiaujdozcjk.jpg",
          filename: "YelpCamp/ntfertfthfiaujdozcjk",
        },
        {
          url: "https://res.cloudinary.com/alcabb/image/upload/v1646240700/YelpCamp/vs0x22fvnynsgguje28t.jpg",
          filename: "YelpCamp/vs0x22fvnynsgguje28t",
        },
      ],
    });
    await camp.save();
  }
};

// async function seedImg() {
//   try {
//     const resp = await axios.get("https://api.unsplash.com/photos/random", {
//       params: {
//         client_id: "pYw2zPZX3BFm4U-_j_E5DxQzx3H9KwNX4gP1SyMM2sc",
//         collections: 1114848,
//       },
//     });
//     return resp.data.urls.small;
//   } catch (err) {
//     console.error(err);
//   }
// }

// const seedDB = async () => {
//   await Campground.deleteMany({});
//   for (let i = 0; i < 20; i++) {
//     // setup
//     const placeSeed = Math.floor(Math.random() * places.length);
//     const descriptorsSeed = Math.floor(Math.random() * descriptors.length);
//     const citySeed = Math.floor(Math.random() * cities.length);

//     // seed data into campground
//     const camp = new Campground({
//       imageUrl: await seedImg(),
//       title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
//       location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
//     });

//     await camp.save();
//   }
// };

seedDB().then(() => {
  mongoose.connection.close();
});
